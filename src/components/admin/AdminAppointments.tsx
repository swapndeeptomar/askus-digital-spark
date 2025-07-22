import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Loader2, Calendar, Phone, Mail, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

type Appointment = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time_slot: string;
  message: string | null;
  status: string;
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load appointments.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => apt.id === id ? { ...apt, status } : apt)
      );
      
      toast({
        title: 'Status Updated',
        description: `Appointment status changed to ${status}.`,
      });
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update appointment status.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="animate-spin mr-2" />
        <span>Loading appointments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Scheduled Appointments</h3>
        <Button onClick={fetchAppointments} variant="outline">
          Refresh
        </Button>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No appointments scheduled</h3>
          <p className="text-gray-500">When clients schedule calls, they will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden border-l-4 transition-all" 
              style={{ 
                borderLeftColor: 
                  appointment.status === 'confirmed' ? 'rgb(34, 197, 94)' : 
                  appointment.status === 'cancelled' ? 'rgb(239, 68, 68)' : 
                  appointment.status === 'completed' ? 'rgb(59, 130, 246)' : 
                  'rgb(234, 179, 8)'
              }}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{appointment.name}</CardTitle>
                  {getStatusBadge(appointment.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-medium">
                      {format(new Date(appointment.date), 'MMMM d, yyyy')} at {appointment.time_slot}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{appointment.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{appointment.email}</span>
                  </div>
                </div>

                {appointment.message && (
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <p className="font-medium mb-1">Notes:</p>
                    <p className="text-gray-600">{appointment.message}</p>
                  </div>
                )}

                {appointment.status === 'pending' && (
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      className="flex-1" 
                      variant="outline"
                      size="sm"
                      onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                    >
                      <Check className="mr-1 h-4 w-4" /> Confirm
                    </Button>
                    <Button 
                      className="flex-1" 
                      variant="outline"
                      size="sm"
                      onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                    >
                      <X className="mr-1 h-4 w-4" /> Cancel
                    </Button>
                  </div>
                )}
                
                {appointment.status === 'confirmed' && (
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                    >
                      <Check className="mr-1 h-4 w-4" /> Mark Completed
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;