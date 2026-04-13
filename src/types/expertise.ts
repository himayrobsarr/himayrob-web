export interface ExpertiseCardItem {
  id: number;
  title: string;
  description: string;
  points: string[];
}

export interface ExpertiseContent {
  badge: string;
  title: string;
  description: string;
  items: ExpertiseCardItem[];
}