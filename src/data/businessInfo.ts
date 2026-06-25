/**
 * Business information — name, address, contact, hours, and shop history.
 *
 * Single source of truth used by the Navbar, Footer, Contact page, and the
 * "Visit the Shop" section. Editable from /admin/business-info.
 *
 * TODO: Move to a Supabase `business_info` row (single record) so Jon can edit
 *       hours and contact details without a deploy.
 */

export type DayHours = {
  day: string;
  /** Display string, e.g. "11AM – 4PM" or "Closed" */
  hours: string;
  closed: boolean;
};

export type BusinessInfo = {
  name: string;
  tagline: string;
  concept: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  hours: DayHours[];
  yearsServing: number;
  /** Short note shown on the Contact page */
  specialtyNote: string;
  social: {
    label: string;
    href: string;
  }[];
  /** Google Maps embed/search query for the map placeholder + directions */
  mapsQuery: string;
};

export const businessInfo: BusinessInfo = {
  name: "Jon's Darkroom & Frameshop",
  tagline: "Preserving Vermont's Memories",
  concept:
    "A handcrafted, local memory-preservation shop in Essex Junction, Vermont.",
  address: {
    street: "159 Pearl Street",
    city: "Essex Junction",
    state: "VT",
    zip: "05452",
  },
  phoneDisplay: "(802) 879-4485",
  phoneHref: "+18028794485",
  email: "hello@jonsdarkroom.com",
  hours: [
    { day: "Monday", hours: "11AM – 4PM", closed: false },
    { day: "Tuesday", hours: "11AM – 4PM", closed: false },
    { day: "Wednesday", hours: "11AM – 4PM", closed: false },
    { day: "Thursday", hours: "11AM – 4PM", closed: false },
    { day: "Friday", hours: "11AM – 4PM", closed: false },
    { day: "Saturday", hours: "11AM – 2PM", closed: false },
    { day: "Sunday", hours: "Closed", closed: true },
  ],
  yearsServing: 35,
  specialtyNote:
    "Please call before stopping by for specialty services (film processing, restoration quotes, video transfers, or specific camera gear) so we can have everything ready for you.",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
  mapsQuery: "Jon's Darkroom & Frameshop, 159 Pearl Street, Essex Junction, VT 05452",
};

/** Condensed hours for compact displays (groups weekdays). */
export const condensedHours: { label: string; value: string }[] = [
  { label: "Mon – Fri", value: "11AM – 4PM" },
  { label: "Saturday", value: "11AM – 2PM" },
  { label: "Sunday", value: "Closed" },
];

export const fullAddress = `${businessInfo.address.street}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  businessInfo.mapsQuery,
)}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  businessInfo.mapsQuery,
)}&output=embed`;
