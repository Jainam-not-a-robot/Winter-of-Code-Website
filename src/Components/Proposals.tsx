import { useRecoilValue } from "recoil";
import { userstate } from "../store/userState";
import { useEffect, useState } from "react";
import axios from "axios";
import { togglestate } from "../store/toggle";
import { useNavigate } from "react-router-dom";
import { Proposal } from "../types/proposal";
import { AdminTable, CustomizedTables } from "./Tables";


const ProposalPage = () => {
  const navigate = useNavigate();
  const toggle = useRecoilValue(togglestate);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const user = useRecoilValue(userstate);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [status, setstatus] = useState(false);
  const updateproposal = async (id: string, completed: boolean,mentorid:string) => {
    try {
      const token = localStorage.getItem("jwt_token");
      const resp = await axios.put(
        `${BASE_URL}/updateproposal/${id}/${!completed}/${mentorid}`,{
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setstatus(!status);
      console.log(resp);
    } catch (error) {
      console.error("Error updating timeline:", error);
    }
  };
  useEffect(() => {
    const getProposals = async () => {
      if (user) {
        if (user.role == "1") {
          navigate("/");
          return;
        }
        if (user.role == "2") {
          const token = localStorage.getItem("jwt_token");
          try {
            const resp = await axios.get(
              `${BASE_URL}/proposals/${user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setProposals(resp.data);
          } catch (error) {
            console.error("Error fetching proposals:", error);
          }
        }
        if (user.role == "scrummaster") {
          const token = localStorage.getItem("jwt_token");
          try {
            const resp = await axios.get(
              `${BASE_URL}/allproposals`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setProposals(resp.data);
          } catch (error) {
            console.error("Error fetching proposals:", error);
          }
        }
      }
    };
    getProposals();
  }, [user, BASE_URL,status, navigate]);

  return (
    <div className="border-2 border-black relative w-screen overflow-x-hidden h-screen ">
      <div className={`overflow-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"}`}>
        <div
          className="flex justify-center md2:h-[180px] h-[120px] w-screen md2:absolute md2:top-0  z-1"
          style={{ backgroundColor: "#1976d2" }}
        ></div>
        <div className="flex justify-center ">
          <div className="bg-white md2:w-[808px] shadow-custom md2:absolute md2:top-32 z-0 ">
            <div className="mx-8 my-5 text-[24px] fontstylish font-weight-400 text-blue-600">
              Proposals
            </div>
            <div className="italic m-5">
              Welcome to our project proposal page, where students showcase
              their innovative ideas and ambitious plans. Here, you'll find a
              diverse array of projects spanning various disciplines, from
              technology to social sciences, all conceived and crafted by our
              talented students.
            </div>
            <div className="m-5">
              {
                user?.role == "2" ?
              
                  <CustomizedTables proposals={proposals} updateproposal={updateproposal} />
                  :
                  <AdminTable proposals={proposals} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalPage;
