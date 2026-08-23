export type MenuCategory = "Starters" | "Main Course" | "Desserts" | "Drinks";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  category: MenuCategory;
}
