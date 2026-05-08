export type NavItem = {
  id: string;
  href: `#${string}` | `/${string}` | "/";
  label: string;
};

export type SocialLink = {
  name: string;
  href: string;
  iconSrc: string;
};

export type SkillIcon = {
  skillName: string;
  imageSrc: string;
  width: number;
  height: number;
};

export type SkillCategory = {
  key:
    | "frontend"
    | "backend"
    | "devtools"
    | "libraries"
    | "frontend-engineering"
    | "state-data-architecture"
    | "backend-systems"
    | "3d-interactive-dev"
    | "tooling-devops-ai";
  title: string;
  items: SkillIcon[];
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  summary: string;
};

export type ProjectItem = {
  imageSrc: string;
  href: string;
  title: string;
  description: string;
  tags: string[];
};

