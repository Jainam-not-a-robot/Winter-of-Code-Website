import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiArrowLeft, HiOutlineCode } from 'react-icons/hi';
import axios from 'axios';
import project from '../types/project';
import { motion } from 'framer-motion';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<project | null>(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projects`);
        const allProjects = response.data;
        const selectedProject = allProjects.find((p: project) => p.id === id);
        setProject(selectedProject);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id, BASE_URL]);

  if (loading) {
    return (
      <div className="bg-deep-night text-frost-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ice-surge/30 border-t-ice-surge rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cloud-gray">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-deep-night text-frost-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-cloud-gray mb-4">Project Not Found</h2>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ice-surge to-frost-ember rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-deep-night text-frost-white min-h-screen relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-ice-surge/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-aurora-violet/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-cloud-gray hover:text-ice-surge transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded border border-ice-surge/20 bg-ice-surge/10 text-ice-surge">
              {project.tag || "Open"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-4">
            {project.title}
          </h1>
        </motion.div>

        {/* Project Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <HiOutlineCode className="w-4 h-4" />
                About the Project
              </h3>
              <p className="text-sm leading-relaxed text-cloud-gray">
                {project.description}
              </p>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-medium text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.technology?.split(',').map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs text-frost-white px-3 py-1.5 rounded border border-white/10 bg-white/5"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-sm font-medium text-white mb-4">Mentors</h3>
              <div className="space-y-3">
                {(() => {
                  const mentors = Array.isArray(project.mentor)
                    ? project.mentor
                    : typeof project.mentor === 'string'
                    ? project.mentor.split(',')
                    : [];

                  return mentors.map((m: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-arctic-steel to-cold-slate border border-white/10 flex items-center justify-center text-sm font-medium text-white">
                        {m.trim().split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <span className="text-sm text-frost-white">{m.trim()}</span>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {project.mentee && project.mentee.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-medium text-white mb-4">Contributors</h3>
                <div className="space-y-2">
                  {project.mentee.map((mentee: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-cloud-gray p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-ice-surge"></div>
                      {mentee}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="glass-panel rounded-2xl p-6 bg-gradient-to-b from-white/5 to-transparent border border-white/5">
              <Link
                to="/projects"
                className="w-full py-3 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
