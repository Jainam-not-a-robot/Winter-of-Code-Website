import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaSearch } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { TbLayersIntersect } from "react-icons/tb";
import { useRecoilState, useRecoilValue } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { userstate } from "../store/userState";
import { wocstate } from "../store/woc";
import { resultstate } from "../store/results";
import project from "../types/project";
import { togglestate } from "@/store/toggle";

interface ProjectCardProps {
  project: project;
  onApply: (id: string, mentorid: string, title: string, drive: string) => void;
  onDelete: (title: string, id: string) => void;
  user: any;
  results: any;
  onOpenModal: (project: project) => void;
}

const ProjectCard = ({ project, onOpenModal }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group cursor-pointer glass rounded-2xl p-8 hover:border-ice-surge/30 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(0,198,255,0.2)] relative overflow-hidden"
      onClick={() => onOpenModal(project)}
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <HiOutlineArrowUpRight className="w-5 h-5 text-ice-surge" />
      </div>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-cloud-gray group-hover:text-white group-hover:bg-ice-surge/10 transition-colors">
          <TbLayersIntersect className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-medium px-2 py-1 rounded-md border border-white/5 bg-white/5 text-cloud-gray">
          {project.tag || "Open"}
        </span>
      </div>
      <h3 className="text-2xl font-semibold text-frost-white mb-3 group-hover:text-ice-surge transition-colors tracking-tight">
        {project.title}
      </h3>

      <p className="text-base text-cloud-gray line-clamp-3 mb-6 group-hover:text-slate-300 transition-colors leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.technology
          ?.split(",")
          .slice(0, 3)
          .map((tech: string, idx: number) => (
            <span
              key={idx}
              className="text-xs text-cloud-gray px-3 py-1 rounded border border-white/10 bg-white/[0.03]"
            >
              {tech.trim()}
            </span>
          ))}
        {project.technology?.split(",").length > 3 && (
          <span className="text-[10px] text-slate-500 px-1">
            +{project.technology.split(",").length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
};

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: project | null;
  user: any;
  onApply: (id: string, mentorid: string, title: string, drive: string) => void;
  onDelete: (title: string, id: string) => void;
}

const ProjectModal = ({
  isOpen,
  onClose,
  project,
  user,
  onApply,
  onDelete,
}: ProjectModalProps) => {
  const [showProposal, setShowProposal] = useState(false);
  const [drive, setDrive] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // if (!isOpen || !project) return null;

  const handleApplyClick = () => {
    setShowProposal(true);
  };

  const handleSubmitProposal = () => {
    onApply(project.id, project.mentorid, project.title, drive);
    setShowProposal(false);
    setDrive("");
    setIsChecked(false);
    onClose();
  };

  const handleDeleteClick = () => {
    onDelete(project.title, project.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100]"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl lg:max-w-5xl glass-panel rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div
                className="p-8 sm:p-10
 border-b border-white/5 flex justify-between items-start bg-white/[0.02]"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded border border-ice-surge/20 bg-ice-surge/10 text-ice-surge">
                      {project.tag || "Open"}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-cloud-gray hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              {!showProposal ? (
                <div
                  className="p-8 sm:p-10
 overflow-y-auto no-scrollbar space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                          About the Project
                        </h3>
                        <p className="text-base leading-relaxed text-cloud-gray/90">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technology
                            ?.split(",")
                            .map((tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-xs text-frost-white px-2.5 py-1 rounded border border-white/10 bg-white/5 flex items-center gap-1.5"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Mentors
                        </h3>
                        <div className="space-y-3">
                          {(() => {
                            const mentors = Array.isArray(project.mentor)
                              ? project.mentor
                              : typeof project.mentor === "string"
                              ? project.mentor.split(",")
                              : [];

                            return mentors.map((m: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-arctic-steel to-cold-slate border border-white/10 flex items-center justify-center text-xs font-medium text-white">
                                  {m
                                    .trim()
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </div>
                                <span className="text-sm text-frost-white">
                                  {m.trim()}
                                </span>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>

                      {user && user.role === "1" && (
                        <div className="p-4 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
                          {user.projects?.some(
                            (p: project) => p.id === project.id
                          ) ? (
                            <button
                              onClick={handleDeleteClick}
                              className="w-full py-2.5 bg-red-500/80 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                            >
                              <FaTrash className="w-3 h-3" />
                              Delete Application
                            </button>
                          ) : (
                            <button
                              onClick={handleApplyClick}
                              className="w-full py-2.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                            >
                              Apply Now{" "}
                              <HiOutlineArrowUpRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="p-8 sm:p-10
 space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Submit Proposal
                    </h3>
                    <p className="text-cloud-gray">
                      For project:{" "}
                      <span className="font-semibold text-ice-surge">
                        {project.title}
                      </span>
                    </p>
                  </div>

                  <input
                    type="url"
                    value={drive}
                    onChange={(e) => setDrive(e.target.value)}
                    className="w-full px-4 py-3 bg-arctic-steel border border-white/10 rounded-lg text-white focus:outline-none focus:border-ice-surge transition-colors"
                    placeholder="https://drive.google.com/..."
                  />

                  <label className="flex items-center gap-3 text-frost-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="w-5 h-5 rounded-sm bg-arctic-steel border-white/20 text-ice-surge focus:ring-ice-surge"
                    />
                    <span>I have given view access for the proposal.</span>
                  </label>

                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setShowProposal(false);
                        setDrive("");
                        setIsChecked(false);
                      }}
                      className="px-6 py-2 text-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitProposal}
                      disabled={!isChecked || !drive}
                      className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-ice-surge to-frost-ember rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Projectsv2 = () => {
  const [projects, setProjects] = useState<project[]>([]);
  const [user, setUser] = useRecoilState(userstate);
  const woc_state = useRecoilValue(wocstate);
  const results = useRecoilValue(resultstate);
  const [, setToggle] = useRecoilState(togglestate);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [selectedProject, setSelectedProject] = useState<project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({ show: false, message: "" });

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getProjects();
  }, [BASE_URL]);

  const showSnackbar = (message: string) => {
    setSnackbar({ show: true, message });
    setTimeout(() => setSnackbar({ show: false, message: "" }), 3000);
  };

  const handleOpenModal = (project: project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleApply = async (
    id: string,
    mentorid: string,
    title: string,
    drive: string
  ) => {
    if (!user) {
      showSnackbar("You must be logged in to submit a proposal.");
      return;
    }
    try {
      const token = localStorage.getItem("jwt_token");
      const resp = await axios.post(
        `${BASE_URL}/users/project`,
        {
          user: user.id,
          _id: id,
          proposal: {
            title,
            mentorid,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            drive,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser({ ...user, projects: resp.data.user.projects });
      showSnackbar(resp.data.msg);
    } catch (error) {
      console.error("Error submitting proposal:", error);
      showSnackbar("Failed to submit proposal.");
    }
  };

  const handleDelete = async (title: string, id: string) => {
    if (!user) {
      showSnackbar("You must be logged in to delete a proposal.");
      return;
    }
    try {
      const token = localStorage.getItem("jwt_token");
      const resp = await axios.delete(
        `${BASE_URL}/deleteproposal?user_id=${user.id}&title=${title}&id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setToggle(null);
      setUser({ ...user, projects: resp.data.user.projects });
      showSnackbar("Proposal deleted successfully!");
    } catch (error) {
      console.error("Error deleting proposal:", error);
      showSnackbar("Failed to delete proposal.");
    }
  };

  return (
    <div className="bg-deep-night text-frost-white min-h-screen relative overflow-x-hidden">
      <div className="relative z-10 container mx-auto px-6 py-12">
        {woc_state ? (
          <>
            <header className="mb-16 mt-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ice-surge/10 border border-ice-surge/20 text-ice-surge text-[10px] font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ice-surge opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ice-surge"></span>
                </span>
                Applications Open for 2024
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6">
                Build the future <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-surge to-frost-ember">
                  this winter.
                </span>
              </h1>
              <p className="text-lg text-cloud-gray max-w-2xl leading-relaxed">
                Join top-tier open source projects, get mentored by industry
                experts, and ship code that matters. Explore the available
                projects below.
              </p>
            </header>

            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <div className="flex gap-6">
                <span className="text-sm text-white font-medium border-b border-ice-surge pb-4 -mb-4.5">
                  All Projects
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-cloud-gray bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                <FaSearch className="w-3.5 h-3.5" />
                <span>Search projects...</span>
              </div>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    onApply={handleApply}
                    onDelete={handleDelete}
                    user={user}
                    results={results}
                    onOpenModal={handleOpenModal}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-3xl font-bold text-cloud-gray">
                  No Projects Available Yet
                </h2>
                <p className="text-cloud-gray mt-2">Please check back later.</p>
              </div>
            )}

            <footer className="mt-24 py-12 border-t border-white/5 text-center">
              <p className="text-xs text-cloud-gray/60">
                © 2025 Winter of Code. Crafted with frost & code.
              </p>
            </footer>
          </>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-cloud-gray">
              Winter of Code has not started yet.
            </h2>
            <a
              href="/pastprogram"
              className="mt-4 inline-block px-6 py-3 font-semibold text-white bg-gradient-to-r from-ice-surge to-frost-ember rounded-lg"
            >
              View Past Projects
            </a>
          </div>
        )}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        user={user}
        onApply={handleApply}
        onDelete={handleDelete}
      />

      <AnimatePresence>
        {snackbar.show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-arctic-steel border border-white/10 text-white px-6 py-3 rounded-full shadow-lg z-[101]"
          >
            {snackbar.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projectsv2;
