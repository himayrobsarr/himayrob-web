export interface ConsultingFormValues {
  fullName: string;
  email: string;
  phone: string;
  durationHours: string;
  selectedDate: string;
  selectedStart: string;
  selectedEnd: string;
  businessType: string;
  needType: string;
  projectStage: string;
  message: string;
  source: string;
}

export interface ConsultingOption {
  label: string;
  value: string;
}

export interface ConsultingSlot {
  start: string;
  end: string;
  label?: string;
}
