import { site } from "@/src/config/site";
import { skillsContent } from "@/src/content/skills";

// Back-compat exports used by existing components.
export const Socials = site.social.links.map((l) => ({
  name: l.name,
  src: l.iconSrc,
  link: l.href,
}));

const byKey = Object.fromEntries(
  skillsContent.categories.map((c) => [c.key, c]),
) as Record<
  typeof skillsContent.categories[number]["key"],
  (typeof skillsContent.categories)[number]
>;

const toLegacy = (key: keyof typeof byKey) =>
  byKey[key].items.map((i) => ({
    skill_name: i.skillName,
    Image: i.imageSrc,
    width: i.width,
    height: i.height,
  }));

// Back-compat exports used by existing components. These intentionally map to the *new* section keys.
export const Frontend_skill = toLegacy("frontend-engineering");
export const Backend_skill = toLegacy("backend-systems");
export const DevTools = toLegacy("tooling-devops-ai");
export const libraries = toLegacy("3d-interactive-dev");

// TODO: Remove or migrate legacy `Skill_data` usage if it exists elsewhere.
export const Skill_data = [
  ...Frontend_skill,
  ...Backend_skill,
  ...DevTools,
  ...libraries,
];