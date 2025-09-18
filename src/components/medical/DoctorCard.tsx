import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Clock, 
  Star, 
  Calendar,
  Phone 
} from "lucide-react";
import type { Doctor } from "@/types/medical";

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
  onCall?: (doctor: Doctor) => void;
}

export const DoctorCard = ({ doctor, onBook, onCall }: DoctorCardProps) => {
  const handleCall = () => {
    if (onCall) {
      onCall(doctor);
    } else {
      // Default call behavior
      window.open(`tel:${doctor.contact_number || '911'}`, '_self');
    }
  };

  return (
    <Card className="p-4 transition-all duration-200 hover:shadow-[var(--shadow-card)] hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-14 h-14">
          <AvatarImage 
            src={doctor.image_url} 
            alt={doctor.name}
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {doctor.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{doctor.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {doctor.specialty}
          </Badge>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Briefcase className="w-4 h-4 mr-2 text-primary" />
          {doctor.experience}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Building2 className="w-4 h-4 mr-2 text-primary" />
          {doctor.hospital}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          {doctor.distance} km away
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-2 text-primary" />
          Next: {doctor.nextSlot}
        </div>
        <div className="flex items-center text-sm">
          <Star className="w-4 h-4 mr-2 text-[hsl(var(--medical-accent))] fill-current" />
          <span className="font-semibold text-[hsl(var(--medical-accent))]">{doctor.rating}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={() => onBook(doctor)}
          className="flex-1 bg-[hsl(var(--medical-primary))] hover:bg-[hsl(var(--medical-primary-light))] text-white"
          size="sm"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book
        </Button>
        <Button 
          onClick={handleCall}
          variant="outline"
          size="sm"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Phone className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};