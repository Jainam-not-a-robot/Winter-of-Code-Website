import * as React from "react";
import { useState } from "react";
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import { Divider, IconButton } from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import Button from "@mui/material/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import { program } from "../types/program";

const ProjectCard = ({
  mentor,
  year,
  mentee,
  title,
  description,
  codelink,
  technology,
}: program) => {
  const [open, setOpen] = useState(false);

  // groups of two names for compact display
  const groupedMentees = (mentee || []).reduce<string[][]>((acc, name, idx) => {
    if (idx % 2 === 0) acc.push([name]);
    else acc[acc.length - 1].push(name);
    return acc;
  }, []);

  return (
    <>
      <div className="m-3">
        <Card
          variant="outlined"
          sx={{
            borderRadius: 8,
            width: { xs: "320px", sm: "360px", md: "400px" },
            height: "auto",
            background: "#1A2333",
           "&:hover": { bgcolor: "#111722" },
            borderWidth: 2 ,
            borderColor: "#00C6FF",
            boxShadow: "0 4px 8px #00C6FF",
            
            overflow: "hidden",
          }
        }
        >
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Chip
                  size="sm"
                  variant="soft"
                  sx={{
                    bgcolor: "#08294a",
                    color: "#7fe0ff",
                    fontWeight: 700,
                    px: 1.5,
                  }}
                >
                  WOC
                </Chip>
                <Chip
                  size="sm"
                  variant="soft"
                  sx={{
                    bgcolor: "#081728",
                    color: "#9ee7ff",
                    border: "1px solid rgba(255,255,255,0.04)",
                    px: 1.2,
                  }}
                >
                  {year}
                </Chip>
              </div>

              <div className="text-sm text-slate-400">{technology}</div>
            </div>

            <h3 className="mt-3 text-lg md:text-xl font-bold text-slate-100 leading-tight">
              {title}
            </h3>

            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-cyan-500/10 flex items-center justify-center">
                  <RxAvatar className="text-cyan-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Mentor</div>
                  <div className="text-sm font-medium text-slate-100">{mentor}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-slate-300">Contributors</div>
                <div className="text-sm text-slate-100">
                  {mentee && mentee.length > 0 ? (
                    groupedMentees.map((g, i) => (
                      <div key={i} className="leading-tight">
                        {g.join(", ")}
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-500">No mentees</span>
                  )}
                </div>
              </div>
            </div>

            <CardContent sx={{ p: 0, mt: 3 }}>
              <p className="text-sm text-slate-300 line-clamp-3">
                {description ? description.slice(0, 140) + (description.length > 140 ? "..." : "") : ""}
              </p>
            </CardContent>

            <CardActions sx={{ p: 0, mt: 4, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  bgcolor: "#00C6FF",
                  color: "#042027",
                  fontWeight: 700,
                  textTransform: "none",
                  px: 2,
                  "&:hover": { bgcolor: "##06b6d4" },
                }}
                startIcon={<OpenInNewIcon />}
              >
                View details
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  if (codelink) window.open(codelink, "_blank", "noopener");
                }}
                sx={{
                  color: "#9ee7ff",
                  borderColor: "rgba(158,231,255,0.12)",
                  textTransform: "none",
                }}
              >
                View code
              </Button>
            </CardActions>
          </div>
        </Card>

        <Transition in={open} timeout={300}>
          {(state: string) => (
            <Modal
              keepMounted
              open={!["exited", "exiting"].includes(state)}
              onClose={() => setOpen(false)}
              slotProps={{
                backdrop: {
                  sx: {
                    opacity: 0,
                    backdropFilter: "none",
                    transition: `opacity 300ms, backdrop-filter 300ms`,
                    ...{
                      entering: { opacity: 1, backdropFilter: "blur(6px)" },
                      entered: { opacity: 1, backdropFilter: "blur(6px)" },
                    }[state],
                  },
                },
              }}
              sx={{
                visibility: state === "exited" ? "hidden" : "visible",
              }}
            >
              <ModalDialog
                sx={{
                  maxWidth: { xs: "92vw", sm: "720px" },
                  bgcolor: "#071016",
                  color: "#e6eef5",
                  borderRadius: 2,
                  boxShadow: "0 10px 30px rgba(2,6,23,0.7)",
                  padding: 2,
                  opacity: 0,
                  transition: `opacity 220ms`,
                  ...{
                    entering: { opacity: 1 },
                    entered: { opacity: 1 },
                  }[state],
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-cyan-300">{title}</h2>
                    <div className="mt-1 text-sm text-slate-300">{technology}</div>
                  </div>
                  <IconButton
                    onClick={() => setOpen(false)}
                    size="small"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>

                <DialogContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-slate-300 text-sm font-medium">Mentor</div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-12 h-12 rounded-md bg-cyan-500/10 flex items-center justify-center">
                          <RxAvatar className="text-cyan-300" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-100">{mentor}</div>
                          <div className="text-sm text-slate-400">Year: {year}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-300 text-sm font-medium">Contributors</div>
                      <div className="mt-2 text-slate-100">
                        {mentee && mentee.length > 0 ? (
                          mentee.map((name, idx) => (
                            <div key={idx} className="leading-tight">
                              {name}
                            </div>
                          ))
                        ) : (
                          <div className="text-slate-500">No mentees</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.06)" }} />

                  <div className="text-slate-200 mb-4">{description}</div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-slate-300">Technology</div>
                      <div className="text-slate-100 font-medium">{technology}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (codelink) window.open(codelink, "_blank", "noopener");
                        }}
                        sx={{
                          bgcolor: "#06b6d4",
                          color: "#042027",
                          fontWeight: 700,
                          textTransform: "none",
                          "&:hover": { bgcolor: "#05a6bd" },
                        }}
                      >
                        View Code
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => setOpen(false)}
                        sx={{
                          color: "#9ee7ff",
                          borderColor: "rgba(158,231,255,0.12)",
                          textTransform: "none",
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </ModalDialog>
            </Modal>
          )}
        </Transition>
      </div>
    </>
  );
};

export default ProjectCard;
