interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  url: string;
  pricing: string;
  rating: number;
  tags: string[];
  favicon?: string; // Make favicon optional
}