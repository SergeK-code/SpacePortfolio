"use client";

import React from "react";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";

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
                        Work
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            {" "}
                            Experience{" "}
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
                        My professional journey so far.
                    </motion.div>
                )}
            </InView>

            <div className="relative w-[90%] max-w-4xl mx-auto mt-10">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent transform -translate-x-1/2" />

                {/* Entry 1 */}
                <div className="relative flex flex-col md:flex-row items-center mb-12">
                    <div className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transform -translate-x-1/2 z-10" />
                    <div className="md:w-1/2 md:pr-10 md:text-right w-full">
                        <InView triggerOnce={false}>
                            {({ inView, ref }) => (
                                <motion.div
                                    ref={ref}
                                    initial="hidden"
                                    animate={inView ? "visible" : "hidden"}
                                    variants={slideInFromLeft(0.2)}
                                    className="p-6 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md"
                                >
                                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                        MuLearn Intern
                                    </h3>
                                    <p className="text-gray-300 font-medium mt-1">
                                        MuLearn
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        2023
                                    </p>
                                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                                        Contributed to open-source learning initiatives, built internal tooling, and collaborated with cross-functional teams to deliver impactful developer experiences.
                                    </p>
                                </motion.div>
                            )}
                        </InView>
                    </div>
                </div>

                {/* Entry 2 */}
                <div className="relative flex flex-col md:flex-row items-center mb-12">
                    <div className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transform -translate-x-1/2 z-10" />
                    <div className="md:w-1/2 md:ml-auto md:pl-10 w-full">
                        <InView triggerOnce={false}>
                            {({ inView, ref }) => (
                                <motion.div
                                    ref={ref}
                                    initial="hidden"
                                    animate={inView ? "visible" : "hidden"}
                                    variants={slideInFromRight(0.2)}
                                    className="p-6 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md"
                                >
                                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                        Union Chairman
                                    </h3>
                                    <p className="text-gray-300 font-medium mt-1">
                                        SNGIST
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        2022 – 2023
                                    </p>
                                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                                        Led student governance for 2000+ members, organized technical events, and bridged communication between students and administration.
                                    </p>
                                </motion.div>
                            )}
                        </InView>
                    </div>
                </div>

                {/* Entry 3 */}
                <div className="relative flex flex-col md:flex-row items-center mb-12">
                    <div className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transform -translate-x-1/2 z-10" />
                    <div className="md:w-1/2 md:pr-10 md:text-right w-full">
                        <InView triggerOnce={false}>
                            {({ inView, ref }) => (
                                <motion.div
                                    ref={ref}
                                    initial="hidden"
                                    animate={inView ? "visible" : "hidden"}
                                    variants={slideInFromLeft(0.2)}
                                    className="p-6 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md"
                                >
                                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                        CEO
                                    </h3>
                                    <p className="text-gray-300 font-medium mt-1">
                                        SNGIST IEDC
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        2023 – Present
                                    </p>
                                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                                        Driving entrepreneurship culture on campus, mentoring student startups, securing funding, and leading digital transformation initiatives.
                                    </p>
                                </motion.div>
                            )}
                        </InView>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;

