import type { ProjectItem } from "@/src/types/content";

export const projectsContent = {
  heading: { title: "Chosen", accent: "Projects" },
  subtitle: "Things I’ve built that I’m proud of.",

  items: [
    {
      imageSrc: "/images/projects/actros-showcase.webp",
      href: "https://actrosshowcase.netlify.app/",
      title: "ACTROS Showcase",
      description:
        "A dynamic web application built for ACTROS, a leading truck manufacturer. The platform serves as a comprehensive showcase of their latest models, features, and innovations. It provides an engaging user experience with interactive elements, detailed specifications, and multimedia content to highlight the capabilities of ACTROS trucks.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      imageSrc: "/images/projects/jad-steel.webp",
      href: "http://jad-steel.com/",
      title: "Jad Steel",
      description:
        "A Lebanon-based steel trading company specializing in structural and industrial materials for construction and fabrication. The platform highlights their services, product range, and industry capabilities. Built to strengthen their corporate presence and support client acquisition.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    },

    {
      imageSrc: "/images/projects/balance-by-rouba.webp",
      href: "https://balancebyrouba.netlify.app/",
      title: "Balance by Rouba",
      description:
        "A modern website for a clinical dietitian enabling patients to submit online inquiries and book consultations easily. It presents nutrition services in a clean, trustworthy, health-focused interface. Designed to simplify patient communication and improve accessibility to dietary consultations.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    },

    {
      imageSrc: "/images/projects/hdcompany.webp",
      href: "https://hdcompany.co/en",
      title: "HD Company",
      description:
        "An F&B consulting and execution platform delivering full-cycle solutions from concept to execution and aftersales. The company operates in Lebanon and internationally, including Africa. Built to showcase services, workflow, and streamline client inquiries for global F&B projects.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    },

    {
      imageSrc: "/images/projects/milta-me.webp",
      href: "https://milta-me.com/",
      title: "Milta ME",
      description:
        "A medical technology company specializing in innovative devices across quantum, preventive, and natural medicine. The platform showcases equipment, distribution partnerships, and custom device development. Based in Beirut, it also highlights after-sales support and spare parts services.",
      tags: ["HTML", "CSS", "JavaScript"],
    },

    {
      imageSrc: "/images/projects/al-bayt.webp",
      href: "https://albayt.com.qa/",
      title: "Al Bayt",
      description:
        "A Qatar-based construction and real estate company delivering turnkey solutions for residential and commercial projects. It emphasizes efficient project management, cost optimization, and high-quality execution. Built to position the company as a trusted partner for sustainable real estate growth.",
      tags: ["HTML", "CSS", "JavaScript"],
    },
  ] satisfies ProjectItem[],
} as const;
