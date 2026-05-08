"use client";

import React from "react";
import ProjectCard from "../sub/ProjectCard";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop } from "@/utils/motion";
import { projectsContent } from "@/src/content/projects";

const Projects = () => {
    return (
        <section
            id="projects"
            className="flex flex-col items-center justify-center py-20 relative"
        >
            <InView triggerOnce={false}>
                {({ inView, ref }) => (
                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={slideInFromTop}
                        className="text-[40px] font-medium text-center text-gray-200"
                    >
                        {projectsContent.heading.title}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            {" "}
                            {projectsContent.heading.accent}{" "}
                        </span>
                    </motion.div>
                )}
            </InView>

            <InView triggerOnce={false}>
                {({ inView, ref }) => (
                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={slideInFromLeft(0.5)}
                        className="cursive text-[20px] text-gray-200 text-center"
                    >
                        {projectsContent.subtitle}
                    </motion.div>
                )}
            </InView>

            <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {projectsContent.items.map((p, index) => (
                    <ProjectCard
                        key={p.title}
                        src={p.imageSrc}
                        href={p.href}
                        title={p.title}
                        description={p.description}
                        tags={p.tags}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;