import React from "react";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

import { FaYoutube } from "react-icons/fa";
import { site } from "@/src/config/site";
import { footerContent } from "@/src/content/footer";

const Footer = () => {
  const github = site.social.links.find(
    (l) => l.name.toLowerCase() === "github",
  );
  const linkedin = site.social.links.find(
    (l) => l.name.toLowerCase() === "linkedin",
  );

  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8" />

        <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold text-lg mb-8">
          {site.person.name} • {site.brand.tagline}
        </p>

        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">
              {footerContent.community.title}
            </div>
            {/* <a
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-white transition-colors"
              href={footerContent.community.items[0].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
              <span className="text-[15px] ml-[6px]">
                {footerContent.community.items[0].label}
              </span>
            </a> */}
            <a
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-white transition-colors"
              href={github?.href ?? footerContent.community.items[1].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RxGithubLogo />
              <span className="text-[15px] ml-[6px]">
                {footerContent.community.items[1].label}
              </span>
            </a>
            {/* <a
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-white transition-colors"
              href={footerContent.community.items[2].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RxDiscordLogo />
              <span className="text-[15px] ml-[6px]">
                {footerContent.community.items[2].label}
              </span>
            </a> */}
          </div>
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">
              {footerContent.social.title}
            </div>
            {/* <a
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-white transition-colors"
              href={footerContent.social.items[0].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RxInstagramLogo />
              <span className="text-[15px] ml-[6px]">
                {footerContent.social.items[0].label}
              </span>
            </a> */}
            {/* <a
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-white transition-colors"
              href={footerContent.social.items[1].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RxTwitterLogo />
              <span className="text-[15px] ml-[6px]">
                {footerContent.social.items[1].label}
              </span>
            </a> */}
            <a
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-white transition-colors"
              href={linkedin?.href ?? footerContent.social.items[2].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RxLinkedinLogo />
              <span className="text-[15px] ml-[6px]">
                {footerContent.social.items[2].label}
              </span>
            </a>
          </div>
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">
              {footerContent.about.title}
            </div>
            <a
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-white transition-colors"
              href={footerContent.about.items[0].href}
            >
              <span className="text-[15px] ml-[6px]">
                {footerContent.about.items[0].label}
              </span>
            </a>
            <a
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-white transition-colors"
              href={footerContent.about.items[1].href}
            >
              <span className="text-[15px] ml-[6px]">
                {footerContent.about.items[1].label}
              </span>
            </a>
            <a
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-white transition-colors"
              href={`mailto:${site.person.email}`}
            >
              <span className="text-[15px] ml-[6px]">{site.person.email}</span>
            </a>
          </div>
        </div>

        <div className="mb-[20px] text-[15px] text-center">
          © {site.person.name} {new Date().getFullYear()}.{" "}
          {footerContent.copyright.rightsText}
        </div>
      </div>
    </div>
  );
};

export default Footer;
