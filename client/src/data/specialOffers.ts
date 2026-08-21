export interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  buttonText: string;
  buttonLink: string;
}

export const specialOffers: SpecialOffer[] = [
  {
    id: 1,
    title: "Wine Wednesday",
    description: "Get 20% off selected wines every Wednesday evening.",
    image: "/Rooftop.png",
    alt: "Wine Night",
    buttonText: "Reserve Now",
    buttonLink: "/contact",
  },
  {
    id: 2,
    title: "Couples Night",
    description: "Romantic dinner packages available every Friday night.",
    image: "/PlatedFood.png",
    alt: "Couples Dinner",
    buttonText: "Book a Table",
    buttonLink: "/contact",
  },
  {
    id: 3,
    title: "Weekend Buffet",
    description: "Unlimited gourmet dining experience every weekend.",
    image: "/DiningHall.png",
    alt: "Weekend Buffet",
    buttonText: "Explore Menu",
    buttonLink: "/menu",
  },
];
