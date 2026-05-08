"use client";

import Image from "next/image";
import React from "react";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { slideInFromBottom } from "@/utils/motion";

interface Props {
    src: string;
    href: string;
    title: string;
    description: string;
    tags: string[];
    index: number;
}

const ProjectCard = ({ src, href, title, description, tags, index }: Props) => {
    return (
        <InView triggerOnce={false}>
            {({ inView, ref }) => (
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={slideInFromBottom}
                    whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 30px rgba(112, 66, 248, 0.3)",
                    }}
                    transition={{
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 280,
                        damping: 20,
                    }}
                >
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${title} website`}
                        className="block h-full"
                    >
                        <div className="relative overflow-hidden rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md h-full flex flex-col">
                            <div className="relative w-full h-48 overflow-hidden">
                                <Image
                                    src={src}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-5 flex flex-col gap-3 flex-1">
                                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                    {title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2 py-1 rounded-full bg-[#7042f820] border border-[#7042f861] text-purple-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </a>
                </motion.div>
            )}
        </InView>
    );
};

export default ProjectCard;