export interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  badge: string;
  title: string;
  description: string;
  steps: ProcessStep[];
}