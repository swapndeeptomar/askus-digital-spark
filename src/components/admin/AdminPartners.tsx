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
import { ExternalLink, User, Mail, Phone, Globe, FileText, Edit, Trash2, Plus, Calendar, Image } from 'lucide-react';
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
          task_status: 'pending'
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
                            <Input
                              type="date"
                              value={taskForm.deadline}
                              onChange={(e) => setTaskForm(prev => ({ ...prev, deadline: e.target.value }))}
                            />
                            <Button onClick={assignTask}>Assign</Button>
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
                        <h4 className="font-medium text-blue-900">Current Task: {partner.current_task_title}</h4>
                        <p className="text-sm text-blue-700">{partner.current_task_description}</p>
                        <Badge className="mt-2">{partner.task_status || 'pending'}</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPartners;