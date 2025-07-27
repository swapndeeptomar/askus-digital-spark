import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ExternalLink, User, Mail, Phone, Globe, FileText, CheckCircle } from 'lucide-react';

interface DigitalPartnerApplication {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  domain: string;
  experience: string | null;
  skills: string | null;
  portfolio: string | null;
  resume_url: string | null;
  message: string | null;
  status: string;
}

const AdminApplicants = () => {
  const [applications, setApplications] = useState<DigitalPartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('digital_partners')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch partner applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectApplicant = async (application: DigitalPartnerApplication) => {
    setSelecting(application.id);
    
    try {
      // Update the application status to 'selected'
      const { error: updateError } = await supabase
        .from('digital_partners')
        .update({ status: 'selected' })
        .eq('id', application.id);

      if (updateError) throw updateError;

      // Create new record in current_partner table
      const { error: insertError } = await supabase
        .from('current_partner')
        .insert([{
          user_id: application.user_id,
          partner_id: application.id,
          name: application.name,
          email: application.email,
          phone: application.phone,
          domain: application.domain,
          experience: application.experience,
          skills: application.skills,
          portfolio: application.portfolio,
          resume_url: application.resume_url,
          status: 'active'
        }]);

      if (insertError) throw insertError;

      toast({
        title: "Partner Selected",
        description: `${application.name} has been selected as a digital partner`,
      });

      // Refresh applications list
      fetchApplications();

    } catch (error) {
      console.error('Error selecting partner:', error);
      toast({
        title: "Error",
        description: "Failed to select partner",
        variant: "destructive"
      });
    } finally {
      setSelecting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Digital Partner Applicants</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {applications.length} Applications
        </Badge>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No partner applications found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => {
            return (
              <Card key={application.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {application.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Applied: {new Date(application.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => selectApplicant(application)}
                      disabled={selecting === application.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {selecting === application.id ? 'Selecting...' : 'Select as Partner'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{application.email}</span>
                      </div>
                      {application.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{application.phone}</span>
                        </div>
                      )}
                      {application.domain && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <Badge variant="outline">{application.domain}</Badge>
                        </div>
                      )}
                      {application.experience && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Experience:</span>
                          <span className="text-sm">{application.experience}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {application.skills && (
                        <div>
                          <span className="text-sm font-medium">Skills:</span>
                          <p className="text-sm text-gray-600 mt-1">{application.skills}</p>
                        </div>
                      )}
                      {application.portfolio && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                          <a 
                            href={application.portfolio} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View Portfolio
                          </a>
                        </div>
                      )}
                      {application.resume_url && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a 
                            href={application.resume_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View Resume
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {application.message && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Message:</span>
                      <p className="text-sm text-gray-600 mt-1">{application.message}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminApplicants;