export type GoogleReview = {
  author: string;
  age: string;
  text: string;
  topic: string;
};

export const googleReviewSummary = {
  rating: "4.1",
  count: "22",
  source: "Google reviews",
};

export const googleReviews: GoogleReview[] = [
  {
    author: "True Path Wellness Info",
    age: "10 months ago",
    topic: "Custom framing",
    text:
      "Just picked up some artwork that we had Jon frame for our office, and we are very happy with how it turned out.",
  },
  {
    author: "Nancy L'Ecuyer",
    age: "2 years ago",
    topic: "Craft projects",
    text:
      "I always know his expertise in picking colors for the mat and framing and his pricing for personalized sizes can't be beat.",
  },
  {
    author: "Audrey Eisenmenger",
    age: "4 years ago",
    topic: "Odd-size prints",
    text:
      "Jon did an excellent, high quality job of framing them, at a reasonable price.",
  },
  {
    author: "Lauren Philbrook",
    age: "4 years ago",
    topic: "Watercolor framing",
    text:
      "They were able to get all the wrinkles out and did a beautiful job with the framing.",
  },
  {
    author: "Beth Masters",
    age: "Edited 6 years ago",
    topic: "Film, restoration, framing",
    text:
      "I have been taking my business -- film developing, photo restoration, and framing -- to Jon's Darkroom for decades now.",
  },
  {
    author: "Eric Karandy",
    age: "12 years ago",
    topic: "Fast custom gift",
    text:
      "Took great care of me for a last minute Valentines Day gift. Highly recommended.",
  },
];
