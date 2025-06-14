
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { TestimonialForm } from "./TestimonialForm";

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar_initial?: string | null;
  message: string;
  created_at: string;
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(12);
    if (!error && data) setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmission = () => {
    fetchTestimonials();
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Client Testimonials</h2>
          <p className="text-lg text-gray-600">
            Here's what our clients have to say about working with us.
          </p>
        </div>
        <TestimonialForm onSubmitted={handleSubmission} />
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-11 h-11 rounded-full bg-askus-purple text-white flex items-center justify-center font-bold text-xl">
                    {t.avatar_initial || (t.name ? t.name[0].toUpperCase() : "A")}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-askus-dark">{t.name}</h4>
                    <p className="text-gray-500 text-sm">
                      {t.role || ""}{t.company ? (t.role ? ", " : "") + t.company : ""}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{t.message}"</p>
                <div className="text-right text-xs text-gray-400 mt-3">
                  {format(new Date(t.created_at), "MMM d, yyyy")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
