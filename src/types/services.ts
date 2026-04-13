export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  points: string[];
}

export interface ServicesContent {
  badge: string;
  title: string;
  description: string;
  items: ServiceItem[];
}