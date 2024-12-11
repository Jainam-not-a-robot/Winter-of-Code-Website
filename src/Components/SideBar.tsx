import { Link } from "react-router-dom";
import { MdContentPasteSearch } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";
import { FaCalendarDays } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { IoPeopleSharp, IoCodeSlash } from "react-icons/io5";
import { FaTachometerAlt } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { userstate } from "../store/userState";
const Sidebar: React.FC<{ onClose: () => void }> = () => {
    const user = useRecoilValue(userstate)
    const [toggle,settoggle] = useRecoilState(togglestate)
    return (
      <aside
        className={`fixed md2:w-[300px] w-screen   bg-white  shadow-custom mt-16 opacity-100  ${
          toggle === null
            ? "hidden"
            : toggle
              ? "activeDrawer"
              : "inactiveDrawer"
        }`}
        data-booted={true}
      >
        <div
          className="py-4 pl-4 pr-8 w-300 grid gap-2"
          style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
        >
        {user?.role =="scrummaster" &&
        (
        <Link to={"/admin"}>
            <div onClick={()=>settoggle(!toggle)} className="py-2 px-4 text-primary-dark hover:bg-slate-100 border-l-4 border-primary-dark flex align-middle gap-2">
              <i className="fa fa-code mr-2">
                <MdAdminPanelSettings className="h-6 w-6 " />
              </i>
            Admin
            </div>
          </Link>
            ) }
          <Link to={"/"}>
            <div onClick={()=>settoggle(!toggle)} className="hover:bg-slate-100 py-2 px-4 text-primary-dark border-l-4 border-primary-dark flex align-middle gap-2">
              <i className="fa fa-home mr-2">
                <FaHome className="h-6 w-6 text-gray-700 stroke-1" />
              </i>{" "}
              Home
            </div>
          </Link>
          <Link to={"/how-it-works"}>
            <div onClick={()=>settoggle(!toggle)} className="hover:bg-slate-100  py-2 px-4 text-primary-dark border-l-4 border-primary-dark flex align-middle gap-2">
              <i className="fa fa-calendar mr-2">
                <FaCalendarDays className="h-6 w-6 text-gray-700 stroke-1" />
              </i>{" "}
              How It Works
            </div>
          </Link>
          <Link to={"/mentors"}>
            <div onClick={()=>settoggle(!toggle)} className="py-2 px-4 hover:bg-slate-100 text-primary-dark border-l-4 border-primary-dark flex align-middle gap-2">
              <i className="material-icons mr-2">
                <IoPeopleSharp className="h-6 w-6 text-gray-700 stroke-1" />
              </i>{" "}
              Mentors
            </div>
          </Link>
          <Link to={"/ideas"}>
            <div onClick={()=>settoggle(!toggle)} className="py-2 px-4 text-primary-dark hover:bg-slate-100 border-l-4 border-primary-dark flex align-middle gap-2">
              <i className="fa fa-code mr-2">
                <FaLightbulb className="h-6 w-6 text-gray-700 stroke-1" />
              </i>
              Ideas
            </div>
          </Link>
          <Link to={"/projects"}>
            <div onClick={()=>settoggle(!toggle)} className="py-2 px-4 text-primary-dark hover:bg-slate-100 border-l-4 border-primary-dark flex align-middle gap-2">
              <i className="fa fa-code mr-2">
                <IoCodeSlash className="h-6 w-6 text-gray-700 stroke-1" />
              </i>{" "}
              Projects
            </div>
          </Link>
          {user && user.role == "1" ? (
            <Link to={"/myprojects"}>
              <div  onClick={()=>settoggle(!toggle)} className="py-2 px-4 text-primary-dark border-l-4 hover:bg-slate-100 border-primary-dark flex align-middle gap-2">
                <i className="fa fa-tachometer mr-2">
                  <FaTachometerAlt className="h-6 w-6 text-gray-700 stroke-1" />
                </i>{" "}
                MyProjects
              </div>
            </Link>
          ) : (
            user &&
            (user.role == "2" || user.role =="scrummaster") && (
              <Link to={"/proposals"}>
                <div onClick={()=>settoggle(!toggle)}  className="py-2 px-4 text-primary-dark border-l-4 hover:bg-slate-100 border-primary-dark flex align-middle gap-2">
                  <i className="fa fa-tachometer mr-2">
                    <FaTachometerAlt className="h-6 w-6 text-gray-700 stroke-1" />
                  </i>{" "}
                  Proposals
                </div>
              </Link>
            )
          )}
          <Link to={"/pastprogram"}>
            <div onClick={()=>settoggle(!toggle)} className="py-2 px-4 text-primary-dark hover:bg-slate-100 border-l-4 border-primary-dark flex align-middle gap-2">
              <i className="fa fa-code mr-2">
                <MdContentPasteSearch className="h-6 w-6 text-gray-700 stroke-1" />
              </i>{" "}
              PastProgram
            </div>
          </Link>

          <Link to={"/help"}>
            <div onClick={()=>settoggle(!toggle)} className=" hover:text-blue-500 py-2 px-4 text-primary-dark border-l-4 hover:bg-slate-100 border-primary-dark flex align-middle gap-2">
              <i className="material-icons mr-2">
                <IoMdHelpCircle className="h-6 w-6 text-gray-700 stroke-1" />
              </i>{" "}
              Help
            </div>
          </Link>
        </div>
        <div className="border-t border-gray-200"></div>
      </aside>
    );
  };
  export default Sidebar