import type { SocialLink } from "@/src/types/content";

export const site = {
  urls: {
    canonical: "https://sergekhalil.com",
  },
  company: {
    name: "SK Development",
  },

  person: {
    name: "Serge Khalil",
    roles: [
      "Web Developer",
      "Frontend Engineer",
      "Mobile Developer",
      "AI Prompt Engineer",
    ],
    location: "Lebanon",
    email: "sergekhalil@live.com",
  },
  brand: {
    tagline: "Web & Mobile Developer • AI Prompt Engineer",
  },
  stats: {
    yearsExperience: 4,
    completedProjects: 20,
  },
  assets: {
    // NOTE: These are the only assets currently confirmed in `/public` by the repo scan.
    // Replace/add real assets in `/public` then update these paths.
    icon: "/images/brand/sk-dev-logo.webp",
    logo: "/images/brand/sk-dev-logo.webp",
    heroIllustration: "/images/hero/illustration-dark.svg",
    ogImage: "/images/about/profile.webp",
  },
  social: {
    links: [
      // TODO: Replace these with Serge's real URLs and (optional) update iconSrc.
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/serge-khalil/",
        iconSrc: "/images/icons/social/linkedin.svg",
      },
      {
        name: "GitHub",
        href: "https://github.com/SergeK-code",
        iconSrc: "/images/icons/social/github.svg",
      },
    ] satisfies SocialLink[],
  },
} as const;
