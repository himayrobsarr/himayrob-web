export interface HeroCard {
  id: number;
  title: string;
  description: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  highlights: string[];
  cards: HeroCard[];
}