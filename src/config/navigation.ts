import type { NavItem } from "@/src/types/content";

export const navigation = {
  items: [
    { id: "about", href: "#about", label: "About" },
    { id: "skills", href: "#skills", label: "Skills" },
    { id: "experience", href: "#experience", label: "Experience" },
    { id: "projects", href: "#projects", label: "Projects" },
    { id: "contact", href: "#contact", label: "Contact" },
  ] satisfies NavItem[],
} as const;

