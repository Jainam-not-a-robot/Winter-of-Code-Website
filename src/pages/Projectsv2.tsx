import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaGithub, FaPlus, FaTrash } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { userstate } from "../store/userState";
import { wocstate } from "../store/woc";
import { resultstate } from "../store/results";
import project from "../types/project";
import { togglestate } from "@/store/toggle";
import { Link } from "react-router-dom";

const SpotlightCard = ({ project, onApply, onDelete, user, results }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      layout
      className="relative rounded-2xl bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg overflow-hidden"
    >
      <Link to={`/projects/${project.id}`} className=" block" >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.2), transparent 40%)`,
        }}
      />
      <motion.div layout className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <a
            href="https://github.com/devlup-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaGithub size={24} />
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-1">{project.tag}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.technology?.split(",").map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-900/50 rounded-full"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <p className="text-gray-300 mt-4">{project.description}</p>
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <h4 className="font-semibold text-white">Mentors</h4>
            <p className="text-gray-400">{project.mentor}</p>
          </div>
          {results && project.mentee?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-white">Contributors</h4>
              <ul className="list-disc list-inside text-gray-400">
                {project.mentee.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
          </Link>
      <div className="bg-gray-800/50 px-6 py-3 flex justify-between items-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-cyan-400 hover:underline"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
        {!results && user && user.role === "1" && (
          <div>
            {user.projects?.some((p) => p.id === project.id) ? (
              <button
                onClick={() => onDelete(project.title, project.id)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600/50 hover:bg-red-600/80 rounded-lg transition-colors"
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            ) : (
              <button
                onClick={() =>
                  onApply(project.id, project.mentorid, project.title)
                }
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600/50 hover:bg-green-600/80 rounded-lg transition-colors"
              >
                <FaPlus />
                <span>Apply</span>
              </button>
            )}
          </div>
        )}
      </div>

    </motion.div>
  );
};

const ProposalModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  drive,
  setDrive,
  isChecked,
  setIsChecked,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              Submit Proposal
            </h2>
            <p className="text-gray-400 mb-6">
              For project:{" "}
              <span className="font-semibold text-cyan-400">{title}</span>
            </p>

            <input
              type="url"
              value={drive}
              onChange={(e) => setDrive(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="https://drive.google.com/..."
            />

            <label className="flex items-center gap-3 mt-4 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-5 h-5 rounded-sm bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600"
              />
              <span>I have given view access for the proposal.</span>
            </label>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={onClose}
                className="px-6 py-2 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!isChecked || !drive}
                className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </motion.div>
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
  const [toggle, setToggle] = useRecoilState(togglestate);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    id: "",
    mentorid: "",
    title: "",
  });
  const [drive, setDrive] = useState("");
  const [isChecked, setIsChecked] = useState(false);

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

  const showSnackbar = (message) => {
    setSnackbar({ show: true, message });
    setTimeout(() => setSnackbar({ show: false, message: "" }), 3000);
  };

  const handleApply = (id, mentorid, title) => {
    setModalData({ id, mentorid, title });
    setIsModalOpen(true);
  };

  const handleDelete = async (title, id) => {
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

  const handleModalSubmit = async () => {
    if (!user) {
      showSnackbar("You must be logged in to submit a proposal.");
      return;
    }
    try {
      const token = localStorage.getItem("jwt_token");
      const { id, mentorid, title } = modalData;
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
      setIsModalOpen(false);
      setDrive("");
      setIsChecked(false);
    } catch (error) {
      console.error("Error submitting proposal:", error);
      showSnackbar("Failed to submit proposal.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent leading-tight">
            Live Projects
          </h1>
        </header>

        {woc_state ? (
          projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <SpotlightCard
                  key={p.id}
                  project={p}
                  onApply={handleApply}
                  onDelete={handleDelete}
                  user={user}
                  results={results}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-3xl font-bold text-gray-500">
                No Projects Available Yet
              </h2>
              <p className="text-gray-600 mt-2">Please check back later.</p>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-400">
              Winter of Code has not started yet.
            </h2>
            <a
              href="/pastprogram"
              className="mt-4 inline-block px-6 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
            >
              View Past Projects
            </a>
          </div>
        )}
      </div>

      <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        title={modalData.title}
        drive={drive}
        setDrive={setDrive}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />

      <AnimatePresence>
        {snackbar.show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 text-white px-6 py-3 rounded-full shadow-lg"
          >
            {snackbar.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projectsv2;
