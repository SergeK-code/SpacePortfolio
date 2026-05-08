"use client";

import React from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import Image from "next/image";
import { slideInFromBottomDelay } from "@/utils/motion";

interface Props {
    src: string;
    width: number;
    height: number;
    index: number;
}

const SkillDataProvider = ({ src, width, height, index }: Props) => {
    return (
        <InView triggerOnce={false}>
            {({ inView, ref }) => (
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={slideInFromBottomDelay(index * 0.08)}
                >
                    <Image
                        src={src}
                        width={width}
                        height={height}
                        alt="skill image"
                    />
                </motion.div>
            )}
        </InView>
    );
};

export default SkillDataProvider;