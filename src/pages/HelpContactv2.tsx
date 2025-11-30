import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BiLogoDiscord } from "react-icons/bi";
import { IoMail } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const CARD_BG = "bg-[#1A2333]"; // card background
const PAGE_BG = "bg-[#0A0D12]"; // page background

const contactItems = [
  {
    id: "github",
    title: "GitHub",
    subtitle: "@devlup-labs",
    href: "https://github.com/devlup-labs",
    cta: "Visit",
    icon: <FaGithub className="text-[#C9D1D9] w-6 h-6" />,
  },
  {
    id: "discord",
    title: "Discord",
    subtitle: "DevelupLab",
    href: "https://github.com/devlup-labs", // replace with real discord invite if available
    cta: "Join",
    icon: <BiLogoDiscord className="text-[#C9D1D9] w-6 h-6" />,
  },
  {
    id: "email",
    title: "Email",
    subtitle: "devluplabs@iitj.ac.in",
    href: "mailto:devluplabs@iitj.ac.in",
    cta: "Mail",
    icon: <IoMail className="text-[#C9D1D9] w-6 h-6" />,
  },
];

const studentFaqs = [
  {
    q: "When can students apply for WoC?",
    a: "Please see the program timeline in How It Works section for more detailed information.",
  },
  {
    q: "What programming language(s) should I know to participate in WoC?",
    a: "The programming language you need to know depends with which mentor you are interested in working with. You should be familiar with the programming language(s) used in that project.",
  },
  {
    q: "Can I submit more than one proposal?",
    a: "Yes, each student may submit up to two proposals. However, only one per student may be accepted.",
  },
  {
    q: "Can a group submit a proposal together to work on a single project?",
    a: "While we may allow more than one student per project but it'll be prioritised to assign one project per person.",
  },
  {
    q: "Should I send proposals directly to the mentor?",
    a: "No, all proposals should be submitted to the program site.",
  },
];

const mentorFaqs = [
  {
    q: "Are mentors required to use the code produced by students?",
    a: "No. While we hope that all the code that comes out of this program is useful, it's not mandatory for the mentor to use students' code.",
  },
  {
    q: "Where will WoC happen?",
    a: "WoC occurs entirely online; you don't need to leave your room.",
  },
  {
    q: "Can I participate in WoC as both a mentor and a student?",
    a: "No. It'll not be feasible to work as both and it can hamper the chances of project's completion.",
  },
  {
    q: "What if I have more questions?",
    a: "Check out the Student Guide and the Mentor Guide available on the homepage.",
  },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState({ section: "students", idx: -1 });

  const toggleOpen = (section:string, idx:number) => {
  setOpenIndex((s) =>
    s.section === section && s.idx === idx
      ? { section, idx: -1 }
      : { section, idx }
  );
};


  // animation variants
  const panelVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  return (
    <div className={`${PAGE_BG} min-h-screen text-[#DCE5F5]`}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <h1
              className="
                text-3xl md:text-[50px] font-extrabold leading-tight
                bg-gradient-to-b from-[#DCE5F5] to-[#00C6FF]
                text-transparent bg-clip-text
              "
            >
              Frequently Asked Questions
            </h1>

            <p className="mt-3 text-[#9AA4B8] md:text-[20px]">Find answers for students and mentors — reach out if you still need help.</p>
          </div>

          {/* Contact cards */}
          <aside className="w-full md:w-72 hidden md:block">
            <h2
              className="
                text-2xl md:text-3xl font-bold mb-3
                bg-gradient-to-b from-[#E6F0FF] to-[#00C6FF]
                text-transparent bg-clip-text
              "
            >
              Contact Us
            </h2>

            <div className="grid gap-3">
              {contactItems.map((c) => (
                <a
                  key={c.id}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`flex items-center gap-3 p-3 rounded-lg ${CARD_BG} border border-[#1F2A38] hover:bg-black transition-colors duration-200`}
                >
                  <div className="w-11 h-11 rounded-md bg-[#00C6FF] flex items-center justify-center shadow-inner" aria-hidden>
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#E6F0FF] truncate">{c.title}</div>
                    <div className="text-xs text-[#9AA4B8] mt-0.5 truncate">{c.subtitle}</div>
                  </div>
                  <div className="text-xs bg-[#071428] px-2 py-1 rounded-md text-[#BFDFFF]">{c.cta}</div>
                </a>
              ))}
            </div>
          </aside>
        </div>

        {/* Student FAQs */}
        <section className="mt-12">
          <h3 className="text-sm text-[#9AA4B8] mb-3 md:text-[20px]">Student FAQs</h3>

          <div className="grid gap-3">
            {studentFaqs.map((f, i) => (
              <div
                key={`student-${i}`}
                onClick={() => toggleOpen("students", i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleOpen("students", i);
                }}
                aria-expanded={openIndex.section === "students" && openIndex.idx === i}
                className={`${CARD_BG} border border-[#9AA4B8] hover:bg-black rounded-3xl p-4 group overflow-hidden transition-all duration-300 cursor-pointer`}
              >
                <div className="w-full text-left flex items-center justify-between list-none font-semibold text-[#E6F0FF]">
                  <span className="truncate">{f.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex.section === "students" && openIndex.idx === i ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="ml-4 inline-block"
                    aria-hidden
                  >
                    ⌵
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex.section === "students" && openIndex.idx === i && (
                    <motion.div
                      key={`panel-student-${i}`}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={panelVariants}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="mt-3 text-[#C9D1D9] overflow-hidden text-sm sm:text-base"
                    >
                      {f.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Mentor FAQs */}
        <section className="mt-8">
          <h3 className="text-sm text-[#9AA4B8] mb-3 md:text-[20px]">Mentor FAQs</h3>

          <div className="grid gap-3">
            {mentorFaqs.map((f, i) => (
              <div
                key={`mentor-${i}`}
                onClick={() => toggleOpen("mentors", i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleOpen("mentors", i);
                }}
                aria-expanded={openIndex.section === "mentors" && openIndex.idx === i}
                className={`${CARD_BG} border border-[#9AA4B8] hover:bg-black rounded-3xl p-4 group overflow-hidden transition-all duration-300 cursor-pointer`}
              >
                <div className="w-full text-left flex items-center justify-between list-none font-semibold text-[#E6F0FF]">
                  <span className="truncate">{f.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex.section === "mentors" && openIndex.idx === i ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="ml-4 inline-block"
                    aria-hidden
                  >
                    ⌵
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex.section === "mentors" && openIndex.idx === i && (
                    <motion.div
                      key={`panel-mentor-${i}`}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={panelVariants}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="mt-3 text-[#C9D1D9] overflow-hidden text-sm sm:text-base"
                    >
                      {f.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
