import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DigitalPartner = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: '',
    experience: '',
    skills: '',
    portfolio: '',
    message: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.domain) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl = '';
      
      if (resume) {
        const fileExt = resume.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('quotes-pdfs')
          .upload(`partner-resumes/${fileName}`, resume);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('quotes-pdfs')
          .getPublicUrl(`partner-resumes/${fileName}`);
        
        resumeUrl = publicUrl;
      }

      const { error } = await supabase
        .from('digital_partners')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            domain: formData.domain,
            experience: formData.experience,
            skills: formData.skills,
            portfolio: formData.portfolio,
            message: formData.message,
            resume_url: resumeUrl
          }
        ]);

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in becoming our digital partner. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        domain: '',
        experience: '',
        skills: '',
        portfolio: '',
        message: ''
      });
      setResume(null);

    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Become Our Digital Partner
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Join our network of talented tech professionals and work on exciting projects with us
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Info Section */}
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">What We're Looking For</CardTitle>
                </CardHeader>
                <CardContent className="text-purple-100 space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Technical Expertise</h3>
                    <p>Full-stack developers, mobile app developers, UI/UX designers, DevOps engineers, and other tech specialists.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Commitment</h3>
                    <p>Professionals who can dedicate time to work on client projects with high quality standards.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Communication</h3>
                    <p>Clear communicators who can work effectively with our team and clients.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Partner Benefits</CardTitle>
                </CardHeader>
                <CardContent className="text-purple-100 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    <span>Competitive project-based compensation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    <span>Flexible working arrangements</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    <span>Work on diverse, challenging projects</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    <span>Professional growth opportunities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    <span>Access to latest technologies and tools</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Partner Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="domain" className="text-white">Domain/Specialization *</Label>
                      <Select onValueChange={(value) => handleInputChange('domain', value)} required>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue placeholder="Select your domain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend Development</SelectItem>
                          <SelectItem value="backend">Backend Development</SelectItem>
                          <SelectItem value="fullstack">Full Stack Development</SelectItem>
                          <SelectItem value="mobile">Mobile App Development</SelectItem>
                          <SelectItem value="uiux">UI/UX Design</SelectItem>
                          <SelectItem value="devops">DevOps Engineering</SelectItem>
                          <SelectItem value="qa">Quality Assurance</SelectItem>
                          <SelectItem value="data">Data Science/Analytics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-white">Years of Experience</Label>
                    <Select onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="skills" className="text-white">Key Skills & Technologies</Label>
                    <Textarea
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="List your key skills, programming languages, frameworks, tools..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="portfolio" className="text-white">Portfolio/LinkedIn URL</Label>
                    <Input
                      id="portfolio"
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange('portfolio', e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="https://your-portfolio.com or LinkedIn profile"
                    />
                  </div>

                  <div>
                    <Label htmlFor="resume" className="text-white">Resume Upload</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="bg-white/20 border-white/30 text-white file:bg-white/20 file:text-white file:border-0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">Additional Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="Tell us why you'd like to be our digital partner..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-purple-900 hover:bg-white/90 font-semibold py-3"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DigitalPartner;