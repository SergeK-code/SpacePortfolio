"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { navigation } from "@/src/config/navigation";
import { site } from "@/src/config/site";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 w-full max-w-full z-50 px-4 md:px-10">
      <div className="w-full max-w-[1855px] mx-auto">
        <div className="w-full h-[65px] shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md items-center rounded-full">
          <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px] md:px-[10px]">
            <a
              href="#home"
              className="h-auto w-auto flex flex-row items-center"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src={site.assets.logo}
                alt={`${site.person.name} logo`}
                width={50}
                height={50}
                className="cursor-pointer hover:animate-spin w-10 rounded-full"
              />

              <span className="font-bold ml-[10px] block text-gray-300 z-50 md:text-lg text-xl">
                {site.company.name}
              </span>
            </a>

            <div className="hidden w-3/6 lg:w-1/2 h-full md:flex flex-row items-center justify-between md:mx-auto lg:pr-2">
              <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
                {navigation.items.map((item) => (
                  <a key={item.id} href={item.href} className="cursor-pointer">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="md:hidden text-gray-200 text-2xl"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <RxHamburgerMenu />
            </button>

            <div className="hidden md:flex flex-row gap-5 text-white">
              {Socials.map((social) => (
                <a
                  href={social.link}
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={social.src}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="cursor-pointer hover:animate-spin"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: menuOpen ? "auto" : 0,
            opacity: menuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col items-center gap-4 py-4 bg-[#0300145e] backdrop-blur-md border-t border-[#7042f88b] rounded-b-2xl mt-2">
            {navigation.items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="cursor-pointer text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
