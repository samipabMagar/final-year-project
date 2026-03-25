import { Facebook, Instagram, Twitter } from "lucide-react";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { navLinks } from "@/constants/navData";

export { navLinks as exploreLinks };

export const accountLinks = [
  { href: LOGIN_ROUTE, label: "Sign In" },
  { href: REGISTER_ROUTE, label: "Get Started" },
];

export const socialLinks = [
  { href: "#", label: "Facebook", Icon: Facebook },
  { href: "#", label: "Instagram", Icon: Instagram },
  { href: "#", label: "Twitter / X", Icon: Twitter },
];
