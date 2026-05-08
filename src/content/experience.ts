import type { ExperienceItem } from "@/src/types/content";

export const experienceContent = {
  heading: { title: "Work", accent: "Experience" },
  subtitle:
    "A progression of focused engineering work across web, mobile, and infrastructure systems.",
  items: [
    {
      role: "Web & Frontend Engineer",
      org: "Freelance / Contract · Collaboration with MoonDev",
      period: "2020 – 2023",
      summary:
        "Built and delivered production-grade web applications using React and Next.js, focusing on performance, scalability, and clean UI architecture. Collaborated with MoonDev on multiple client and product-based projects, contributing to frontend architecture decisions, reusable component systems, and modern UI implementation standards.",
    },
    {
      role: "Mobile Application Developer",
      org: "Freelance / Contract",
      period: "2023 – 2024",
      summary:
        "Developed cross-platform mobile applications using Flutter and React Native. Delivered full application features including authentication flows, API integrations, state management, and polished user interfaces optimized for both iOS and Android environments.",
    },
    {
      role: "Full Stack & Systems Engineer",
      org: "Independent / Contract Projects",
      period: "2024 – Present",
      summary:
        "Working across full-stack architectures with Next.js, backend services, and scalable API systems. Focused on system design, secure authentication flows, and infrastructure-level implementations, including VPN-related networking solutions and secure data routing patterns for modern applications.",
    },
  ] satisfies ExperienceItem[],
} as const;
