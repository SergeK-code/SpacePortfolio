"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { InView } from "react-intersection-observer";
import { skillsContent } from "@/src/content/skills";

const SkillText = () => {
  return (
    <div className="w-full h-auto pt-20 flex flex-col items-center justify-center">
      <InView triggerOnce={false}>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={slideInFromTop}
            className="text-[40px] pt-[5rem] pb-3 md:p-0 font-medium text-center text-gray-200"
          >
            {skillsContent.heading.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              {skillsContent.heading.accent}{" "}
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
            className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
          >
            {skillsContent.subtitle}
          </motion.div>
        )}
      </InView>
    </div>
  );
};

export default SkillText;
