"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="fixed top-0 left-0 right-0 z-[200] h-1">
            <motion.div
                style={{ width }}
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            />
        </div>
    );
};

export default ScrollProgress;

