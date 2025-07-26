import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ExternalLink, User, Mail, Phone, Globe, FileText, Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface DigitalPartner {
  id: string;
  created_at: string;
  name: string;
  email: string;
  mobile: string | null;
  subject: string;
  message: string;
}

const AdminPartners = () => {
  const [partners, setPartners] = useState<DigitalPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .like('subject', '%Selected Digital Partner%')
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

  const parsePartnerData = (message: string) => {
    const lines = message.split('\n');
    const data: Record<string, string> = {};
    
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(': ');
      if (key && valueParts.length > 0) {
        data[key.toLowerCase()] = valueParts.join(': ');
      }
    });
    
    return data;
  };

  const getPartnerStatus = (message: string) => {
    if (message.includes('SELECTED PARTNER')) return 'active';
    return 'inactive';
  };

  const updatePartnerStatus = async (partnerId: string, status: string) => {
    setUpdating(partnerId);
    
    try {
      const partner = partners.find(p => p.id === partnerId);
      if (!partner) return;

      let updatedMessage = partner.message;
      if (status === 'active' && !updatedMessage.includes('SELECTED PARTNER')) {
        updatedMessage = `SELECTED PARTNER\n\n${updatedMessage}`;
      } else if (status === 'inactive' && updatedMessage.includes('SELECTED PARTNER')) {
        updatedMessage = updatedMessage.replace('SELECTED PARTNER\n\n', '');
      }

      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          message: updatedMessage,
          subject: status === 'active' 
            ? partner.subject.replace('Inactive', 'Selected') 
            : partner.subject.replace('Selected', 'Inactive')
        })
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
        .from('contact_messages')
        .delete()
        .eq('id', partnerId);

      if (error) throw error;

      toast({
        title: "Partner Removed",
        description: "Partner has been removed from the system",
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
            const partnerData = parsePartnerData(partner.message);
            const status = getPartnerStatus(partner.message);
            
            return (
              <Card key={partner.id} className={`border-l-4 ${status === 'active' ? 'border-l-green-500' : 'border-l-gray-400'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {partner.name}
                        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                          {status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Partner since: {new Date(partner.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={status}
                        onValueChange={(value) => updatePartnerStatus(partner.id, value)}
                        disabled={updating === partner.id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Partner</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {partner.name} from the partners list? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => removePartner(partner.id)}>
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{partner.email}</span>
                      </div>
                      {partner.mobile && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{partner.mobile}</span>
                        </div>
                      )}
                      {partnerData.domain && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <Badge variant="outline">{partnerData.domain}</Badge>
                        </div>
                      )}
                      {partnerData.experience && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Experience:</span>
                          <span className="text-sm">{partnerData.experience}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {partnerData.skills && (
                        <div>
                          <span className="text-sm font-medium">Skills:</span>
                          <p className="text-sm text-gray-600 mt-1">{partnerData.skills}</p>
                        </div>
                      )}
                      {partnerData.portfolio && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                          <a 
                            href={partnerData.portfolio} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View Portfolio
                          </a>
                        </div>
                      )}
                      {partnerData.resume && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a 
                            href={partnerData.resume} 
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