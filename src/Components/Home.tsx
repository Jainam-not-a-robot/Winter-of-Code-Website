import { FaGithub } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoMdFlash } from "react-icons/io";
import { BiLogoDiscord } from "react-icons/bi";
import { MdSupervisorAccount, MdBuild } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";
import { Link } from "react-router-dom";
const Home = () => {
  const toggle = useRecoilValue(togglestate);

  return (
    <div className={`overflow-x-hidden  ${toggle === null ? "" : toggle ? "contract" : "expand"}`}>
      <div
        className="flex flex-col justify-center items-center relative overflow-hidden h-[479px] bg-cover"
        style={{
          backgroundImage: "url(https://i.imgur.com/We1DyJi.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="mx-5 font-sans2 text-center text-[54px] relative z-10 sm:h-[80px] font-bold ">
          Winter Of Code
        </div>
        <div className="mx-5 font-sans2 text-[50px] text-center relative z-10 font-bold  sm:h-[80px] ">
          Organized by
        </div>
        <div className="mx-5 font-sans2 text-center relative z-10 text-[50px] sm:h-[100px] font-bold">
          DevlUp Labs
        </div>
      </div>

      <div className="bg-slate-100 font-stylish ">
        <div className="flex  text-center justify-center  text-[24px] py-10">
          The best way to engage in open source development
        </div>
        <div className=" grid md:grid-cols-3">
          <div className=" ml-5">
            <div className="flex justify-center">
              <MdSupervisorAccount className="h-12 w-12 m-3 flex text-blue-500" />
            </div>
            <div className="flex mx-5 justify-center text-center text-[26px]">Working with experienced mentors</div>
            <div className="font-sans text-[18px] m-5">
              WOC is a place where you don’t just get to apply your skills but also get to acquire a bunch of new ones. WoC
              introduces you to the open source world and building code collaboratively while working under experienced mentors.
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <MdBuild className="h-12 w-12 flex m-3 text-blue-500" />
            </div>
            <div className="flex justify-center text-[26px]">Learn development</div>
            <div className="font-sans text-[18px] m-10">
              Develop the project codebase. Write up test suites. Add third party integrations and lots of other cool stuff
              depending on your project. After cooking up the perfect recipe, use Git to keep track of the changes and create
              your Pull Requests on GitHub.
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <IoMdFlash className="h-12 w-12 flex m-3 text-blue-500" />
            </div>
            <div className="flex justify-center text-[26px]">Contribute to Open Source</div>
            <div className="font-sans text-[18px] m-10">
              During the 5 weeks of writing good code, you interact and share ideas with some great people. At the end of it,
              you’ve made great interactions with the mentors, and finally get ready to compete in GSoC'24.
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-[320px] w-screen flex  flex-col justify-center items-center relative overflow-hidden"
        style={{
          backgroundImage: "url(https://i.imgur.com/WwDfTfH.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="text-[26px] text-center mx-10 text-white relative z-10">
          Diving into open source development has never been simpler.
        </div>
        <div className="text-[15px] text-center m-2 italic text-white relative z-10">Now build something!</div>
        <div className="absolute top-0 left-0 w-full h-full filter blur-sm z-0" />
      </div>
      <div className="flex justify-center text-center text-[35px] my-20">Interested to know more?</div>
      <div className="flex justify-center">
        <Link
          to="/how-it-works"
          className="flex justify-center fontstylish py-2 hover:bg-slate-200 rounded-sm text-[16px] font-weight-400 text-slate-800 border-black border-[1px] m-2  w-[600px] "
        >
          SEE PROGRAM TIMELINE
        </Link>
      </div>
      <div className="flex justify-center ">
        <a
          href="/StudentManual.pdf"
          className="flex justify-center fontstylish py-2 hover:bg-slate-200 rounded-sm text-slate-800 border-black border-[1px]  text-[16px] m-2 w-[600px]"
        >
          STUDENT MANUAL
        </a>
      </div>
      <div className="flex justify-center">
        <a
          href="/MentorManual.pdf"
          className="flex justify-center hover:bg-slate-200 fontstylish py-2 rounded-sm text-slate-800 text-[16px] border-black border-[1px] m-2 w-[600px] "
        >
          MENTOR MANUAL
        </a>
      </div>
      <div className="flex justify-center text-center mx-6 text-[35px] my-20">
        Login with your Gmail account to register as a student
      </div>

      <div className="flex justify-center">
        <Link
          to="/login"
          className="flex justify-center py-2  text-slate-800 rounded-sm hover:bg-slate-200  text-[16px] border-black border-[1px] m-2 w-[600px] fontstylish "
        >
          REGISTER
        </Link>
      </div>
      <div className="text-[45px] font-weight-400 flex justify-center mt-20 mb-5">Contact Us</div>
      <div className="flex justify-center">
        <div>
          <div className=" my-2 flex mx-5 ">
            <FaGithub className="w-8 h-8 mx-5 " />
            <a className="text-blue-500" href="https://github.com/devlup-labs">
              devlup-labs
            </a>
          </div>
          <div className="my-2 flex mx-5">
            <BiLogoDiscord className="w-10 h-10 mx-5" />
            <a className="text-blue-500" href="https://github.com/devlup-labs">
              Discord
            </a>
          </div>
          <div className=" my-2 flex mx-5">
            <IoMail className="w-10 h-10 mx-5 " />
            <a className="text-blue-500" href="https://github.com/devlup-labs">
              devluplabs@iitj.ac.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
