import "server-only";

import type { Metadata } from "next";
import { site } from "@/src/config/site";

type SocialLink = {
  label: string;
  url: string;
};

type PostalAddress = {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
};

export type SiteConfig = {
  brand: {
    name: string;
    legalName?: string;
    tagline?: string;
  };
  urls: {
    /** Primary canonical site URL (single source of truth). */
    site: URL;
  };
  contact: {
    email?: string;
    phone?: string;
    location?: string;
    hours?: string;
  };
  social: {
    links: SocialLink[];
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    titleTemplate: (pageTitle: string) => string;
    routeDescriptions: Partial<
      Record<"/" | "/about" | "/projects" | "/contact", string>
    >;
    openGraph: {
      locale: string;
      type: "website";
      images: Array<{
        url: string;
        width: number;
        height: number;
        alt: string;
      }>;
    };
    twitter: {
      card: "summary_large_image";
      handle?: string;
      site?: string;
    };
  };
  schemaOrg: {
    businessType:
      | "Person"
      | "ProfessionalService"
      | "LocalBusiness"
      | "Organization";
    name: string;
    description: string;
    imagePath?: string;
    logoPath?: string;
    address?: PostalAddress;
    areaServed?: string[];
    credentials?: string[];
    sameAs: string[];
  };
};

function absoluteUrl(pathname: string): URL {
  return new URL(pathname.replace(/^\/*/, "/"), siteConfig.urls.site);
}

export const siteConfig: SiteConfig = {
  brand: {
    name: site.person.name,
    legalName: site.person.name,
    tagline: site.brand.tagline,
  },
  urls: {
    site: new URL(site.urls.canonical),
  },
  contact: {
    email: site.person.email,
    location: site.person.location,
    // phone/hours intentionally omitted until you add real values.
  },
  social: {
    // TODO: Add real profile URLs (LinkedIn/GitHub/etc.) to strengthen entity signals.
    links: site.social.links.map((l) => ({ label: l.name, url: l.href })),
  },
  seo: {
    defaultTitle: "Serge Khalil — Web & Mobile Developer",
    defaultDescription:
      "Portfolio of Serge Khalil, a web and mobile developer specializing in Next.js, React.js, Three.js, Flutter, AI prompting, and enterprise VPN solutions.",
    titleTemplate: (pageTitle) => `${pageTitle} — ${siteConfig.brand.name}`,
    routeDescriptions: {
      "/": "Portfolio of Serge Khalil showcasing web development, mobile applications, AI integrations, and modern digital experiences.",
      "/about":
        "About Serge Khalil — 4 years of experience in web and mobile development with expertise in Next.js, React, Flutter, Three.js, AI prompting, and enterprise solutions.",
      "/projects":
        "Selected projects by Serge Khalil featuring modern web applications, mobile apps, AI integrations, and interactive user experiences.",
      "/contact":
        "Contact Serge Khalil for freelance projects, collaborations, web development, mobile applications, AI solutions, and consulting.",
    },
    openGraph: {
      locale: "en_US",
      type: "website",
      images: [
        {
          // TODO: Replace with a dedicated 1200x630 OG image.
          url: site.assets.ogImage,
          width: 1200,
          height: 630,
          alt: "Serge Khalil — Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      // TODO: Add @handle once available.
    },
  },
  schemaOrg: {
    businessType: "ProfessionalService",
    name: "Serge Khalil",
    description:
      "Professional portfolio of Serge Khalil, a web and mobile developer with 4 years of experience delivering modern applications, AI-powered solutions, enterprise VPN setups, and immersive digital experiences.",
    imagePath: site.assets.ogImage,
    logoPath: site.assets.logo,
    address: {
      addressCountry: "LB",
      addressRegion: "Mount Lebanon",
    },
    areaServed: ["Worldwide", "Lebanon", "Middle East"],
    credentials: [
      "4 Years Experience in Web & Mobile Development",
      "20+ Completed Projects",
      "Next.js & React.js Specialist",
      "Flutter Mobile Developer",
      "Three.js Interactive Experiences",
      "AI Prompt Engineering",
      "Enterprise VPN Setup with NordLayer",
    ],
    sameAs: [],
  },
};

export function pageMetadata(
  title: string,
  description?: string,
  options?: {
    pathname?: string;
    ogImagePath?: string;
    noIndex?: boolean;
  },
): Metadata {
  const base = siteConfig.urls.site;
  const pathname = options?.pathname ?? "/";
  const canonical = new URL(pathname.replace(/^\/*/, "/"), base);
  const desc = description ?? siteConfig.seo.defaultDescription;

  const ogImage =
    options?.ogImagePath ??
    siteConfig.seo.openGraph.images[0]?.url ??
    site.assets.icon;

  const ogImageAbs = new URL(ogImage.replace(/^\/*/, "/"), base).toString();

  return {
    metadataBase: base,
    title: siteConfig.seo.titleTemplate(title),
    description: desc,
    alternates: {
      canonical: canonical.toString(),
    },
    openGraph: {
      title: siteConfig.seo.titleTemplate(title),
      description: desc,
      url: canonical.toString(),
      siteName: siteConfig.brand.name,
      locale: siteConfig.seo.openGraph.locale,
      type: siteConfig.seo.openGraph.type,
      images: [
        {
          url: ogImageAbs,
          width: 1200,
          height: 630,
          alt: siteConfig.seo.openGraph.images[0]?.alt ?? siteConfig.brand.name,
        },
      ],
    },
    twitter: {
      card: siteConfig.seo.twitter.card,
      title: siteConfig.seo.titleTemplate(title),
      description: desc,
      images: [ogImageAbs],
    },
    robots: options?.noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : undefined,
  };
}

export function getRootMetadata(): Metadata {
  const base = siteConfig.urls.site;
  const title = siteConfig.seo.defaultTitle;
  const description = siteConfig.seo.defaultDescription;

  const ogImagePath =
    siteConfig.seo.openGraph.images[0]?.url ?? site.assets.icon;
  const ogImageAbs = new URL(ogImagePath.replace(/^\/*/, "/"), base).toString();

  return {
    metadataBase: base,
    title,
    description,
    alternates: {
      canonical: base.toString(),
    },
    icons: {
      icon: [{ url: site.assets.icon }],
      shortcut: [{ url: site.assets.icon }],
      apple: [{ url: site.assets.icon }],
      // TODO: Add `/public/favicon.ico` and `/public/apple-touch-icon.png` for best cross-device support.
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: base.toString(),
      siteName: siteConfig.brand.name,
      locale: siteConfig.seo.openGraph.locale,
      type: siteConfig.seo.openGraph.type,
      images: [
        {
          url: ogImageAbs,
          width: 1200,
          height: 630,
          alt: siteConfig.seo.openGraph.images[0]?.alt ?? siteConfig.brand.name,
        },
      ],
    },
    twitter: {
      card: siteConfig.seo.twitter.card,
      title,
      description,
      images: [ogImageAbs],
    },
  };
}

