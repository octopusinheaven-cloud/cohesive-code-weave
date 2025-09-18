export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  hospital: string;
  distance: number;
  rating: number;
  nextSlot: string;
  image_url?: string;
  contact_number?: string;
  email?: string;
}

export interface Appointment {
  id?: string;
  patient_id?: string;
  doctor_id: string;
  treatment_id?: string;
  appointment_date?: string;
  appointment_time?: string;
  patient_name: string;
  patient_phone: string;
  status?: string;
}

export interface Treatment {
  id: string;
  treatment_name: string;
  description: string;
  duration_minutes: number;
  cost: number;
}

export interface Patient {
  id?: string;
  user_id?: string;
  name: string;
  age?: number;
  gender?: string;
  contact_number?: string;
  address?: string;
  email?: string;
  medical_history?: string;
}

export interface EmergencyAlert {
  id?: string;
  patient_id?: string;
  alert_time?: string;
  alert_status?: string;
}