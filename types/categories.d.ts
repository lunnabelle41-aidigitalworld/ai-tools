declare module 'data/categories' {
  interface Subcategory {
    name: string;
    favicon: string;
    website: string;
  }

  interface Category {
    name: string;
    icon: string;
    toolCount: number;
    subcategories: Subcategory[];
  }

  export const categories: Category[];
}
