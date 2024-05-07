import { ICONS } from "@/components/shared/components/icons";
import { config } from "./config";

export const NavLinks: TypeofNavLinks[] = [
  { href: "/", key: "Home", text: "Home" },
  { href: "/shop", key: "Shop", text: "Shop" },
  { href: "/best-seller", key: "Best Seller", text: "Best Seller" },
  { href: "/track-order", key: "Track order", text: "Track order" },
];
export const Testimonials: TypeofTestimonials[] = [
  { name: "", image_url: "", rating: 0, review: "" },
];
export const UserLoggedinLinks: TypeofNavLinks[] = [
  { href: "/my-profile", key: "My Profile", text: "My Profile" },
  {
    href: "/my-profile/orders?tab=1&q=all-orders__",
    key: "My Orders",
    text: "My Orders",
  },
  {
    href: "/my-profile/address",
    key: "My Addresses",
    text: "My Addresses",
  },
  { href: "/track-order", key: "Track Order", text: "Track Order" },

  { href: "", key: "Logout", text: "Logout" },
];
export const NavLinksMobile: TypeofNavLinks[] = [
  { href: "/", key: "Home", text: "Home" },
  { href: "/shop", key: "Shop", text: "Shop" },
  { href: "/search-suggestions", key: "Search", text: "Search" },
  { href: "/track-order", key: "Track order", text: "Track order" },
  { href: "/favourites", key: "My Favourites", text: "My Favourites" },
];
export const ProductBadgesDataLeft: TypeofProductBadgesData[] = [
  { title: "Secure Payments", icon: ICONS.securePay },
  { title: "Natural Ingredients", icon: ICONS.branch },
];
export const ProductBadgesDataRight: TypeofProductBadgesData[] = [
  { title: "Safety Certified", icon: ICONS.safety },
  { title: "Hand Made", icon: ICONS.handmade },
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
type TypeofPaymentMethods = {
  name: string;
  id: string;
  description?: string;
  images: [];
};
export const paymentMethods: TypeofPaymentMethods[] = [
  {
    name: "RazorPay",
    id: "razorPay",
    images: [],
  },

  {
    name: "Cash",
    id: "cash",
    description:
      "If you don't have a paypal account,you can also pay via paypal with your credit card or bank debit card. Payment can be submitted in any currency!",
    images: [],
  },
];
export const ProfilePagesidebarData = [
  {
    heading: "My Account",
    links: [
      {
        name: "My Profile",
        link: "/profile",
      },
      {
        name: "Addresses",
        link: "/profile/address",
      },
      {
        name: "My Payment Options",
        link: "/profile/payment",
      },
      {
        name: "Account Security",
        link: "/profile/security",
      },
    ],
  },
  {
    heading: "My Orders",
    links: [
      {
        name: "All Orders",
        link: "/profile/orders",
        filter: "",
      },
      {
        name: "Paid Orders",
        link: "/profile/orders",
        filter: "paid",
      },
      {
        name: "Unpaid Orders",
        link: "/profile/orders",
        filter: "unpaid",
      },

      {
        name: "Processing Orders",
        link: "/profile/orders",
        filter: "Processing",
      },
      {
        name: "Unprocessed Orders",
        link: "/profile/orders",
        filter: "Not Processed",
      },
      {
        name: "Dispatched Orders",
        link: "/profile/orders",
        filter: "Dispatched",
      },
      {
        name: "Delievered Orders",
        link: "/profile/orders",
        filter: "Completed",
      },
      {
        name: "Cancelled Orders",
        link: "/profile/orders",
        filter: "Cancelled",
      },
    ],
  },
  {
    heading: "My Lists",
    links: [
      {
        name: "Whishlist",
        link: "/profile/wishlist",
      },
      {
        name: "Recently Viewed",
        link: "/profile/recent",
      },
    ],
  },
  {
    heading: "Customer Service",
    links: [
      {
        name: "My Message",
        link: "/profile/messages",
      },
      {
        name: "Service Records",
        link: "/profile/services",
      },
    ],
  },
  {
    heading: "Other Services",
    links: [
      {
        name: "Survey Center",
      },
      {
        name: "Contact Preferences",
      },
    ],
  },
  {
    heading: "Policy",
    links: [
      {
        name: "Shipping Info",
      },
      {
        name: "Return Policy",
      },
      {
        name: "Privacy & Cookie Policy",
      },
    ],
  },
  {
    heading: "Sign out",
    link: [],
  },
];

export const ProfilePageordersLinks = [
  {
    name: "All Orders",
    filter: "",
  },
  {
    name: "Paid Orders",
    filter: "paid",
  },
  {
    name: "Unpaid Orders",
    filter: "unpaid",
  },
  {
    name: "Processing Orders",
    filter: "Processing",
  },
  {
    name: "Unprocessed Orders",
    filter: "Not Processed",
  },
  {
    name: "Dispatched Orders",
    filter: "Dispatched",
  },
  {
    name: "Delievered Orders",
    filter: "Delievered",
  },
  {
    name: "Cancelled Orders",
    filter: "Cancelled",
  },
];
