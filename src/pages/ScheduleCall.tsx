import React, { useState } from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon, Phone, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Generate time slots from 10 AM to 10 PM
const generateTimeSlots = () => {
  const timeSlots = [];
  for (let hour = 10; hour <= 22; hour++) {
    const formattedHour = hour <= 12 ? hour : hour - 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    timeSlots.push({
      value: `${hour}:00`,
      label: `${formattedHour}:00 ${amPm}`,
    });
    // Add half-hour slots
    if (hour < 22) {
      timeSlots.push({
        value: `${hour}:30`,
        label: `${formattedHour}:30 ${amPm}`,
      });
    }
  }
  return timeSlots;
};

const timeSlots = generateTimeSlots();

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits.' })
    .refine((val) => /^[0-9+\-\s()]*$/.test(val), {
      message: 'Please enter a valid phone number.',
    }),
  date: z.date({
    required_error: 'Please select a date for your appointment.',
  }),
  time: z.string({
    required_error: 'Please select a time for your appointment.',
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ScheduleCall = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Define available dates (today + next 30 days)
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 30);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format date for database
      const formattedDate = format(data.date, 'yyyy-MM-dd');
      
      // Insert appointment into database
      const { error } = await supabase.from('appointments').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: formattedDate,
        time_slot: data.time,
        message: data.message || null,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Appointment Scheduled!',
        description: 'We will contact you to confirm your appointment details.',
      });
      
      // Redirect to home page after successful submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast({
        title: 'Error',
        description: 'There was a problem scheduling your appointment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-askus-dark mb-4">
            Schedule a Call
          </h1>
          <p className="text-lg text-gray-600">
            Book a consultation call with our team to discuss your project requirements.
          </p>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal flex justify-between items-center",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              date < today || date > maxDate || 
                              date.getDay() === 0 || date.getDay() === 6 // Disable weekends
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please share any specific topics you'd like to discuss during the call."
                        className="resize-none min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-askus-purple hover:bg-askus-purple/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Call'}
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <Phone className="text-askus-purple h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Professional Consultation</h3>
            <p className="text-gray-600">
              Speak directly with our experts about your project requirements and goals.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <CalendarIcon className="text-askus-purple h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">
              Choose a date and time that works best for your schedule.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <Clock className="text-askus-purple h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Timely Follow-up</h3>
            <p className="text-gray-600">
              Receive a confirmation email with call details and follow-up resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCall;