export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
  keywords: string[];
  content?: string;
}
