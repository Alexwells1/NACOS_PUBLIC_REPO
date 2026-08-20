

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  category: string;
  imageUrl?: string;
}

export const easing = [0.16, 1, 0.3, 1] as const;

export const SLIDE_GAP = 16;