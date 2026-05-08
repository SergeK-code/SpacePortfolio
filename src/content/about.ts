export const aboutContent = {
  heading: { title: "About", accent: "Me" },
  profile: {
    // TODO: Add an actual portrait in `/public` and update this path.
    imageSrc: "/images/about/profile.webp",
    imageAlt: "Serge Khalil portrait",
    name: "Serge Khalil",
  },
  bio: [
    "I build modern web and mobile applications with a premium product mindset: clean UX, reliable architecture, and performance-first delivery.",
    "My core stack is Next.js, React, TypeScript, and Three.js for immersive experiences—plus Flutter and React Native for mobile.",
    "I also integrate AI prompting into real workflows, and handle enterprise VPN setups using NordLayer when projects require it.",
  ],
  footerLine: "Shaping tomorrow with code and creativity",
  media: {
    // TODO: Add the video file to `/public` or change this path.
    backgroundVideoSrc: "/videos/about/encryption.webm",
  },
} as const;

