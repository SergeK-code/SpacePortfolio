import { SkillCategory } from "../types/content";

export const skillsContent = {
  heading: { title: "My", accent: "Expertise" },
  subtitle: "Engineering modern, scalable, and interactive digital systems.",
  backgroundVideoSrc: "/videos/skills/cards-video.webm",

  categories: [
    {
      key: "frontend-engineering",
      title: "Frontend Engineering",
      items: [
        {
          skillName: "Next.js",
          imageSrc: "/images/skills/next.png",
          width: 55,
          height: 55,
        },
        {
          skillName: "React",
          imageSrc: "/images/skills/react.png",
          width: 55,
          height: 55,
        },
        {
          skillName: "TypeScript",
          imageSrc: "/images/skills/ts.png",
          width: 50,
          height: 50,
        },
        {
          skillName: "Tailwind CSS",
          imageSrc: "/images/skills/tailwind.png",
          width: 60,
          height: 60,
        },
      ],
    },

    {
      key: "state-data-architecture",
      title: "State & Data Architecture",
      items: [
        {
          skillName: "React Query",
          imageSrc: "/images/skills/react-query.png",
          width: 50,
          height: 50,
        },
        {
          skillName: "Zustand",
          imageSrc: "/images/skills/zustand.png",
          width: 50,
          height: 50,
        },
        {
          skillName: "Supabase",
          imageSrc: "/images/icons/tools/supabase.svg",
          width: 40,
          height: 40,
        },
        {
          skillName: "Firebase",
          imageSrc: "/images/skills/firebase.png",
          width: 50,
          height: 50,
        },
      ],
    },

    {
      key: "backend-systems",
      title: "Backend & Systems",
      items: [
        {
          skillName: "Node.js",
          imageSrc: "/images/skills/node-js.png",
          width: 40,
          height: 40,
        },
        {
          skillName: "PostgreSQL",
          imageSrc: "/images/skills/postger.png",
          width: 50,
          height: 50,
        },
        {
          skillName: "Firebase",
          imageSrc: "/images/skills/firebase.png",
          width: 50,
          height: 50,
        },
        {
          skillName: "Supabase",
          imageSrc: "/images/skills/supabase.png",
          width: 50,
          height: 50,
        },
      ],
    },

    {
      key: "3d-interactive-dev",
      title: "3D & Interactive Experiences",
      items: [
        {
          skillName: "Three.js",
          imageSrc: "/images/skills/threejs.png",
          width: 50,
          height: 50,
        },
        {
          skillName: "Framer Motion",
          imageSrc: "/images/skills/framer.png",
          width: 50,
          height: 50,
        },
      ],
    },

    {
      key: "tooling-devops-ai",
      title: "Tooling & AI Workflow",
      items: [
        {
          skillName: "Git & GitHub",
          imageSrc: "/images/skills/gitwhite.png",
          width: 50,
          height: 50,
        },
        {
          skillName: "Vercel",
          imageSrc: "/images/icons/tools/vercel.svg",
          width: 50,
          height: 50,
        },
        {
          skillName: "VS Code",
          imageSrc: "/images/icons/tools/vs.svg",
          width: 50,
          height: 50,
        },
        {
          skillName: "AI Prompt Engineering",
          imageSrc: "/images/icons/tools/chatgpt.svg",
          width: 50,
          height: 50,
        },
      ],
    },
  ] satisfies SkillCategory[],
} as const;
