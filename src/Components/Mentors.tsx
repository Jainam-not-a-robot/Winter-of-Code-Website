import { motion } from "framer-motion";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { togglestate } from "../store/toggle";
import ProfileCard from "@/imported_components/ProfileCard";
import { wocstate } from "../store/woc";
import { Mentor } from "../types/mentor";
import Loading from "./Loading";
import { mentorstate } from "../store/mentor";
import "../index.css";

const Mentors = () => {
  const toggle = useRecoilValue(togglestate);
  const mentors_state = useRecoilValueLoadable(mentorstate);
  const mentors = useRecoilValue(mentorstate);
  const woc_state = useRecoilValue(wocstate);

  if (mentors_state.state === "loading") {
    return <Loading />;
  } else if (mentors_state.state === "hasValue") {
    return (
      <div className={`relative w-screen overflow-x-hidden min-h-screen bg-deep-night ${toggle === null ? "" : toggle ? "contract" : "expand"}`}>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <header className="mb-12 sm:mb-16 mt-8 sm:mt-12 animate-fade-in text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ice-surge/10 border border-ice-surge/20 text-ice-surge text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ice-surge opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ice-surge"></span>
              </span>
              Meet Our Experts
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-frost-ember to-frost-white animate-gradient">Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-frost-white to-frost-ember animate-gradient">
                Mentors
              </span>
            </h1>
            <p className="text-base sm:text-lg text-cloud-gray max-w-2xl mx-auto leading-relaxed">
              Learn from industry experts who are passionate about open source
              and helping you grow as a developer.
            </p>
          </header>

          {woc_state ? (
            <>
              {mentors && mentors.length > 0 && (
                <div className="space-y-16">
                  {mentors.map((x: Mentor, projectIndex: number) => (
                    <motion.section
                      key={projectIndex}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: projectIndex * 0.1 }}
                    >
                      {/* Project Name Header */}
                      <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-frost-white via-ice-surge to-frost-ember animate-gradient">
                          {x.proj_name}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-ice-surge to-frost-ember mx-auto mt-3 rounded-full"></div>
                      </div>

                      {/* Mentor Cards Grid */}
                      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        {x.mentor_name.map((val, key) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.6,
                              ease: "easeOut",
                              delay: key * 0.1,
                            }}
                            viewport={{ once: true }}
                          >
                            <ProfileCard
                              key={key}
                              image_link={x.image_link[key]}
                              mentor_name={val}
                              about={x.about[key]}
                              linkedinID={x.linkedin[key]}
                              githubID={x.github[key]}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="glass-card max-w-md mx-auto rounded-2xl p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-frost-white mb-4">
                  WOC Has Not Started Yet
                </h2>
                <p className="text-cloud-gray mb-6">
                  Check back soon to meet our amazing mentors!
                </p>
                <a
                  href="/how-it-works"
                  className="inline-block px-6 py-3 font-semibold text-deep-night bg-gradient-to-r from-ice-surge to-frost-ember rounded-lg hover:shadow-[0_0_20px_rgba(0,198,255,0.4)] transition-all duration-300"
                >
                  View Timeline
                </a>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-24 py-12 border-t border-white/5 text-center">
            <p className="text-xs text-cloud-gray/60">
              © 2025 Winter of Code. Crafted with frost & code.
            </p>
          </footer>
        </div>
      </div>
    );
  }
};

export default Mentors;
