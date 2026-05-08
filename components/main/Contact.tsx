"use client";

import React, { useState } from "react";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { MdEmail, MdLocationOn, MdWork } from "react-icons/md";
import { site } from "@/src/config/site";
import { contactContent } from "@/src/content/contact";
import { toast } from "react-toastify";

const inputClass =
  "w-full text-[16px] bg-[#0300145e] border border-[#7042f88b] rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-md";

function encodeFormBody(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function normalizePhone(v: string) {
  return v.replace(/[^\d]/g, "");
}

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState<
    (typeof contactContent.form.countryCodes)[number]["value"]
  >(contactContent.form.countryCodes[4]?.value ?? "+961");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState<(typeof contactContent.form.budgetOptions)[number]["value"]>(
    "1000-5000",
  );
  const [timeline, setTimeline] = useState<
    (typeof contactContent.form.timelineOptions)[number]["value"]
  >("standard");

  const [errors, setErrors] = useState<
    Partial<Record<"name" | "email" | "phone" | "message", string>>
  >({});

  const validate = () => {
    const next: typeof errors = {};
    const v = contactContent.form.validation;

    if (!name.trim()) next.name = v.required;
    if (!email.trim()) next.email = v.required;
    else if (!isValidEmail(email)) next.email = v.invalidEmail;

    const phoneDigits = normalizePhone(phone);
    if (!phoneDigits) next.phone = v.required;
    else if (phoneDigits.length < 7 || phoneDigits.length > 15)
      next.phone = v.invalidPhone;

    if (!message.trim()) next.message = v.required;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

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
            {contactContent.heading.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              {contactContent.heading.accent}{" "}
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
            {contactContent.subtitle}
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
                {contactContent.intro}
              </p>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md">
                <MdEmail className="text-purple-400 text-2xl flex-shrink-0" />
                <p className="text-gray-300 text-sm">{site.person.email}</p>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md">
                <MdLocationOn className="text-purple-400 text-2xl flex-shrink-0" />
                <p className="text-gray-300 text-sm">{site.person.location}</p>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md">
                <MdWork className="text-purple-400 text-2xl flex-shrink-0" />
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <p className="text-gray-300 text-sm">
                    {contactContent.availability}
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
              className="relative flex flex-col gap-4 p-6 rounded-2xl border border-[#7042f861] bg-gradient-to-br from-[#030014b3] via-[#03001466] to-[#030014b3] shadow-[0_0_40px_rgba(112,66,248,0.2)] backdrop-blur-md overflow-hidden"
            >
              {/* subtle glass highlight */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/15" />
              <form
                name={contactContent.form.netlify.formName}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot={contactContent.form.netlify.honeypotFieldName}
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSent(false);

                  if (!validate()) {
                    toast.error("Fix the highlighted fields and try again.");
                    return;
                  }

                  setIsSubmitting(true);
                  try {
                    const fullPhone = `${countryCode}${normalizePhone(phone)}`;
                    const payload: Record<string, string> = {
                      "form-name": contactContent.form.netlify.formName,
                      [contactContent.form.netlify.honeypotFieldName]: "",
                      name: name.trim(),
                      email: email.trim(),
                      countryCode,
                      phone: normalizePhone(phone),
                      phoneE164: fullPhone,
                      budget,
                      timeline,
                      message: message.trim(),
                    };

                    const res = await fetch("/", {
                      method: "POST",
                      headers: { "Content-Type": "application/x-www-form-urlencoded" },
                      body: encodeFormBody(payload),
                    });

                    if (!res.ok) throw new Error("submit_failed");

                    setSent(true);
                    toast.success("Message sent. Thanks — I’ll get back to you soon.");
                    setName("");
                    setEmail("");
                    setCountryCode(
                      contactContent.form.countryCodes[4]?.value ?? "+961",
                    );
                    setPhone("");
                    setMessage("");
                    setBudget("1000-5000");
                    setTimeline("standard");
                    setErrors({});
                  } catch {
                    toast.error("Submission failed. Please try again in a moment.");
                  } finally {
                    setIsSubmitting(false);
                    setTimeout(() => setSent(false), 3000);
                  }
                }}
                className="relative flex flex-col gap-4"
              >
                <input
                  type="hidden"
                  name="form-name"
                  value={contactContent.form.netlify.formName}
                />
                <p className="hidden">
                  <label>
                    Don’t fill this out:{" "}
                    <input name={contactContent.form.netlify.honeypotFieldName} />
                  </label>
                </p>
                <input
                  type="text"
                  name="name"
                  placeholder={contactContent.form.placeholders.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && (
                  <p className="text-xs text-red-300 -mt-2">{errors.name}</p>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder={contactContent.form.placeholders.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="text-xs text-red-300 -mt-2">{errors.email}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-3">
                  <label className="sr-only" htmlFor="countryCode">
                    {contactContent.form.labels.countryCode}
                  </label>
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={countryCode}
                    onChange={(e) =>
                      setCountryCode(
                        e.target.value as (typeof contactContent.form.countryCodes)[number]["value"],
                      )
                    }
                    className={[inputClass, "appearance-none pr-10"].join(" ")}
                  >
                    {contactContent.form.countryCodes.map((c) => (
                      <option key={c.value} value={c.value} className="bg-[#030014]">
                        {c.label}
                      </option>
                    ))}
                  </select>

                  <label className="sr-only" htmlFor="phone">
                    {contactContent.form.labels.phone}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    placeholder={contactContent.form.placeholders.phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    aria-invalid={Boolean(errors.phone)}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-300 -mt-2">{errors.phone}</p>
                )}
                <textarea
                  rows={5}
                  name="message"
                  placeholder={contactContent.form.placeholders.message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={inputClass}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && (
                  <p className="text-xs text-red-300 -mt-2">{errors.message}</p>
                )}

                <fieldset className="flex flex-col gap-3">
                  <legend className="text-sm font-medium text-gray-200">
                    {contactContent.form.labels.budget}
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {contactContent.form.budgetOptions.map((opt) => (
                      <label
                        key={opt.value}
                        className={[
                          "flex items-center gap-3 rounded-xl border px-4 py-3",
                          "bg-[#0300145e] backdrop-blur-md transition-colors cursor-pointer",
                          budget === opt.value
                            ? "border-cyan-400/60 bg-[#06b6d410]"
                            : "border-[#7042f88b] hover:border-purple-400/70",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={opt.value}
                          checked={budget === opt.value}
                          onChange={() => setBudget(opt.value)}
                          className="h-4 w-4 accent-cyan-400"
                        />
                        <span className="text-sm text-gray-200">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="flex flex-col gap-3">
                  <legend className="text-sm font-medium text-gray-200">
                    {contactContent.form.labels.timeline}
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {contactContent.form.timelineOptions.map((opt) => (
                      <label
                        key={opt.value}
                        className={[
                          "flex items-center gap-3 rounded-xl border px-4 py-3",
                          "bg-[#0300145e] backdrop-blur-md transition-colors cursor-pointer",
                          timeline === opt.value
                            ? "border-cyan-400/60 bg-[#06b6d410]"
                            : "border-[#7042f88b] hover:border-purple-400/70",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="timeline"
                          value={opt.value}
                          checked={timeline === opt.value}
                          onChange={() => setTimeline(opt.value)}
                          className="h-4 w-4 accent-cyan-400"
                        />
                        <span className="text-sm text-gray-200">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={[
                    "w-full button-primary text-white font-medium py-3 rounded-lg transition-all duration-300",
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  {sent
                    ? contactContent.form.submit.sent
                    : isSubmitting
                      ? "Sending…"
                      : contactContent.form.submit.idle}
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
