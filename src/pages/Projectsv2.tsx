import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub } from "react-icons/fa6";
import { useRecoilState, useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";
import { userstate } from "../store/userState";
import { wocstate } from "../store/woc";
import { resultstate } from "../store/results";
import project from "../types/project";
import { GlassCard } from "@/components/ui/glass-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {ShimmerButton} from "@/components/ui/shimmer-button";
import {Ripple} from "@/components/ui/ripple";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";

const Projectsv2 = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [id, setId] = useState("");
  const results = useRecoilValue(resultstate);
  const [mentorid, setMentorid] = useState("");
  const [drive, setDrive] = useState("");
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState<project[]>([]);
  const [user, setUser] = useRecoilState(userstate);
  const [toggle, setToggle] = useRecoilState(togglestate);
  const woc_state = useRecoilValue(wocstate);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleOpen = (id: string, mentorid: string, title: string) => {
    setId(id);
    setMentorid(mentorid);
    setTitle(title);
    setOpen(true);
  };

  const handleClose = async (
    id: string,
    mentorid: string,
    drive: string,
    title: string
  ) => {
    if (user) {
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
              email: `${user.email}`,
              name: `${user.first_name} ${user.last_name}`,
              drive,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage(resp.data.msg);
        setOpen(false);
        setIsChecked(false);
        setToggle(null);
        setUser({ ...user, projects: resp.data.user.projects });
      } catch (error) {
        console.error("Error handling project close:", error);
      }
    }
  };

  const deleteProposal = async (title: string, id: string) => {
    if (user) {
      const token = localStorage.getItem("jwt_token");
      try {
        const resp = await axios.delete(
          `${BASE_URL}/deleteproposal?user_id=${user.id}&title=${title}&id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setToggle(null);
        setUser({ ...user, projects: resp.data.user.projects });
      } catch (error) {
        console.error("Error deleting proposal:", error);
        alert("Failed to delete proposal. Please try again.");
      }
    } else {
      alert("User or token not found");
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get(`${BASE_URL}/projects`);
      setProjects(response.data);
    };
    getProjects();
  }, [user, BASE_URL]);

  return (
    <div className="min-h-screen w-full bg-deep-night overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Ripple />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ice-surge/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-violet/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <AnimatedGradientText className="inline-flex items-center justify-center">
            <span className="text-sm font-medium">
              ✨ Winter of Code 2025
            </span>
          </AnimatedGradientText>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-ice-surge via-frost-ember to-aurora-violet bg-clip-text text-transparent">
            Open Source Projects
          </h1>

          <p className="text-cloud-gray text-lg md:text-xl max-w-2xl mx-auto">
            Explore cutting-edge projects and collaborate with talented developers
          </p>
        </div>

        {/* Projects Grid */}
        {woc_state ? (
          projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: project) => (
                <GlassCard
                  key={project.id}
                  className="group relative overflow-hidden bg-arctic-steel/50 hover:bg-arctic-steel/70 transition-all duration-300"
                >
                  <BorderBeam size={250} duration={12} delay={9} />

                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-frost-white text-xl group-hover:text-ice-surge transition-colors">
                        {project.title}
                      </CardTitle>
                      <button
                        onClick={() => window.open("https://github.com/devlup-labs", "_blank")}
                        className="p-2 rounded-lg bg-cold-slate/50 hover:bg-ice-surge/20 transition-all"
                      >
                        <FaGithub className="w-5 h-5 text-frost-white" />
                      </button>
                    </div>

                    <CardDescription className="text-cloud-gray">
                      {project.tag}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technology?.split(',').map((tech, idx) => (
                        <Badge
                          key={idx}
                          className="bg-ice-surge/10 text-ice-surge border-ice-surge/20 hover:bg-ice-surge/20"
                        >
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-frost-white/80 text-sm line-clamp-3">
                      {project.description}
                    </p>

                    {/* Mentor & Contributors */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-abyss-shadow">
                      <div>
                        <p className="text-cloud-gray text-xs mb-1">Mentor</p>
                        <p className="text-frost-white text-sm font-medium">{project.mentor}</p>
                      </div>

                      {results && project.mentee?.length > 0 && (
                        <div>
                          <p className="text-cloud-gray text-xs mb-1">Contributors</p>
                          <p className="text-frost-white text-sm font-medium">
                            {project.mentee.length}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {!results && user && user.role === "1" && (
                      <div className="pt-4">
                        {user.projects?.some((p: project) => p.id === project.id) ? (
                          <Button
                            onClick={() => deleteProposal(project.title, project.id)}
                            className="w-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                          >
                            Delete Proposal
                          </Button>
                        ) : (
                          <ShimmerButton
                            onClick={() => handleOpen(project.id, project.mentorid, project.title)}
                            className="w-full bg-gradient-to-r from-ice-surge to-frost-ember"
                          >
                            Add Proposal
                          </ShimmerButton>
                        )}
                      </div>
                    )}
                  </CardContent>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <GlassCard className="bg-arctic-steel/50 p-12 text-center">
                  <BorderBeam size={250} duration={12} />
                  <h3 className="text-frost-white text-3xl font-bold mb-4">
                    No Projects Available
                  </h3>
                  <p className="text-cloud-gray">
                    Check back soon for exciting projects!
                  </p>
                </GlassCard>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <GlassCard className="bg-arctic-steel/50 p-12 text-center max-w-2xl">
                <BorderBeam size={250} duration={12} />
                <h3 className="text-frost-white text-3xl font-bold mb-4">
                  WOC Has Not Started Yet
                </h3>
                <p className="text-cloud-gray mb-8">
                  Stay tuned for the upcoming Winter of Code season!
                </p>
                <ShimmerButton
                  onClick={() => window.location.href = "/pastprogram"}
                  className="bg-gradient-to-r from-ice-surge to-frost-ember"
                >
                  View Past Projects
                </ShimmerButton>
              </GlassCard>
            </div>
          </div>
        )}
      </div>

      {/* Proposal Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <GlassCard className="bg-arctic-steel w-full max-w-md mx-4 p-6 space-y-6">
            <BorderBeam size={250} duration={12} />

            <div>
              <h2 className="text-frost-white text-2xl font-bold mb-2">
                Submit Proposal
              </h2>
              <p className="text-cloud-gray text-sm">
                for {title}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-frost-white text-sm mb-2 block">
                  Google Drive Link
                </label>
                <input
                  type="url"
                  value={drive}
                  onChange={(e) => setDrive(e.target.value)}
                  className="w-full px-4 py-3 bg-cold-slate border border-abyss-shadow rounded-lg text-frost-white focus:outline-none focus:border-ice-surge transition-colors"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="w-5 h-5 rounded border-abyss-shadow bg-cold-slate checked:bg-ice-surge"
                />
                <span className="text-frost-white text-sm">
                  I have given view access for the proposal
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setOpen(false)}
                className="flex-1 bg-cold-slate text-frost-white hover:bg-cold-slate/70"
              >
                Cancel
              </Button>
              <ShimmerButton
                onClick={() => handleClose(id, mentorid, drive, title)}
                disabled={!isChecked || !drive}
                className="flex-1 bg-gradient-to-r from-ice-surge to-frost-ember disabled:opacity-50"
              >
                Submit
              </ShimmerButton>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-8 right-8 z-50">
          <GlassCard className="bg-cryo-mint/20 border-cryo-mint/30 p-4 min-w-[300px]">
            <p className="text-frost-white">{successMessage}</p>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default Projectsv2;
