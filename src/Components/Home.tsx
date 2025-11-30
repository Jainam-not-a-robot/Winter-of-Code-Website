
import { IoMdFlash } from "react-icons/io";
import { MdSupervisorAccount, MdBuild } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../index.css";
import devlupLogo from "../assets/devlup-logo-nobg.png";
import Typewriter from "typewriter-effect";
import FallingCircles from "./FallingCircles";

const Home = () => {
  const toggle = useRecoilValue(togglestate);

  return (
    <div className={`overflow-x-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"}`}>
      <div
        className="flex flex-col justify-center items-center relative overflow-hidden h-[590px] bg-cover"
        style={{
          backgroundColor: "#111722",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <FallingCircles />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-0">
            <img
              src={devlupLogo}
              alt="DevlUp Labs Logo"
              className="w-auto h-52 mb-8"
            />

            <div>
              <div className="mx-0 font-sans2 text-center text-[66px] relative z-10 sm:h-[80px] font-bold bg-gradient-to-r from-[#5B8CFF] to-[#f5a836] text-transparent bg-clip-text animate-gradient mb-8">
                Winter Of Code
              </div>

              <div className="mx-0 font-sans2 text-[32px] sm:text-[30px] text-center relative z-10 font-bold text-[#DCE5F5] sm:h-[80px]">
                <Typewriter
                  options={{
                    loop: true,
                    autoStart: true,
                    delay: 80
                  }}
                  onInit={(typewriter) => {
                    typewriter.typeString('Organized by DevlUp Labs')
                      .pauseFor(250000)
                      .deleteAll()
                      .start();
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-[#111722] font-stylish relative z-20">
        <div className="flex text-center justify-center text-[24px] py-10 text-[#DCE5F5]">
          Let's do something creative this winter!
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className=" flex flex-col items-center"
        >
          <div className="text-center mx-6 text-[32px] font-semibold text-[#DCE5F5] mt-5">
            How does WOC help you?
          </div>
          <div className="grid md:grid-cols-3 text-[#DCE5F5]">
            <div className="ml-5">
              <div className="flex justify-center">
                <MdSupervisorAccount className="h-12 w-12 m-3 flex text-blue-500" />
              </div>
              <div className="flex mx-5 justify-center text-center text-[26px]">Working with experienced mentors</div>
              <div className="font-sans text-[18px] m-5">
                WOC is a place where you don't just get to apply your skills but also get to acquire a bunch of new ones. WoC
                introduces you to the open source world and building code collaboratively while working under experienced mentors.
              </div>
            </div>

            <div>
              <div className="flex justify-center">
                <MdBuild className="h-12 w-12 flex m-3 text-blue-500" />
              </div>
              <div className="flex justify-center text-[26px]">Learn development</div>
              <div className="font-sans text-[18px] m-10">
                Develop the project codebase. Write test suites. Add integrations and lots more depending on your project. Use Git
                to track changes and create Pull Requests on GitHub.
              </div>
            </div>

            <div>
              <div className="flex justify-center">
                <IoMdFlash className="h-12 w-12 flex m-3 text-blue-500" />
              </div>
              <div className="flex justify-center text-[26px]">Contribute to Open Source</div>
              <div className="font-sans text-[18px] m-10">
                During the 5 weeks of writing good code, you interact and share ideas with great people. At the end of it, you've
                made deep connections and get ready to compete in GSoC.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-20">
        {/* <div
          className="h-[320px] w-screen flex flex-col justify-center items-center relative overflow-hidden"
          style={{
            backgroundImage: "url(https://i.imgur.com/WwDfTfH.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="text-[26px] text-center mx-10 text-white relative z-10">
            Diving into open source development has never been simpler.
          </div>
          <div className="text-[15px] text-center m-2 italic text-white relative z-10">Now build something!</div>
          <div className="absolute top-0 left-0 w-full h-full filter blur-sm z-0" />
        </div> */}

        <div className="flex justify-center text-center text-[35px] my-20 text-[#DCE5F5]">Interested to know more?</div>

        <div className="flex justify-center">
          <Link
            to="/how-it-works"
            className="
              flex justify-center fontstylish py-2 text-[16px]
              m-2 w-[600px] p-3 rounded-xl
              bg-[#1e3a5f] text-white 
              border border-[#87bfff] 
              hover:shadow-[0_0_12px_rgba(135,191,255,0.8)]
              hover:border-[#c3e6ff]
              transition
              bg-cover bg-center
            hover:bg-[url('./assets/snowflake.png')]
            hover:bg-repeat-x
            hover:bg-[50%_10%]
            hover:bg-contain

            "

          >
            SEE PROGRAM TIMELINE
          </Link>
        </div>

        <div className="flex justify-center">
          <a
            href="/StudentManual.pdf"
            className="
              flex justify-center fontstylish py-2 text-[16px]
              m-2 w-[600px] p-3 rounded-xl
              bg-[#1e3a5f] text-white 
              border border-[#87bfff] 
              hover:shadow-[0_0_12px_rgba(135,191,255,0.8)]
              hover:border-[#c3e6ff]
              transition
hover:bg-[url('./assets/snowflake.png')]
hover:bg-repeat-x
hover:bg-[70%_30%]
hover:bg-contain
            "

          >
            STUDENT MANUAL
          </a>
        </div>

        <div className="flex justify-center ">
          <a
            href="/MentorManual.pdf"
            className="flex justify-center fontstylish py-2 text-[16px]  m-2 w-[600px] p-3 rounded-xl bg-[#1e3a5f] text-white border border-[#87bfff] hover:shadow-[0_0_12px_rgba(135,191,255,0.8)] hover:border-[#c3e6ff] transition hover:bg-[url('./assets/snowflake.png')]
              hover:bg-repeat-x
              hover:bg-[20%_30%]
              hover:bg-contain"
          >
            MENTOR MANUAL
          </a>
        </div>

        <div className="flex justify-center text-center mx-6 text-[35px] my-10 text-[#DCE5F5]">
          Login with your Gmail account to register as a student
        </div>

        <div className="flex justify-center">
          <Link
            to="/login"
            className="flex justify-center fontstylish py-2 text-[16px]  m-2 w-[600px] p-3 rounded-xl bg-[#1e3a5f] text-white border border-[#87bfff] hover:shadow-[0_0_12px_rgba(135,191,255,0.8)] hover:border-[#c3e6ff] transition mb-20 hover:bg-[url('./assets/snowflake.png')]
              hover:bg-repeat-x
              hover:bg-[20%_10%]
              hover:bg-contain"
          >
            REGISTER
          </Link>
        </div>

        {/* <div className="text-[45px] flex justify-center mt-20 mb-5 text-[#DCE5F5]">Contact Us</div>

        <div className="flex justify-center pb-10">
          <div>
            <div className="my-2 flex mx-5">
              <FaGithub className="w-8 h-8 mx-5" />
              <a className="text-blue-500" href="https://github.com/devlup-labs">
                devlup-labs
              </a>
            </div>

            <div className="my-2 flex mx-5">
              <BiLogoDiscord className="w-10 h-10 mx-5" />
              <a className="text-blue-500" href="https://discord.gg/">
                Discord
              </a>
            </div>

            <div className="my-2 flex mx-5">
              <IoMail className="w-10 h-10 mx-5" />
              <a className="text-blue-500" href="mailto:devluplabs@iitj.ac.in">
                devluplabs@iitj.ac.in
              </a>
            </div> */}
        {/* </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;