"use client";

import React, { useState } from "react";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { MdEmail, MdLocationOn, MdWork } from "react-icons/md";

const inputClass =
    "w-full text-[16px] bg-[#0300145e] border border-[#7042f88b] rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-md";

const Contact = () => {
    const [sent, setSent] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    return (
        <section
            id="contact"
            className="flex flex-col items-center justify-center py-20 relative min-h-screen"
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
                        Get In
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            {" "}
                            Touch{" "}
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
                        I&apos;m always open to new opportunities.
                    </motion.div>
                )}
            </InView>

            <div className="w-[90%] max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <InView triggerOnce={false}>
                    {({ inView, ref }) => (
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={slideInFromLeft(0.3)}
                            className="flex flex-col gap-5"
                        >
                            <p className="text-gray-300 text-sm leading-relaxed mb-2">
                                Whether you have a project in mind, a question, or
                                just want to say hello, my inbox is always open.
                            </p>

                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md">
                                <MdEmail className="text-purple-400 text-2xl flex-shrink-0" />
                                <p className="text-gray-300 text-sm">
                                    mifwebchain@gmail.com
                                </p>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md">
                                <MdLocationOn className="text-purple-400 text-2xl flex-shrink-0" />
                                <p className="text-gray-300 text-sm">
                                    Kerala, India
                                </p>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md">
                                <MdWork className="text-purple-400 text-2xl flex-shrink-0" />
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-3 w-3 flex-shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                                    </span>
                                    <p className="text-gray-300 text-sm">
                                        Open to opportunities
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </InView>

                <InView triggerOnce={false}>
                    {({ inView, ref }) => (
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={slideInFromRight(0.3)}
                            className="flex flex-col gap-4"
                        >
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log({ name, email, message });
                                    setSent(true);
                                    setTimeout(() => setSent(false), 3000);
                                }}
                                className="flex flex-col gap-4"
                            >
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={inputClass}
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClass}
                                />
                                <textarea
                                    rows={5}
                                    placeholder="Your Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className={inputClass}
                                />

                                <button
                                    type="submit"
                                    className="w-full button-primary text-white font-medium py-3 rounded-lg transition-all duration-300"
                                >
                                    {sent ? "Message Sent ✓" : "Send Message"}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </InView>
            </div>
        </section>
    );
};

export default Contact;

