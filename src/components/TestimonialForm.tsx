
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Props = {
  onSubmitted: () => void;
};

export function TestimonialForm({ onSubmitted }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      toast({ title: "Name and Message are required!", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const avatar_initial = name[0]?.toUpperCase() || "A";
    const { error } = await supabase.from("testimonials").insert([
      { name, role, company, avatar_initial, message }
    ]);
    setSubmitting(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Thank you!", description: "Your testimonial has been submitted." });
      setName(""); setRole(""); setCompany(""); setMessage("");
      onSubmitted();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mb-8 max-w-2xl bg-gray-50 border border-gray-100 rounded-xl p-6 space-y-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Your Name *"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={submitting}
          required
        />
        <Input
          placeholder="Your Company"
          value={company}
          onChange={e => setCompany(e.target.value)}
          disabled={submitting}
        />
        <Input
          placeholder="Your Role"
          value={role}
          onChange={e => setRole(e.target.value)}
          disabled={submitting}
        />
      </div>
      <Textarea
        placeholder="What did you enjoy most? *"
        value={message}
        onChange={e => setMessage(e.target.value)}
        minLength={8}
        maxLength={400}
        required
        disabled={submitting}
      />
      <div className="text-right">
        <Button type="submit" className="bg-askus-purple" disabled={submitting}>
          {submitting ? "Submitting..." : "Add Feedback"}
        </Button>
      </div>
    </form>
  );
}
