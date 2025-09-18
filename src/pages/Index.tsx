import { useState } from "react";
import { SosBar } from "@/components/medical/SosBar";
import { DoctorSearch } from "@/components/medical/DoctorSearch";
import { DoctorCard } from "@/components/medical/DoctorCard";
import { BookingModal } from "@/components/medical/BookingModal";
import type { Doctor } from "@/types/medical";

// Sample doctors data - this would come from your database
const sampleDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Aditi Sharma",
    specialty: "Cardiologist",
    experience: "12 years",
    hospital: "Apollo Hospital",
    distance: 2.3,
    rating: 4.8,
    nextSlot: "Today, 5:30 PM",
    image_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    contact_number: "+91-9876543210",
    email: "aditi.sharma@apollo.com"
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialty: "Dermatologist",
    experience: "8 years",
    hospital: "Fortis Clinic",
    distance: 4.1,
    rating: 4.6,
    nextSlot: "Tomorrow, 10:00 AM",
    image_url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    contact_number: "+91-9876543211",
    email: "rajesh.kumar@fortis.com"
  },
  {
    id: "3",
    name: "Dr. Meera Iyer",
    specialty: "Pediatrician",
    experience: "10 years",
    hospital: "Max Healthcare",
    distance: 3.5,
    rating: 4.9,
    nextSlot: "Today, 3:00 PM",
    image_url: "https://images.unsplash.com/photo-1594824720853-e8beff82c2ab?w=150&h=150&fit=crop&crop=face",
    contact_number: "+91-9876543212",
    email: "meera.iyer@max.com"
  },
  {
    id: "4",
    name: "Dr. Ananya Gupta",
    specialty: "Panchkarma",
    experience: "15 years",
    hospital: "Ayusutra Clinic",
    distance: 1.8,
    rating: 4.7,
    nextSlot: "Today, 2:00 PM",
    image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    contact_number: "+91-9876543213",
    email: "ananya.gupta@ayusutra.com"
  },
  {
    id: "5",
    name: "Dr. Vikram Singh",
    specialty: "Orthopedic",
    experience: "9 years",
    hospital: "AIIMS Delhi",
    distance: 5.2,
    rating: 4.5,
    nextSlot: "Tomorrow, 11:30 AM",
    image_url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    contact_number: "+91-9876543214",
    email: "vikram.singh@aiims.com"
  },
  {
    id: "6",
    name: "Dr. Priya Reddy",
    specialty: "Gynecologist",
    experience: "11 years",
    hospital: "Fortis Hospital",
    distance: 3.7,
    rating: 4.8,
    nextSlot: "Today, 4:15 PM",
    image_url: "https://images.unsplash.com/photo-1594824723059-c45dfb53cd67?w=150&h=150&fit=crop&crop=face",
    contact_number: "+91-9876543215",
    email: "priya.reddy@fortis.com"
  }
];

const Index = () => {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(sampleDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const handleFilteredResults = (doctors: Doctor[]) => {
    setFilteredDoctors(doctors);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header with brand and SOS */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[hsl(var(--medical-primary))] flex items-center gap-2">
            🩺 Ayusutra
          </h1>
          <div className="flex-1 max-w-sm ml-4">
            <SosBar />
          </div>
        </div>

        {/* Search and filters */}
        <DoctorSearch 
          doctors={sampleDoctors}
          onFilteredResults={handleFilteredResults}
        />

        {/* Doctors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBook={handleBookAppointment}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}

        {/* Booking Modal */}
        <BookingModal
          doctor={selectedDoctor}
          open={isBookingModalOpen}
          onOpenChange={setIsBookingModalOpen}
        />
      </div>
    </div>
  );
};

export default Index;
