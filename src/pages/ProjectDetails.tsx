import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import project from '../types/project';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<project | null>(null);
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
      }
    };
    getProject();
  }, [id, BASE_URL]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-gray-400 mb-8">{project.tag}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4">Project Description</h2>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>
          <div>
            <div className="bg-gray-800/50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-cyan-400">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technology?.split(',').map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-900/50 rounded-full">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400">Mentors</h4>
                  <p className="text-gray-300">{project.mentor}</p>
                </div>
                {project.mentee?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-cyan-400">Contributors</h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {project.mentee.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
