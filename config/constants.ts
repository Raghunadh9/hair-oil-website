import { ICONS } from "@/components/shared/components/icons";
import { config } from "./config";

export const NavLinks: TypeofNavLinks[] = [
  { href: "/", key: "Home", text: "Home" },
  { href: "/shop", key: "Shop", text: "Shop" },
  { href: "/hair-oils", key: "Hair Oils", text: "Hair Oils" },
  { href: "/collections", key: "Collections", text: "Collections" },
];
export const Testimonials: TypeofTestimonials[] = [
  { name: "", image_url: "", rating: 0, review: "" },
];
export const UserLoggedinLinks: TypeofNavLinks[] = [
  { href: "/my-orders", key: "My Orders", text: "My Orders" },
  { href: "/track-order", key: "Track Order", text: "Track Order" },
  { href: "", key: "Logout", text: "Logout" },
];
export const NavLinksMobile: TypeofNavLinks[] = [
  { href: "/", key: "Home", text: "Home" },
  { href: "/shop", key: "Shop", text: "Shop" },
  { href: "/hair-oils", key: "Hair Oils", text: "Hair Oils" },
  { href: "/search-suggestions", key: "Search", text: "Search" },
  { href: "/favourites", key: "My Favourites", text: "My Favourites" },
  { href: "/cart", key: "Cart", text: "Cart" },
  { href: "/collections", key: "Collections", text: "Collections" },
];
export const ProductBadgesDataLeft: TypeofProductBadgesData[] = [
  { title: "Secure Payments", icon: ICONS.securePay },
  { title: "Free Shipping", icon: ICONS.fastShipping },
];
export const ProductBadgesDataRight: TypeofProductBadgesData[] = [
  { title: "Safety Certified", icon: ICONS.safety },
  { title: "High Quality", icon: ICONS.rightBadge },
];
export const HomeShowcaseContent: TypeofHomeShowcaseContent[] = [
  {
    title: `Secret of Ayurveda`,
    description: `Discover the ancient secrets of Ayurveda for hair care with ${config.websiteTitle}. Our Ayurvedic hair oil is meticulously crafted to provide you with the best natural care for your hair. Say goodbye to harsh chemicals and hello to the goodness of nature.`,
    image: "images/home/4.jpeg",
  },
  {
    title: "Why Choose Ayurvedic Hair Care?",
    description: `Ayurveda, the science of life, has been trusted for centuries for holistic well-being. Our Ayurvedic hair oil harnesses the power of time-tested herbs and natural oils to nourish your hair from root to tip. Experience the difference with ${config.websiteTitle}.`,
    image: "images/home/2.jpeg",
  },
  {
    title: "Our Commitment to Quality",
    description: `At ${config.websiteTitle}, quality is our top priority. We source the finest ingredients to create our Ayurvedic hair oil, ensuring purity and potency in every bottle. Rest assured, each drop is a testament to our dedication to your hair's health and beauty.`,
    image: "images/home/3.jpeg",
  },
];
export const footerLinks: TypeofFooterLinks[] = [
  {
    title: "For developers",
    links: [
      "Go Pro!",
      "Explore development work",
      "Development blog",
      "Code podcast",
      "Open-source projects",
      "Refer a Friend",
      "Code of conduct",
    ],
  },
  {
    title: "Hire developers",
    links: [
      "Post a job opening",
      "Post a freelance project",
      "Search for developers",
    ],
  },
  {
    title: "Brands",
    links: ["Advertise with us"],
  },
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Support",
      "Media kit",
      "Testimonials",
      "API",
      "Terms of service",
      "Privacy policy",
      "Cookie policy",
    ],
  },
  {
    title: "Directories",
    links: [
      "Development jobs",
      "Developers for hire",
      "Freelance developers for hire",
      "Tags",
      "Places",
    ],
  },
  {
    title: "Development assets",
    links: [
      "Code Marketplace",
      "GitHub Marketplace",
      "NPM Registry",
      "Packagephobia",
    ],
  },
  {
    title: "Development Resources",
    links: [
      "Freelancing",
      "Development Hiring",
      "Development Portfolio",
      "Development Education",
      "Creative Process",
      "Development Industry Trends",
    ],
  },
];
