"use client";

import React from "react";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { experienceContent } from "@/src/content/experience";

const Experience = () => {
    return (
        <section
            id="experience"
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
                        {experienceContent.heading.title}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            {" "}
                            {experienceContent.heading.accent}{" "}
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
                        {experienceContent.subtitle}
                    </motion.div>
                )}
            </InView>

            <div className="relative w-[90%] max-w-4xl mx-auto mt-10">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent transform -translate-x-1/2" />

                {experienceContent.items.map((item, idx) => {
                    const isRight = idx % 2 === 1;
                    return (
                        <div
                            key={`${item.role}-${item.org}-${item.period}`}
                            className="relative flex flex-col md:flex-row items-center mb-12"
                        >
                            <div className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transform -translate-x-1/2 z-10" />
                            <div
                                className={[
                                    "w-full",
                                    "md:w-1/2",
                                    isRight ? "md:ml-auto md:pl-10" : "md:pr-10 md:text-right",
                                ].join(" ")}
                            >
                                <InView triggerOnce={false}>
                                    {({ inView, ref }) => (
                                        <motion.div
                                            ref={ref}
                                            initial="hidden"
                                            animate={inView ? "visible" : "hidden"}
                                            variants={isRight ? slideInFromRight(0.2) : slideInFromLeft(0.2)}
                                            className="p-6 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md"
                                        >
                                            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                                {item.role}
                                            </h3>
                                            <p className="text-gray-300 font-medium mt-1">
                                                {item.org}
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                {item.period}
                                            </p>
                                            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                                                {item.summary}
                                            </p>
                                        </motion.div>
                                    )}
                                </InView>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Experience;

