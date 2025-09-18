import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Filter } from "lucide-react";
import type { Doctor } from "@/types/medical";

interface DoctorSearchProps {
  doctors: Doctor[];
  onFilteredResults: (doctors: Doctor[]) => void;
}

export const DoctorSearch = ({ doctors, onFilteredResults }: DoctorSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  // Get unique specialties from doctors
  const specialties = useMemo(() => {
    return Array.from(new Set(doctors.map(d => d.specialty))).sort();
  }, [doctors]);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let filtered = doctors.filter(doctor => {
      const matchesSearch = searchQuery === "" || 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === "" || doctor.specialty === selectedSpecialty;
      
      return matchesSearch && matchesSpecialty;
    });

    // Sort based on selection
    if (sortBy === "distance") {
      filtered = filtered.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [doctors, searchQuery, selectedSpecialty, sortBy]);

  // Update filtered results whenever they change
  useMemo(() => {
    onFilteredResults(filteredDoctors);
  }, [filteredDoctors, onFilteredResults]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value === "all" ? "" : value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value === "default" ? "" : value);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search by name, specialty, or hospital..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 border-[hsl(var(--medical-primary))] focus:ring-[hsl(var(--medical-primary))]"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Specialty Filter */}
        <div className="flex-1">
          <Select value={selectedSpecialty || "all"} onValueChange={handleSpecialtyChange}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map(specialty => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          <Button
            variant={sortBy === "distance" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange(sortBy === "distance" ? "default" : "distance")}
            className={sortBy === "distance" ? "bg-[hsl(var(--medical-primary))] hover:bg-[hsl(var(--medical-primary-light))]" : ""}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Distance
          </Button>
          <Button
            variant={sortBy === "rating" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange(sortBy === "rating" ? "default" : "rating")}
            className={sortBy === "rating" ? "bg-[hsl(var(--medical-primary))] hover:bg-[hsl(var(--medical-primary-light))]" : ""}
          >
            <Star className="w-4 h-4 mr-2" />
            Rating
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredDoctors.length} of {doctors.length} doctors
        {searchQuery && ` for "${searchQuery}"`}
        {selectedSpecialty && ` in ${selectedSpecialty}`}
      </div>
    </div>
  );
};