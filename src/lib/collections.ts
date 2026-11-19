export type Collection = {
  id: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
  description: string;
  notes: [string, string][];
};

export const collections: Collection[] = [
  {
    id: "signature",
    title: "The Signature Edit",
    caption: "Quiet luxuries, thoughtfully brought together.",
    image: "/images/collection-signature.webp",
    alt: "A forest-green gift box with a candle, fine soap, and champagne ribbon.",
    description: "A considered collection of everyday comforts. Soft textures, gentle scents, and beautiful keepsakes come together in our signature gifting palette.",
    notes: [
      ["The mood", "Understated, warm, and personal"],
      ["The details", "Forest green, creamy ivory, and a satin finish"],
      ["Made for", "Thoughtful thank-yous and just-because moments"],
    ],
  },
  {
    id: "celebration",
    title: "Celebration Gifting",
    caption: "For the moments worth marking.",
    image: "/images/collection-celebration.webp",
    alt: "An ivory gift box with a rose-pink silk bow, surrounded by delicate flowers.",
    description: "A joyful edit for life's sweetest occasions. Romantic ribbons and delicate floral details set the tone for a gift as memorable as the moment.",
    notes: [
      ["The mood", "Romantic, joyful, and celebratory"],
      ["The details", "Soft blush, seasonal florals, and flowing silk"],
      ["Made for", "Birthdays, anniversaries, and new beginnings"],
    ],
  },
  {
    id: "corporate",
    title: "Corporate Gifting",
    caption: "Considered gestures, lasting impressions.",
    image: "/images/collection-corporate.webp",
    alt: "An emerald notebook, gold pen, and ribbon-wrapped gift for a professional occasion.",
    description: "Professional gifting with a personal touch. Refined stationery and useful keepsakes make a thoughtful way to recognise the people behind every partnership.",
    notes: [
      ["The mood", "Refined, purposeful, and appreciative"],
      ["The details", "Rich green, tactile stationery, and gold accents"],
      ["Made for", "Client thank-yous, team milestones, and welcomes"],
    ],
  },
];