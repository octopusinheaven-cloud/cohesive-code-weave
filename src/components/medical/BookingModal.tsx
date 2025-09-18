import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Doctor, Appointment } from "@/types/medical";

interface BookingModalProps {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingModal = ({ doctor, open, onOpenChange }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    appointmentDateTime: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!doctor) return;

    // Create appointment object
    const appointment: Appointment = {
      doctor_id: doctor.id,
      patient_name: formData.patientName,
      patient_phone: formData.patientPhone,
      appointment_date: formData.appointmentDateTime.split('T')[0],
      appointment_time: formData.appointmentDateTime.split('T')[1],
      status: 'Scheduled'
    };

    try {
      // In a real app, this would save to the database
      console.log('Booking appointment:', appointment);
      
      toast({
        title: "✅ Appointment Booked Successfully!",
        description: `Your appointment with ${doctor.name} is confirmed for ${new Date(formData.appointmentDateTime).toLocaleString()}`,
      });

      // Reset form and close modal
      setFormData({
        patientName: "",
        patientPhone: "",
        appointmentDateTime: "",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>
        
        {doctor && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="doctor">Doctor</Label>
              <Input 
                id="doctor"
                value={`${doctor.name} (${doctor.specialty})`}
                readOnly
                className="bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="patientName">Your Name *</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="patientPhone">Phone Number *</Label>
              <Input
                id="patientPhone"
                type="tel"
                value={formData.patientPhone}
                onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                required
                placeholder="Enter your phone number"
                pattern="[0-9+\s\-\(\)]{7,}"
              />
            </div>

            <div>
              <Label htmlFor="appointmentDateTime">Preferred Date & Time *</Label>
              <Input
                id="appointmentDateTime"
                type="datetime-local"
                value={formData.appointmentDateTime}
                onChange={(e) => handleInputChange('appointmentDateTime', e.target.value)}
                required
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-[hsl(var(--medical-primary))] hover:bg-[hsl(var(--medical-primary-light))]"
              >
                Confirm Booking
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};