
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Missing messages array" }), { status: 400, headers: corsHeaders });
    }

    // Prepare Gemini's chat request.
    const history = messages.map((m: { role: string; content: string }) => {
      if (m.role === "user") {
        return { role: "user", parts: [{ text: m.content }] };
      } else {
        return { role: "model", parts: [{ text: m.content }] };
      }
    });

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.8,
        },
        systemInstruction: {
          parts: [{ text: "You are a friendly, helpful website assistant who answers clearly and politely." }]
        }
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return new Response(JSON.stringify({ error: err.error?.message || "Gemini API error" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const data = await response.json();
    const aiMsg = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a reply!";

    return new Response(JSON.stringify({ reply: aiMsg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
