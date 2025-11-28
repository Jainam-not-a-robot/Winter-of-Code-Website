import * as React from "react";
import {useState} from "react"
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import { Divider } from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import Button from "@mui/material/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import {program} from "../types/program"
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
    return (
      <React.Fragment>
        <div className="m-3 ">
          <Card
            style={{
              borderRadius: "16px",
            }}
            sx={{
              overflow: "hidden",
              Width: 700,
              "@media(max-width: 480px)": {
                width: "300px",
                height: "420px",
              },
              width: "400px",
              height: "350px",
            }}
          >
            <div className="flex">
              <Chip
                size="md"
                style={{
                  background: "#145ac4",
                  color: "white",
                }}
                sx={{
                  "--Chip-gap": "6px",
                }}
                variant="soft"
              >
                WOC
              </Chip>
              <Chip size="md" color="primary" variant="soft">
                {year}
              </Chip>
            </div>
                <div className="text-[24px] font-sans2 font-bold">{title}</div>
              <div className="flex justify-between">
                <div className="text-[24px] font-sans2 font-bold text-blue-600">
                  Mentor
                  <div className="flex text-[20px] text-black">{mentor}</div>
                </div>
                <div className="text-[24px] font-sans2 text-blue-600 font-bold">
                        Contributors
                        <div>
                          {mentee.length > 0 ? (
                            mentee.reduce<string[][]>((acc, menteeName, index) => {
                              if (index % 2 === 0) {
                                acc.push([menteeName]); 
                              } else {
                                acc[acc.length - 1].push(menteeName); 
                              }
                              return acc; 
                            }, []).map((group, groupIndex) => (
                              <div className="text-[22px] font-sans2 font-bold text-black" key={groupIndex}>
                                {group.join(", ")}
                              </div>
                            ))
                          ) : (
                            "No mentees" 
                          )}
                        </div>
                        </div>
              </div>
            <CardContent>
              <div className="text-[15px] text-slate-600 font-sans2 ">
                {description.slice(0, 140)}.
              </div>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={() => setOpen(true)}>
                View details
              </Button>
              <Button
                variant="contained"
                onClick={() => (window.location.href = codelink)}
              >
                View Code
              </Button>
            </CardActions>
          </Card>
          <Transition in={open} timeout={400}>
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
                      transition: `opacity 400ms, backdrop-filter 400ms`,
                      ...{
                        entering: { opacity: 1, backdropFilter: "blur(8px)" },
                        entered: { opacity: 1, backdropFilter: "blur(8px)" },
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
                    opacity: 0,
                    transition: `opacity 300ms`,
                    ...{
                      entering: { opacity: 1 },
                      entered: { opacity: 1 },
                    }[state],
                  }}
                >
                  <div className="text-blue-600 text-[20px] mx-3 font-sans2">
                    {title}
                  </div>
                  <DialogContent>
                    <div className="mx-3 my-1  flex justify-between font-sans2 font-extrabold text-black">
                      <div className="mr-10 text-[20px]">
                        <div className="ml-2"> Mentor</div>
                        <div className="flex ">
                          <RxAvatar className=" w-[40px]  text-blue-600 h-[30px]" />{" "}
                          {mentor}
                        </div>
                      </div>
                      <div className="text-[20px]">
                        Contributors
                        <div>
                          {mentee.length > 0 ? (
                            mentee.reduce<string[][]>((acc, menteeName, index) => {
                              if (index % 2 === 0) {
                                acc.push([menteeName]); 
                              } else {
                                acc[acc.length - 1].push(menteeName); 
                              }
                              return acc; 
                            }, []).map((group, groupIndex) => (
                              <div key={groupIndex}>
                                {group.join(", ")}
                              </div>
                            ))
                          ) : (
                            "No mentees" 
                          )}
                        </div>
                        </div>
                    </div>
                    <Divider style={{ background: "#A9A9A9" }} variant="middle" />
                    <div className="m-3 font-sans2">{description}</div>
                    <div className="flex flex-wrap">
                      <div className="sm:my-3 ml-3 mr-1  font-sans2 text-blue-600 font-bold">
                        technology :
                      </div>
                      <div className="sm:my-3 ml-3  font-sans2 text-black">
                        {technology}
                      </div>
                    </div>
                    <Button
                      variant="contained"
                      onClick={() => (window.location.href = codelink)}
                    >
                      View Code
                    </Button>
                  </DialogContent>
                </ModalDialog>
              </Modal>
            )}
          </Transition>
        </div>
      </React.Fragment>
    );
  };
  export default ProjectCard;