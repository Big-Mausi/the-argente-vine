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

export const menuData: MenuItem[] = [
  // Starters
  {
    id: 1,
    name: "Rich and creamy Beetroot Soup",
    description:
      "A hearty Eastern European soup made with beetroot, tender meat, and vegetables, finished with a touch of sour cream for richness.",
    price: 6400,
    image: "/Beetroot Soup.avif",
    alt: "Beetroot Soup",
    category: "Starters",
  },
  {
    id: 2,
    name: "Classic French Onion Soup",
    description:
      "A classic French favorite—slow-caramelized onions in a rich broth, topped with toasted bread and melted cheese.",
    price: 7000,
    image: "/Onion soup.avif",
    alt: "French Onion Soup with bread",
    category: "Starters",
  },
  {
    id: 3,
    name: "Tuna and Vegetable Salad",
    description:
      "A fresh and vibrant salad from southern France, combining tuna, boiled eggs, tomatoes, and crisp vegetables.",
    price: 8000,
    image: "/Vegetables salad.avif",
    alt: "Tuna with vegetable salad",
    category: "Starters",
  },

  // Main Course
  {
    id: 4,
    name: "Beef Stroganoff with Pelmeni (Dumplings)",
    description:
      "Tender strips of beef cooked in a creamy mushroom sauce, with soft dumplings filled with seasoned meat, boiled and served with butter or sour cream.",
    price: 20200,
    image: "/beef stroganoff.avif",
    alt: "Beef Stroganoff with Dumplings",
    category: "Main Course",
  },
  {
    id: 5,
    name: "Potato Gratin with Chicken in Red Wine",
    description:
      "Thinly sliced potatoes baked in cream until golden and tender, with chicken slowly braised in red wine with herbs and vegetables.",
    price: 18500,
    image: "/Potato gratin.avif",
    alt: "Potato Gratin with Chicken in Red Wine",
    category: "Main Course",
  },
  {
    id: 6,
    name: "Veal in White Sauce with Buckwheat",
    description:
      "A delicate veal stew cooked in a creamy white sauce with wholesome and nutty grains, lightly seasoned with vegetables.",
    price: 17200,
    image: "/buckwheat.png",
    alt: "Veal in White Sauce with Buckwheat",
    category: "Main Course",
  },

  // Desserts
  {
    id: 7,
    name: "Creme Brulee (Caramel Custard)",
    description:
      "A silky custard topped with a crisp caramelized sugar crust that cracks beautifully with each spoon.",
    price: 7000,
    image: "/cremebrulee.png",
    alt: "Caramel custard",
    category: "Desserts",
  },
  {
    id: 8,
    name: "Macarons (Almond Cookies)",
    description:
      "Delicate almond meringue cookies with soft fillings in a variety of flavors.",
    price: 5500,
    image: "/macarons.png",
    alt: "Macaron almond cookies",
    category: "Desserts",
  },
  {
    id: 9,
    name: "Upside-Down Apple Tart (Tarte Tatin)",
    description:
      "A caramelized apple tart baked upside down with a buttery crust and deep, sweet flavor.",
    price: 6500,
    image: "/appletart.png",
    alt: "Upside-Down Apple Tart",
    category: "Desserts",
  },
  {
    id: 10,
    name: "Napoleon Cake (Napoléon)",
    description:
      "Flaky pastry layers filled with smooth cream, creating a light yet indulgent dessert.",
    price: 6500,
    image: "/Napcake.png",
    alt: "Napoleon Cake",
    category: "Desserts",
  },
  {
    id: 11,
    name: "Honey Cake (Medovik)",
    description:
      "A layered honey cake with soft, creamy filling, offering a delicate sweetness and rich texture.",
    price: 6000,
    image: "/HoneyCake.png",
    alt: "Honey Cake",
    category: "Desserts",
  },

  // Drinks
  {
    id: 12,
    name: "Kvass (Fermented Bread Drink)",
    description:
      "A traditional fermented drink made from bread, slightly sweet with a mild tang.",
    price: 4000,
    image:
      "https://images.unsplash.com/photo-1457382713369-161d1d986f54?w=1000&auto=format&fit=crop&q=60",
    alt: "Kvass",
    category: "Drinks",
  },
  {
    id: 13,
    name: "Mors (Berry Drink)",
    description:
      "A refreshing fruit drink made from berries, lightly sweet and naturally flavorful.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1563223771-5fe4038fbfc9?w=1000&auto=format&fit=crop&q=60",
    alt: "Mors berry drink",
    category: "Drinks",
  },
  {
    id: 14,
    name: "Wine (Red / White)",
    description:
      "Carefully selected red or white wine to complement your meal.",
    price: 6000,
    image:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1000&auto=format&fit=crop&q=60",
    alt: "Red wine",
    category: "Drinks",
  },
  {
    id: 15,
    name: "Champagne (Sparkling Wine)",
    description:
      "Elegant sparkling wine perfect for celebrations and special moments.",
    price: 12000,
    image: "/Champagne.png",
    alt: "Champagne",
    category: "Drinks",
  },
  {
    id: 16,
    name: "Tea",
    description: "A warm and soothing beverage served in a variety of blends.",
    price: 3500,
    image: "/Tea.png",
    alt: "Tea",
    category: "Drinks",
  },
];
