import { motion } from "framer-motion";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { togglestate } from "../store/toggle";
import ProfileCard from "@/imported_components/ProfileCard";
import { wocstate } from "../store/woc";
import { Mentor } from "../types/mentor"
import Loading from "./Loading";
import { mentorstate } from "../store/mentor";//format is id, 
import "../index.css"
const Mentors = () => {
  const toggle = useRecoilValue(togglestate);
  const mentors_state = useRecoilValueLoadable(mentorstate);
  const mentors = useRecoilValue(mentorstate)
  const woc_state = useRecoilValue(wocstate);
  if (mentors_state.state == "loading") {
    return <Loading />
  }
  else if (mentors_state.state === "hasValue") {
    return (
      <div className="border-2 border-black relative w-screen overflow-x-hidden h-screen bg-[#111722] ">
        <div
          className={` overflow-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
        >
          <div className="flex justify-center ">
            <div className=" w-full h-full">
              <div className="my-32"></div>
              {/* <div className="italic m-5">
              You can also pitch your own project idea to these mentors. Feel
              free to contact any mentor via email/phone and talk to them about
              the project idea, ask the mentor to float the project if she/he
              agrees to mentor you with your proposed project. A mentor has to
              create the project for it to be considered a valid project.
            </div> */}
              {woc_state ?
                (
                  <>
                  <div className="text-4xl font-extrabold my-3 w-full text-center bg-gradient-to-r from-black via-blue-100 to-orange-400 bg-clip-text text-transparent mb-24 sm:mb-8 ">About our Mentors</div>
                    <div className="flex flex-wrap justify-center">
                      {mentors &&
                        mentors.length > 0 &&
                        mentors.map((x: Mentor) => (
                          <>
                            <div className="text-3xl font-extrabold my-3 w-full text-center bg-gradient-to-r from-black via-sky-500 to-orange-400 bg-clip-text text-transparent animate-gradient">
                              {x.proj_name}
                            </div>

                            {x.mentor_name.map((val, key) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
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
                              </>
                            ))

                            }
                          </div >
                  </>
                    ) : (
                    <div className="flex justify-center m-5 text-[30px] font-stylish font-bold ">
                      WOC Has Not Started Yet
                    </div>
                )}
                  </div>
            </div>
          </div>
        </div>
        );
  }
};
        export default Mentors;
