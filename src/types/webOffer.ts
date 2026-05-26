export interface WebPackage {
  id: string;
  name: string;
  price: string;
  summary: string;
  bestFor: string[];
  includes: string[];
  clientPitch: string;
  featured?: boolean;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  price: string;
  includes: string[];
}

export interface WebsiteProject {
  id: string;
  title: string;
  businessType: string;
  description: string;
  result: string;
  url?: string;
  imageSrc?: string;
  tags: string[];
}

export interface WebOfferContent {
  packages: {
    badge: string;
    title: string;
    description: string;
    items: WebPackage[];
  };
  maintenance: {
    badge: string;
    title: string;
    description: string;
    items: MaintenancePlan[];
  };
  projects: {
    badge: string;
    title: string;
    description: string;
    items: WebsiteProject[];
  };
}
