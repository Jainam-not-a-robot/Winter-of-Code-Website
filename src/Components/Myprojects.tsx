import { FaGithub } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";
import { useEffect, useState } from "react";
import axios from "axios";
import { userstate } from "../store/userState";

interface project {
  _id: string;
  title: string;
  tag: string;
  description: string;
  mentor: string;
  technology: string;
}

const MyProjects = () => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user = useRecoilValue(userstate);
  const toggle = useRecoilValue(togglestate);
  const [projects, setprojects] = useState<project[]>();

  useEffect(() => {
    const getuserprojects = async () => {
      if (user) {
        const token = localStorage.getItem("jwt_token")
          try {
              const response = await axios.get(
                  `${BASE_URL}/${user.id}/projects`,
                  {
                      headers: {
                          'Authorization': `Bearer ${token}` 
                      }
                  }
              );
              console.log(response);
              setprojects(response.data);
          } catch (error) {
              console.error("Error fetching user projects:", error);
          }
      }
  };
    getuserprojects();
  },[user,BASE_URL]);
  return (
    <div className=" relative w-screen overflow-x-hidden h-screen ">
      <div
        className={` ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
      >
        <div
          className=" flex justify-center md2:h-[180px] h-[120px] w-screen md2:absolute md2:top-0  z-1 "
          style={{ backgroundColor: "#1976d2" }}
        ></div>
        <div className="flex justify-center">
          <div className=" md2:my-[120px] bg-white md2:w-[808px] shadow-custom md2:absolute md2:top z-0  ">
            <div className="mx-8 my-5 text-[24px] fontstylish font-weight-400 text-blue-600">
              My Projects
            </div>
            <div className="flex"></div>
            <div>
              {projects &&
                projects.length > 0 &&
                projects.map((x: project,index) => {
                  return (
                    <div key={index} className="mx-8">
                      <div className="fontstylish">
                        <div className="flex mx-2 mb-2 text-[21px] font-bold">
                          <h2>{x.title}</h2>
                          <div className="spacer"></div>
                          <div className="ml-auto">
                            <FaGithub
                              onClick={() => {
                                window.open(
                                  "https://github.com/devlup-labs",
                                  "_blank",
                                );
                              }}
                              className="mx-2 hover:cursor-pointer h-8"
                            ></FaGithub>
                          </div>
                        </div>
                        <div className="mx-2 text-[14px] mb-4">{x.tag}</div>
                        <div className="mx-2 scroll-m-12 md4">
                          <h5 className="font-semibold py-1">Mentors</h5>
                          <ul className="py-1 mx-2">
                            <li>
                              {"\u2022"} {x.mentor}
                            </li>
                          </ul>
                          <h5 className="font-semibold py-1 pb-5">
                            Technologies
                          </h5>
                          <span className="rounded-full  px-4 py-2 bg-gray-300">
                            {x.technology}
                          </span>
                          <h5 className="font-semibold py-1 pt-5">
                            Description
                          </h5>
                          <div className="my-5">{x.description}</div>
                          <div className="spacer py-5"></div>
                          <hr></hr>
                          <div className="spacer py-5"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