export function getHomeMetadata(): Metadata {
  return pageMetadata("Home", siteConfig.seo.routeDescriptions["/"], {
    pathname: "/",
  });
}

export function getAboutMetadata(): Metadata {
  return pageMetadata("About", siteConfig.seo.routeDescriptions["/about"], {
    pathname: "/about",
  });
}

export function getProjectsMetadata(): Metadata {
  return pageMetadata(
    "Projects",
    siteConfig.seo.routeDescriptions["/projects"],
    {
      pathname: "/projects",
    },
  );
}

export function getContactMetadata(): Metadata {
  return pageMetadata("Contact", siteConfig.seo.routeDescriptions["/contact"], {
    pathname: "/contact",
  });
}

export function getJsonLdGraph() {
  const base = siteConfig.urls.site;
  const homeUrl = absoluteUrl("/").toString();
  const imageUrl = new URL(
    (siteConfig.schemaOrg.imagePath ?? site.assets.ogImage).replace(/^\/*/, "/"),
    base,
  ).toString();
  const logoUrl = new URL(
    (siteConfig.schemaOrg.logoPath ?? site.assets.logo).replace(/^\/*/, "/"),
    base,
  ).toString();

  const sameAs = [
    ...siteConfig.schemaOrg.sameAs,
    ...siteConfig.social.links.map((l) => l.url),
  ].filter(Boolean);

  const person = {
    "@type": "Person",
    "@id": `${homeUrl}#identity`,
    name: siteConfig.schemaOrg.name,
    url: homeUrl,
    description: siteConfig.schemaOrg.description,
    image: imageUrl,
    sameAs,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${homeUrl}#website`,
    url: homeUrl,
    name: siteConfig.brand.name,
    description: siteConfig.seo.defaultDescription,
    publisher: { "@id": `${homeUrl}#identity` },
    inLanguage: "en",
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${homeUrl}#webpage`,
    url: homeUrl,
    name: siteConfig.seo.defaultTitle,
    isPartOf: { "@id": `${homeUrl}#website` },
    about: { "@id": `${homeUrl}#identity` },
    primaryImageOfPage: { "@id": `${homeUrl}#primaryimage` },
  };

  const imageObject = {
    "@type": "ImageObject",
    "@id": `${homeUrl}#primaryimage`,
    url: imageUrl,
    contentUrl: imageUrl,
    caption: siteConfig.brand.name,
    width: 1200,
    height: 630,
  };

  const organization = {
    "@type": "Organization",
    "@id": `${homeUrl}#organization`,
    name: siteConfig.brand.name,
    url: homeUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, webPage, imageObject, organization],
  };
}
