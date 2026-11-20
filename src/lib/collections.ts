export type Collection = {
  id: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
  description: string;
  imageCredit?: string;
  imageSource?: string;
  imageLicense?: string;
  imageLicenseUrl?: string;
};

export const collections: Collection[] = [
  {
    id: "graduation",
    title: "Graduation Gifts",
    caption: "Celebrate achievements with thoughtful gifts that make graduation moments unforgettable.",
    image: "/images/catalogue-graduation.jpg",
    alt: "Graduates celebrating together after receiving their diplomas.",
    description: "From beautifully arranged graduation hampers and personalized mugs to customized keepsakes and elegant gift boxes, discover meaningful ways to congratulate graduates on their academic achievements.",
    imageCredit: "Harris & Ewing",
    imageSource: "https://commons.wikimedia.org/wiki/File:School%27s_out._Annapolis,_MD._June_3._School%27s_out_for_the_graduating_class_at_the_Naval_Academy_at_Annapolis,_after_receiving_their_diplomas_the_midshipmen_are_shown_getting_rid_of_their_LCCN2016871787.jpg",
    imageLicense: "Public domain",
  },
  {
    id: "birthday",
    title: "Birthday Gifts",
    caption: "Make someone's birthday extra special with a thoughtful surprise.",
    image: "/images/catalogue-birthday.jpg",
    alt: "A gift box of birthday cupcakes decorated with colorful frosting.",
    description: "Explore beautifully packaged birthday hampers, personalized presents, flowers, customized mugs and carefully selected gifts designed to make every birthday memorable.",
    imageCredit: "Keannetamim",
    imageSource: "https://commons.wikimedia.org/wiki/File:A_lovely_gift_box_of_cupcakes_for_mother_on_her_birthday-_Done_by_Gabby%27s_Cupcakes_2013-07-23_09-15.jpg",
    imageLicense: "CC BY-SA 3.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    id: "anniversary",
    title: "Anniversary Gifts",
    caption: "Celebrate love, commitment and beautiful memories.",
    image: "/images/collection-celebration.webp",
    alt: "An ivory gift box with a rose-pink ribbon and delicate flowers.",
    description: "Discover elegant anniversary gift boxes, personalized keepsakes and thoughtful surprises to celebrate relationships and special milestones.",
  },
  {
    id: "valentines-day",
    title: "Valentine's Day Gifts",
    caption: "Make love and appreciation memorable with thoughtful gifts.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Valentine_roses_%286877465121%29.jpg",
    alt: "A bouquet of red roses arranged as a Valentine's Day gift.",
    description: "Explore romantic gift arrangements, personalized presents, beautiful gift boxes and carefully curated surprises for someone special.",
    imageCredit: "Andy / Andrew Fogg",
    imageSource: "https://commons.wikimedia.org/wiki/File:Valentine_roses_(6877465121).jpg",
    imageLicense: "CC BY 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    id: "wedding",
    title: "Wedding Gifts",
    caption: "Celebrate new beginnings with meaningful wedding presents.",
    image: "/images/atelier.webp",
    alt: "A gift box being carefully finished by hand with a soft ivory satin bow.",
    description: "Discover elegant wedding hampers, personalized couple gifts, customized keepsakes and beautiful presents for newlyweds.",
  },
  {
    id: "baby-shower",
    title: "Baby Shower Gifts",
    caption: "Welcome a beautiful new beginning with thoughtful gifts.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Baby_shower_gifts_-_October_2022_Sarah_Stierch.jpg/960px-Baby_shower_gifts_-_October_2022_Sarah_Stierch.jpg",
    alt: "A collection of presents arranged for a baby shower.",
    description: "Explore adorable baby hampers, personalized baby accessories, customized blankets and carefully arranged presents for expecting parents.",
    imageCredit: "Missvain",
    imageSource: "https://commons.wikimedia.org/wiki/File:Baby_shower_gifts_-_October_2022_Sarah_Stierch.jpg",
    imageLicense: "CC BY 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  {
    id: "mothers-day",
    title: "Mother's Day Gifts",
    caption: "Celebrate mothers with gifts that express appreciation and love.",
    image: "/images/collection-signature.webp",
    alt: "A forest-green gift box arranged with a candle, keepsake and champagne ribbon.",
    description: "Discover thoughtful gift hampers, personalized mugs, beautiful gift arrangements and meaningful keepsakes to make Mother's Day special.",
  },
  {
    id: "fathers-day",
    title: "Father's Day Gifts",
    caption: "Show appreciation with thoughtful gifts for fathers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Father%E2%80%99s_Day_gifts_in_supermarkets%2C_Brisbane%2C_Queensland%2C_2021.jpg/960px-Father%E2%80%99s_Day_gifts_in_supermarkets%2C_Brisbane%2C_Queensland%2C_2021.jpg",
    alt: "A display of Father's Day gift options.",
    description: "Explore personalized accessories, customized mugs, elegant gift boxes and carefully selected presents for fathers and father figures.",
    imageCredit: "Kgbo",
    imageSource: "https://commons.wikimedia.org/wiki/File:Father%E2%80%99s_Day_gifts_in_supermarkets,_Brisbane,_Queensland,_2021.jpg",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    id: "corporate",
    title: "Corporate Gifts",
    caption: "Make professional relationships more meaningful through thoughtful gifting.",
    image: "/images/collection-corporate.webp",
    alt: "An emerald notebook, gold pen and ribbon-wrapped gift arranged for a professional occasion.",
    description: "Discover executive gift hampers, branded merchandise, customized office accessories and corporate appreciation packages for employees, clients and business partners.",
  },
  {
    id: "christmas-festive",
    title: "Christmas and Festive Gifts",
    caption: "Share the joy of the festive season with beautiful gifts.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Gift_box_I.jpg/960px-Gift_box_I.jpg",
    alt: "A red gift box finished with a white ribbon and bow.",
    description: "Explore festive gift hampers, beautifully wrapped presents, personalized gift boxes and seasonal surprises for family, friends and colleagues.",
    imageCredit: "Milad Mosapoor",
    imageSource: "https://commons.wikimedia.org/wiki/File:Gift_box_I.jpg",
    imageLicense: "Commercial use permitted with attribution",
  },
  {
    id: "friendship",
    title: "Friendship Gifts",
    caption: "Celebrate meaningful friendships with thoughtful surprises.",
    image: "/images/gifting-hero.webp",
    alt: "A collection of beautifully wrapped gifts arranged for a special occasion.",
    description: "Discover personalized friendship gifts, customized keepsakes, beautiful gift boxes and special presents to appreciate the people who matter.",
  },
  {
    id: "congratulations-appreciation",
    title: "Congratulations and Appreciation Gifts",
    caption: "Recognize achievements and celebrate important milestones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gift_box.jpg/960px-Gift_box.jpg",
    alt: "A red gift box wrapped with a white ribbon for a special milestone.",
    description: "Explore thoughtful celebration hampers, personalized presents and meaningful gifts for promotions, achievements, new beginnings and special accomplishments.",
    imageCredit: "Milad Mosapoor",
    imageSource: "https://commons.wikimedia.org/wiki/File:Gift_box.jpg",
    imageLicense: "Commercial use permitted with attribution",
  },
];
