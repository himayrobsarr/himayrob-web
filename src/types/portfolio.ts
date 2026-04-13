export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
}

export interface PortfolioContent {
  badge: string;
  title: string;
  description: string;
  items: PortfolioItem[];
}