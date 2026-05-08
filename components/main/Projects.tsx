"use client";

import React from "react";
import ProjectCard from "../sub/ProjectCard";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop } from "@/utils/motion";

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
                        My
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            {" "}
                            Projects{" "}
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
                        Things I&apos;ve built that I&apos;m proud of
                    </motion.div>
                )}
            </InView>

            <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                <ProjectCard
                    src="/NextWebsite.png"
                    title="Modern Next.js Portfolio"
                    description="A blazing-fast developer portfolio built with the Next.js App Router, featuring space aesthetics and smooth scroll interactions."
                    tags={["Next.js", "TypeScript", "Tailwind CSS"]}
                    index={0}
                />
                <ProjectCard
                    src="/CardImage.png"
                    title="Interactive UI Cards"
                    description="A collection of animated card components with glassmorphism effects, physics-based hover states, and accessible micro-interactions."
                    tags={["React", "Framer Motion", "CSS"]}
                    index={1}
                />
                <ProjectCard
                    src="/SpaceWebsite.png"
                    title="Space Themed Website"
                    description="An immersive space explorer experience with particle systems, real-time 3D rendering, and procedurally generated star fields."
                    tags={["Three.js", "WebGL", "React"]}
                    index={2}
                />
            </div>
        </section>
    );
};

export default Projects;