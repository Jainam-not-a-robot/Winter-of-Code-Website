import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub } from "react-icons/fa6";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { togglestate } from "../store/toggle";
import { userstate } from "../store/userState";
import { wocstate } from "../store/woc";
import project from "../types/project";
import { Link } from "react-router-dom";
import { resultstate } from "../store/results";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "90%",
  maxHeight: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 5,
  p: 4,
  overflow: "auto",
};

const Projects = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [id, setId] = useState("");
  const results=useRecoilValue(resultstate)
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
          const token = localStorage.getItem("jwt_token")
            const resp = await axios.post(`${BASE_URL}/users/project`, {
                user: user.id,
                _id: id,
                proposal: {
                    title,
                    mentorid,
                    email: `${user.email}`,
                    name: `${user.first_name} ${user.last_name}`,
                    drive,
                },
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            setSuccessMessage(resp.data.msg);
            setOpenSnackbar(true);
            setOpen(false);
            setIsChecked(false);
            setToggle(null);
            setUser({ ...user, projects: resp.data.user.projects });
        } catch (error) {
            console.error("Error handling project close:", error);
        }
    }
};
  const deleteProposal = async (title: string,id:string) => {
    if (user) { 
      const token = localStorage.getItem('jwt_token')
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
  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    console.log('User details:', user);
    const getProjects = async () => {
      const response = await axios.get(`${BASE_URL}/projects`);
      setProjects(response.data);
    };
    getProjects();

  },[user,BASE_URL]);

  return (
    <div className="relative w-screen overflow-x-hidden h-screen">
      <div className={`${toggle === null ? "" : toggle ? "contract" : "expand"}`}>
        <div className="flex justify-center md2:h-[180px] h-[120px] w-screen md2:absolute md2:top-0 z-1 bg-blue-600"></div>
        <div className="flex justify-center">
          <div className="md2:my-[120px] bg-white md2:w-[808px] shadow-custom md2:absolute z-0">
            <div className="mx-8 my-5 text-[24px] fontstylish font-weight-400 text-blue-600">Projects</div>
            <div>
              {woc_state ? (
                projects.length > 0 ? (
                  projects.map((x: project) => (
                    <div className="mx-8" key={x.id}>
                      <div className="fontstylish">
                        <div className="flex mx-2 mb-2 text-[21px] font-bold">
                          <h2>{x.title}</h2>
                          <div className="ml-auto">
                            <FaGithub
                              onClick={() => window.open("https://github.com/devlup-labs", "_blank")}
                              className="mx-2 hover:cursor-pointer h-8"
                            />
                          </div>
                        </div>
                        <div className="mx-2 text-[14px] mb-4">{x.tag}</div>
                        <div className="mx-2 scroll-m-12 md4">
                        <div className='flex justify-between'>
                          <div>
                          <h5 className="font-semibold py-1">Mentors</h5>
                          <ul className="py-1 mx-2">
                            <li>{x.mentor}</li>
                          </ul>
                          </div>
                          <div>
                          {results?(
                            <>
                          <h5 className="font-semibold py-1">Contributors</h5>
                          <ul className="py-1 mx-2">
                            {x.mentee.map((mentee, index) => (
                              <li key={index}>{mentee}</li>
                            ))}
                          </ul>
                          </>
                          ):<></>}
                          </div>
                          </div>
                          <h5 className="font-semibold py-1 pb-5">Technologies</h5>
                          <span className="rounded-full px-4 py-2 bg-gray-300">{x.technology}</span>
                          <h5 className="font-semibold py-1 pt-5">Description</h5>
                          <div className="my-5">{x.description}</div>
                          {!results && user && user.role === "1" && (
                            <>
                              {user.projects?.some((project: project) => project.id === x.id) ? (
                                <Button color="error" variant="contained" onClick={() => deleteProposal(x.title,x.id)}>
                                  Delete Proposal
                                </Button>
                              ) : (
                                <Button variant="contained" onClick={() => handleOpen(x.id, x.mentorid, x.title)}>
                                  Add Proposal
                                </Button>
                              )}
                              <Modal
                                open={open}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                BackdropProps={{ style: { backgroundColor: "transparent" } }}
                              >
                                <Box sx={style}>
                                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: "15px" }}>
                                    Google Drive Link
                                  </Typography>
                                  <TextField
                                    sx={{ margin: "10px" }}
                                    fullWidth
                                    onChange={(e) => setDrive(e.target.value)}
                                  />
                                  <input
                                    className="m-[10px]"
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                  />
                                  <span>Gave view access for the proposal.</span>
                                  <br />
                                  <Button
                                    disabled={!isChecked}
                                    variant="contained"
                                    sx={{ margin: "10px" }}
                                    onClick={() => handleClose(id, mentorid, drive, title)}
                                  >
                                    Submit
                                  </Button>
                                </Box>
                              </Modal>
                            </>
                          )}
                          <div className="spacer py-5"></div>
                          <hr />
                          <div className="spacer py-5"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center m-5 text-[30px] font-stylish font-bold">No Projects Available</div>
                )
              ) : (
                <>
                  <Link to="/pastprogram">
                <div className="flex justify-center m-5 text-[30px] font-stylish font-bold">WOC Has Not Started Yet</div>
                <div className="flex justify-center m-2">
                <Button className="flex justify-center" variant="contained">View Past Projects</Button>
                </div>
                </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default Projects;
