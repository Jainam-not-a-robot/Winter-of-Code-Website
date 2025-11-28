import Avatar from "../assets/avatar.png";
import { IoMail } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { togglestate } from "../store/toggle";

import { wocstate } from "../store/woc";
import {Mentor} from "../types/mentor"
import Loading from "./Loading";
import { mentorstate } from "../store/mentor";
const Mentors = () => {
  const toggle = useRecoilValue(togglestate);
  const mentors_state = useRecoilValueLoadable(mentorstate);
  const mentors = useRecoilValue(mentorstate)
  const woc_state = useRecoilValue(wocstate);
  if(mentors_state.state=="loading" ){
   return <Loading/>
  }
  else if( mentors_state.state==="hasValue"){
  return (
    <div className="border-2 border-black relative w-screen overflow-x-hidden h-screen ">
      <div
        className={` overflow-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
      >
        <div
          className=" flex justify-center md2:h-[180px] h-[120px] w-screen md2:absolute md2:top-0  z-1 "
          style={{ backgroundColor: "#1976d2" }}
        ></div>
        <div className="flex justify-center ">
          <div className="bg-white md2:w-[808px]  shadow-custom md2:absolute md2:top-32   z-0  ">
            <div className="mx-8 my-5 text-[24px] fontstylish font-weight-400 text-blue-600">
              Mentors
            </div>
            <div className="italic m-5">
              You can also pitch your own project idea to these mentors. Feel
              free to contact any mentor via email/phone and talk to them about
              the project idea, ask the mentor to float the project if she/he
              agrees to mentor you with your proposed project. A mentor has to
              create the project for it to be considered a valid project.
            </div>
            {woc_state ?
            (
            <>
            {mentors &&
              mentors.length > 0 &&
              mentors.map((x: Mentor) => {
                return (
                  <div key={x.id} className="m-5 rounded-md shadow-md hover:rounded-2xl shadow-mentor duration-500 hover:scale-105 flex justify-between ">
                    <div className="md2:mx-10 text-center mx-5 my-8 font-weight-400 text-[24px] fontstylish">
                      {x.first_name} {x.last_name}
                      <div className="flex  justify-center">
                        <a
                          className="pr-2 py-4  text-[26px] h-20"
                          href={`mailto:${x.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IoMail />
                        </a>
                        <a
                          href={`https://wa.me/+91${x.phonenumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 py-4"
                        >
                          <FaWhatsapp />
                        </a>
                        <a className="p-2 py-4" href={x.githublink}>
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                    <img
                      className=" md2:w-[130px] md:h-[130px] rounded-full m-8 w-[120px] h-[120px] md2:mx-20"
                      src={Avatar}
                    />
                  </div>
                );
              })}
              </>
            ):(
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
