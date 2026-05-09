"use client";

import React, { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { COUNTRIES, type Country } from "@/constants/countries";

export interface CountrySelectorProps {
  value: string;
  onChange: (country: Country) => void;
  placeholder?: string;
  /** Accessible name for the closed trigger (e.g. screen readers). */
  ariaLabel?: string;
}

export default function CountrySelector({
  value,
  onChange,
  placeholder = "Select your country",
  ariaLabel,
}: CountrySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const highlightedIndexRef = useRef(-1);
  highlightedIndexRef.current = highlightedIndex;

  const filteredCountries =
    searchQuery.trim() === ""
      ? COUNTRIES
      : COUNTRIES.filter((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  useEffect(() => {
    if (!isOpen) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(t)) {
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;
    const el = listRef.current?.children[highlightedIndex] as
      | HTMLElement
      | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, isOpen, filteredCountries.length]);

  const selectCountry = (country: Country) => {
    onChange(country);
    setIsOpen(false);
    setSearchQuery("");
    setHighlightedIndex(-1);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchQuery("");
    setHighlightedIndex(-1);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
      return;
    }
    setIsOpen(true);
    setSearchQuery("");
    setHighlightedIndex(-1);
    window.setTimeout(() => inputRef.current?.focus(), 10);
  };

  const itemClassName = (country: Country, index: number) => {
    const base =
      "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors duration-150 text-sm";
    if (index === highlightedIndex) {
      return `${base} bg-[#7042f830] text-white`;
    }
    if (country.name === value) {
      return `${base} text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-medium`;
    }
    return `${base} text-gray-300 hover:bg-[#7042f820] hover:text-white`;
  };

  const listLength = filteredCountries.length;

  return (
    <div ref={containerRef} className="relative w-full min-w-0">
      <div
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown();
          }
        }}
        className={[
          "w-full bg-[#0300145e] border rounded-lg px-4 py-3 text-gray-200 cursor-pointer flex items-center justify-between backdrop-blur-md transition-colors duration-200 hover:border-purple-500",
          isOpen ? "border-purple-500" : "border-[#7042f88b]",
        ].join(" ")}
      >
        <span className={value ? "text-gray-200" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <RiArrowDownSLine
          className={[
            "text-gray-400 text-xl transition-transform duration-200 flex-shrink-0",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#030014e6] border border-[#7042f88b] rounded-lg overflow-hidden z-[200] backdrop-blur-md min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setHighlightedIndex(-1);
            }}
            placeholder="Search country..."
            className="w-full bg-transparent border-b border-[#7042f88b] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none text-[16px]"
            onKeyDown={(e) => {
              if (listLength === 0) {
                if (e.key === "Escape") {
                  e.preventDefault();
                  setIsOpen(false);
                  setSearchQuery("");
                  setHighlightedIndex(-1);
                }
                return;
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightedIndex((i) => Math.min(i + 1, listLength - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightedIndex((i) => Math.max(-1, i - 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                const idx = highlightedIndexRef.current;
                if (idx >= 0) {
                  const c = filteredCountries[idx];
                  if (c) selectCountry(c);
                }
              } else if (e.key === "Escape") {
                e.preventDefault();
                setIsOpen(false);
                setSearchQuery("");
                setHighlightedIndex(-1);
              }
            }}
          />
          <div
            ref={listRef}
            role="listbox"
            className="max-h-[220px] overflow-y-auto country-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#7042f8 transparent",
            }}
          >
            {listLength === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500 text-sm">
                No country found
              </div>
            ) : (
              filteredCountries.map((country, index) => (
                <div
                  key={`${country.dialCode}${country.name}`}
                  role="option"
                  aria-selected={country.name === value}
                  className={itemClassName(country, index)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectCountry(country)}
                >
                  <span>{country.name}</span>
                  <span className="text-gray-500 text-xs ml-2 flex-shrink-0">
                    {country.dialCode}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
