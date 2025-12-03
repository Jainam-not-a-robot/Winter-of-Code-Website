import { IoMdFlash } from "react-icons/io";
import { MdSupervisorAccount, MdBuild } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGoogleAuth } from "@/hooks/googleLogin";
import "../index.css";
import devlupLogo from "../assets/devlup-logo-nobg.png";
import Typewriter from "typewriter-effect";
import FallingCircles from "./FallingCircles";

const Home = () => {
  const toggle = useRecoilValue(togglestate);
  const googleLogin = useGoogleAuth();

  const features = [
    {
      icon: <MdSupervisorAccount className="h-10 w-10 sm:h-12 sm:w-12 text-ice-surge" />,
      title: "Working with experienced mentors",
      description:
        "WOC is a place where you don't just get to apply your skills but also get to acquire a bunch of new ones. WoC introduces you to the open source world and building code collaboratively while working under experienced mentors.",
    },
    {
      icon: <MdBuild className="h-10 w-10 sm:h-12 sm:w-12 text-ice-surge" />,
      title: "Learn development",
      description:
        "Develop the project codebase. Write test suites. Add integrations and lots more depending on your project. Use Git to track changes and create Pull Requests on GitHub.",
    },
    {
      icon: <IoMdFlash className="h-10 w-10 sm:h-12 sm:w-12 text-ice-surge" />,
      title: "Contribute to Open Source",
      description:
        "During the 5 weeks of writing good code, you interact and share ideas with great people. At the end of it, you've made deep connections and get ready to compete in GSoC.",
    },
  ];

  return (
    <div className={`overflow-x-hidden bg-deep-night min-h-screen ${toggle === null ? "" : toggle ? "contract" : "expand"}`}>
      {/* Hero Section */}
      <div
        className="flex flex-col justify-center items-center relative overflow-hidden h-screen bg-cover"
        style={{
          background: "linear-gradient(180deg, #0A0D12 0%, #111722 100%)",
        }}
      >
        <FallingCircles />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center relative z-10 px-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
            <img
              src={devlupLogo}
              alt="DevlUp Labs Logo"
              className="w-auto h-32 sm:h-44 md:h-52 mb-4 sm:mb-8"
            />

            <div className="text-center sm:text-left">
              <h1 className="font-sans2 text-4xl sm:text-5xl md:text-6xl lg:text-[66px] relative z-10 font-bold bg-gradient-to-r from-ice-surge to-frost-ember text-transparent bg-clip-text animate-gradient mb-4 sm:mb-8 animate-gradient pt-4">
                Winter Of Code
              </h1>

              <div className="font-sans2 text-xl sm:text-2xl md:text-[30px] relative z-10 font-bold text-frost-white h-[50px] sm:h-[80px]">
                <Typewriter
                  options={{
                    loop: true,
                    autoStart: true,
                    delay: 80,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Organized by DevlUp Labs")
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

      {/* Features Section */}
      <div className="bg-deep-night font-stylish relative z-20 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-lg sm:text-xl md:text-2xl py-6 sm:py-10 text-frost-white">
            Let's do something creative this winter!
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-frost-white to-ice-surge mt-5 mb-8 sm:mb-12">
              How does WOC help you?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-center text-lg sm:text-xl md:text-2xl text-frost-white mb-4 font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-center text-sm sm:text-base text-cloud-gray leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-deep-night py-12 sm:py-20 overflow-hidden">
        <FallingCircles />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl mb-10 sm:mb-16 text-frost-white font-semibold">
            Interested to know more?
          </h2>

          <div className="flex flex-col gap-4">
            <Link
              to="/how-it-works"
              className="glass-card flex justify-center items-center py-3 sm:py-4 px-6 text-sm sm:text-base font-medium rounded-xl text-frost-white hover:border-ice-surge/50 hover:shadow-[0_0_20px_rgba(0,198,255,0.3)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[url('/snowflake.png')] bg-no-repeat opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundPosition: `${Math.random() * 100}% ${Math.random() * 100}%`, backgroundSize: '150%' }}></span>
              <span className="relative z-10">SEE PROGRAM TIMELINE</span>
            </Link>

            <a
              href="/StudentManual.pdf"
              className="glass-card flex justify-center items-center py-3 sm:py-4 px-6 text-sm sm:text-base font-medium rounded-xl text-frost-white hover:border-ice-surge/50 hover:shadow-[0_0_20px_rgba(0,198,255,0.3)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[url('/snowflake.png')] bg-no-repeat opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundPosition: `${Math.random() * 100}% ${Math.random() * 100}%`, backgroundSize: '150%' }}></span>
              <span className="relative z-10">STUDENT MANUAL</span>
            </a>

            <a
              href="/MentorManual.pdf"
              className="glass-card flex justify-center items-center py-3 sm:py-4 px-6 text-sm sm:text-base font-medium rounded-xl text-frost-white hover:border-ice-surge/50 hover:shadow-[0_0_20px_rgba(0,198,255,0.3)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[url('/snowflake.png')] bg-no-repeat opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundPosition: `${Math.random() * 100}% ${Math.random() * 100}%`, backgroundSize: '150%' }}></span>
              <span className="relative z-10">MENTOR MANUAL</span>
            </a>
          </div>

          <h2 className="text-center text-xl sm:text-2xl md:text-3xl my-10 sm:my-16 text-frost-white font-semibold">
            Login with your Gmail account to register as a student
          </h2>

          <div className="flex justify-center">
            <button
              onClick={() => googleLogin()}
              className="w-full max-w-md py-3 sm:py-4 px-8 rounded-xl font-semibold text-deep-night bg-gradient-to-r from-ice-surge to-frost-ember hover:shadow-[0_0_30px_rgba(0,198,255,0.4)] transition-all duration-300 text-sm sm:text-base relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[url('/snowflake.png')] bg-no-repeat opacity-0 group-hover:opacity-30 transition-opacity duration-300" style={{ backgroundPosition: `${Math.random() * 100}% ${Math.random() * 100}%`, backgroundSize: '150%' }}></span>
              <span className="relative z-10">REGISTER</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-deep-night border-t border-white/5 py-8 relative z-20">
        <p className="text-center text-xs sm:text-sm text-cloud-gray/60">
          © 2025 Winter of Code. Crafted with frost & code.
        </p>
      </footer>
    </div>
  );
};

export default Home;