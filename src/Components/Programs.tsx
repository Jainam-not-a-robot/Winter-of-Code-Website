
import logo from "../assets/devlup.png";
import { togglestate } from "../store/toggle";
import { useRecoilValue } from "recoil";
import ProjectCard from "./Projectcard"
import { useState, useEffect } from "react";
import axios from "axios";
import {program} from "../types/program"

const Programs = () => {
  const [programs, setprograms] = useState<program[]>();
  const [temp, settemp] = useState("");
  const [query, setquery] = useState("");
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    const pastprograms = async () => {
      const resp = await axios.get(`${BASE_URL}/pastprograms`);
      setprograms(resp.data);
    };
    pastprograms();
  }, [BASE_URL]);

  const filteredPrograms = programs?.filter((x) => {
    return (
      x.title.toLowerCase().includes(query.toLowerCase()) ||
      x.mentor.toLowerCase().includes(query.toLowerCase()) ||
      x.mentee.some(m => m.toLowerCase().includes(query.toLowerCase())) ||
      x.year.toLowerCase().includes(query.toLowerCase()) ||
      x.description.toLowerCase().includes(query.toLowerCase()) ||
      x.technology.toLowerCase().includes(query.toLowerCase())
    );
  });

  const toggle = useRecoilValue(togglestate);
  return (
    <div
      className={`overflow-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
    >
      <div
        style={{ backgroundColor: "#0b7cac" }}
        className="mt-[65px] w-screen h-[300px]"
      >
        <div className="flex justify-between border-3 border-black">
          <div className="p-5 md2:pl-[60px] text-[40px] font-sans2 font-extrabold  text-white  pt-[90px] pl-5">
            PAST PROGRAMS OF WOC
          </div>
          <img src={logo} className=" h-[317px]  " />
        </div>
      </div>
      <div className="flex font-stylish  sm:text-[30px]  mx-16 h-[50px] mt-[50px]">
        <input
          placeholder="Search Projects"
          className="sm:w-[900px] shadow-md shadow-slate-500 rounded-lg p-3 outline-none font-sans2 "
          onChange={(e) => {
            {
              e.target.value != "" ? settemp(e.target.value) : setquery("");
            }
          }}
        />
        <button
          onClick={() => setquery(temp)}
          className="bg-blue-600 p-2 rounded-md font-sans2 shadow-md shadow-slate-500 text-white font-extrabold text-[20px] mx-3"
        >
          Search
        </button>
      </div>
      <div className=" sm:flex  flex-wrap justify-center shadow-custom bg-slate-100 p-5 sm:mx-16 mx-8 my-8 ">
        {filteredPrograms &&
          filteredPrograms.length > 0 &&
          filteredPrograms.map((x: program) => {
            return (
              <div key={x.title} className="flex justify-center">
                <ProjectCard
                  year={x.year}
                  mentor={x.mentor}
                  description={x.description}
                  title={x.title}
                  mentee={x.mentee}
                  technology={x.technology}
                  codelink={x.codelink}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Programs;
