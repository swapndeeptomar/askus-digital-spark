import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { ExternalLink, User, Mail, Phone, Globe, FileText, Edit, Trash2, Plus, Calendar, Image, Upload, Star, CheckCircle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface CurrentPartner {
  id: string;
  user_id: string;
  partner_id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  domain: string;
  experience: string | null;
  skills: string | null;
  portfolio: string | null;
  resume_url: string | null;
  status: string;
  current_task_title: string | null;
  current_task_description: string | null;
  current_task_image_url: string | null;
  current_task_document_url: string | null;
  current_task_deadline: string | null;
  task_status: string | null;
  completed_by_partner: boolean | null;
  verified_by_admin: boolean | null;
  feedback_rating: number | null;
}

interface TaskForm {
  title: string;
  description: string;
  deadline: string;
  image_url: string;
  document_url: string;
}

const AdminPartners = () => {
  const [partners, setPartners] = useState<CurrentPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [taskForm, setTaskForm] = useState<TaskForm>({
    title: '',
    description: '',
    deadline: '',
    image_url: '',
    document_url: ''
  });
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewingTask, setReviewingTask] = useState<CurrentPartner | null>(null);
  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('current_partner')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast({
        title: "Error",
        description: "Failed to fetch partners",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePartnerStatus = async (partnerId: string, status: string) => {
    setUpdating(partnerId);
    
    try {
      const { error } = await supabase
        .from('current_partner')
        .update({ status })
        .eq('id', partnerId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Partner status updated to ${status}`,
      });

      fetchPartners();
    } catch (error) {
      console.error('Error updating partner status:', error);
      toast({
        title: "Error",
        description: "Failed to update partner status",
        variant: "destructive"
      });
    } finally {
      setUpdating(null);
    }
  };

  const removePartner = async (partnerId: string) => {
    try {
      const { error } = await supabase
        .from('current_partner')
        .delete()
        .eq('id', partnerId);

      if (error) throw error;

      toast({
        title: "Partner Removed",
        description: "Partner has been removed from current partners",
      });

      fetchPartners();
    } catch (error) {
      console.error('Error removing partner:', error);
      toast({
        title: "Error",
        description: "Failed to remove partner",
        variant: "destructive"
      });
    }
  };

  const uploadFile = async (file: File, type: 'image' | 'document') => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      const filePath = `${selectedPartnerId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('partner-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('partner-files')
        .getPublicUrl(filePath);

      setTaskForm(prev => ({
        ...prev,
        [type === 'image' ? 'image_url' : 'document_url']: publicUrl
      }));

      toast({
        title: "File Uploaded",
        description: `${type} uploaded successfully`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Error",
        description: `Failed to upload ${type}`,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const assignTask = async () => {
    if (!selectedPartnerId || !taskForm.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in the task title",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('current_partner')
        .update({
          current_task_title: taskForm.title,
          current_task_description: taskForm.description,
          current_task_deadline: taskForm.deadline || null,
          current_task_image_url: taskForm.image_url || null,
          current_task_document_url: taskForm.document_url || null,
          task_status: 'pending',
          completed_by_partner: false,
          verified_by_admin: false
        })
        .eq('id', selectedPartnerId);

      if (error) throw error;

      toast({
        title: "Task Assigned",
        description: "Task has been assigned successfully",
      });

      setTaskForm({ title: '', description: '', deadline: '', image_url: '', document_url: '' });
      setTaskDialogOpen(false);
      fetchPartners();
    } catch (error) {
      console.error('Error assigning task:', error);
      toast({
        title: "Error",
        description: "Failed to assign task",
        variant: "destructive"
      });
    }
  };

  const verifyTask = async (partnerId: string, rating: number) => {
    try {
      const { error } = await supabase
        .from('current_partner')
        .update({
          verified_by_admin: true,
          feedback_rating: rating,
          task_status: 'completed'
        })
        .eq('id', partnerId);

      if (error) throw error;

      toast({
        title: "Task Verified",
        description: "Task has been verified and rated",
      });

      setReviewDialogOpen(false);
      setReviewingTask(null);
      fetchPartners();
    } catch (error) {
      console.error('Error verifying task:', error);
      toast({
        title: "Error",
        description: "Failed to verify task",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading partners...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Digital Partners</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {partners.length} Partners
        </Badge>
      </div>

      {partners.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No partners found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {partners.map((partner) => {
            return (
              <Card key={partner.id} className={`border-l-4 ${partner.status === 'active' ? 'border-l-green-500' : 'border-l-gray-400'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {partner.name}
                        <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                          {partner.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Partner since: {new Date(partner.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={taskDialogOpen && selectedPartnerId === partner.id} onOpenChange={(open) => {
                        setTaskDialogOpen(open);
                        if (open) setSelectedPartnerId(partner.id);
                        else setSelectedPartnerId(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Task
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Task</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              placeholder="Task title"
                              value={taskForm.title}
                              onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                            <Textarea
                              placeholder="Description"
                              value={taskForm.description}
                              onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label>Deadline</Label>
                                <Input
                                  type="date"
                                  value={taskForm.deadline}
                                  onChange={(e) => setTaskForm(prev => ({ ...prev, deadline: e.target.value }))}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Reference Image</Label>
                              <div className="flex gap-2">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) uploadFile(file, 'image');
                                  }}
                                  disabled={uploading}
                                />
                                {taskForm.image_url && (
                                  <Button variant="outline" size="sm" onClick={() => window.open(taskForm.image_url, '_blank')}>
                                    <Image className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Task Document</Label>
                              <div className="flex gap-2">
                                <Input
                                  type="file"
                                  accept=".pdf,.doc,.docx,.txt"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) uploadFile(file, 'document');
                                  }}
                                  disabled={uploading}
                                />
                                {taskForm.document_url && (
                                  <Button variant="outline" size="sm" onClick={() => window.open(taskForm.document_url, '_blank')}>
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            <Button onClick={assignTask} disabled={uploading}>
                              {uploading ? 'Uploading...' : 'Assign Task'}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Select
                        value={partner.status}
                        onValueChange={(value) => updatePartnerStatus(partner.id, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{partner.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{partner.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <Badge variant="outline">{partner.domain}</Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {partner.skills && (
                          <div>
                            <span className="text-sm font-medium">Skills:</span>
                            <p className="text-sm text-gray-600">{partner.skills}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {partner.current_task_title && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-blue-900">Current Task: {partner.current_task_title}</h4>
                          {partner.completed_by_partner && !partner.verified_by_admin && (
                            <Button 
                              size="sm" 
                              onClick={() => {
                                setReviewingTask(partner);
                                setRating(5); // Reset to default rating
                                setReviewDialogOpen(true);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verify Task
                            </Button>
                          )}
                          {partner.verified_by_admin && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-blue-700 mb-2">{partner.current_task_description}</p>
                        {partner.current_task_deadline && (
                          <p className="text-xs text-blue-600 mb-2">
                            Deadline: {new Date(partner.current_task_deadline).toLocaleDateString()}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={
                            partner.completed_by_partner 
                              ? partner.verified_by_admin ? 'bg-green-500' : 'bg-yellow-500'
                              : 'bg-gray-500'
                          }>
                            {partner.verified_by_admin ? 'Verified' : partner.completed_by_partner ? 'Awaiting Review' : partner.task_status || 'Pending'}
                          </Badge>
                          {partner.feedback_rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{partner.feedback_rating}/5</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {partner.current_task_image_url && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => window.open(partner.current_task_image_url, '_blank')}
                            >
                              <Image className="h-4 w-4 mr-1" />
                              Image
                            </Button>
                          )}
                          {partner.current_task_document_url && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => window.open(partner.current_task_document_url, '_blank')}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Document
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Task Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Completed Task</DialogTitle>
          </DialogHeader>
          {reviewingTask && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{reviewingTask.current_task_title}</h4>
                <p className="text-sm text-gray-600">{reviewingTask.current_task_description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Completed by: {reviewingTask.name}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Rating (1-5 stars)</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer ${
                        star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    console.log('Verifying task for partner:', reviewingTask.id, 'with rating:', rating);
                    verifyTask(reviewingTask.id, rating);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verify & Rate Task
                </Button>
                <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPartners;