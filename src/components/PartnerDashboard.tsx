import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Image, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PartnerTask {
  id: string;
  name: string;
  email: string;
  domain: string;
  current_task_title?: string;
  current_task_description?: string;
  current_task_image_url?: string;
  current_task_document_url?: string;
  current_task_deadline?: string;
  task_status?: string;
  status: string;
}

const PartnerDashboard = () => {
  const [partnerData, setPartnerData] = useState<PartnerTask | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartnerData();
  }, []);

  const fetchPartnerData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view your dashboard",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('current_partner')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "Access Denied",
            description: "You are not registered as a current partner",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        return;
      }

      setPartnerData(data);
    } catch (error) {
      console.error('Error fetching partner data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch partner data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (!partnerData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
            <p className="text-gray-500">You are not registered as a current partner or need to log in.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Partner Info Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Welcome, {partnerData.name}</CardTitle>
                  <p className="text-gray-600 mt-1">{partnerData.email}</p>
                  <p className="text-sm text-gray-500">{partnerData.domain} Specialist</p>
                </div>
                <Badge variant={partnerData.status === 'active' ? 'default' : 'secondary'}>
                  {partnerData.status === 'active' ? 'Active Partner' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Current Task */}
          {partnerData.current_task_title ? (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Current Assignment
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(partnerData.task_status)}
                    <Badge className={getStatusColor(partnerData.task_status)}>
                      {partnerData.task_status?.replace('_', ' ')?.toUpperCase() || 'PENDING'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{partnerData.current_task_title}</h3>
                  {partnerData.current_task_description && (
                    <p className="text-gray-700 mb-4">{partnerData.current_task_description}</p>
                  )}
                </div>

                {partnerData.current_task_deadline && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {new Date(partnerData.current_task_deadline).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {partnerData.current_task_image_url && (
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Image className="h-4 w-4" />
                        <span className="font-medium">Reference Image</span>
                      </div>
                      <img 
                        src={partnerData.current_task_image_url} 
                        alt="Task reference"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </Card>
                  )}

                  {partnerData.current_task_document_url && (
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">Task Document</span>
                      </div>
                      <a 
                        href={partnerData.current_task_document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        View Document
                      </a>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6">
              <CardContent className="p-8 text-center">
                <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Current Assignment</h3>
                <p className="text-gray-500">You don't have any tasks assigned at the moment. Check back later or contact your administrator.</p>
              </CardContent>
            </Card>
          )}

          {/* Partner Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">Active</div>
                <div className="text-sm text-gray-500">Partner Status</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {partnerData.current_task_title ? '1' : '0'}
                </div>
                <div className="text-sm text-gray-500">Active Tasks</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">{partnerData.domain}</div>
                <div className="text-sm text-gray-500">Specialization</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;