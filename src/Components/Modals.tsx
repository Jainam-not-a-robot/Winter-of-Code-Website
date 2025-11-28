import {  Box, Typography, Button , Modal,  TextField } from "@mui/material";
import { mentorrequest } from "../types/mentor";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import project from "../types/project";
import axios from "axios";
import { userstate } from "../store/userState";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
export const MentorRequestsModal = ({ open, onClose, mentors, onAccept }: { open: boolean, onClose: () => void, mentors: mentorrequest[], onAccept: (id: string) => void }) => (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          Requests to be Mentors
        </Typography>
        <div>
          {mentors && mentors.length > 0 && mentors.map((mentor) => (
            <div key={mentor.id} className="flex justify-between">
              <div>{mentor.name}</div>
              <Button variant="contained" onClick={() => onAccept(mentor.id)}>
                Accept Request
              </Button>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );

export const DriveModal = ({ open, onClose }: { open: boolean, onClose: () => void}) => {
    const [projects,setProjects]=useState<project[]>([])
    const [projectid,setprojectid] =useState("")
    const [progress,setprogress]=useState("")
    const [project,setproject]=useState<string>("")
    const user = useRecoilValue(userstate);
    const Addprogress=async()=>{
      try{
      const response = await axios.post(
        `${BASE_URL}/addprogress`, 
        { id:projectid,
          progress: progress }, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,  
                'Content-Type': 'application/json',  
            }
        }
    );
  alert(response.data.message);
  } 
  catch (error) {
        alert('An unexpected error occurred');
  }
    }
    
    useEffect(()=>{
      if(user){
        const getProjects = async () => {
          const response = await axios.get(`${BASE_URL}/mentor_projects/${user.id}`);
          setProjects(response.data);
        };
        getProjects();
  
    }},[user])
  
    return(
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
      <div className="flex  flex-col item-center justify-center ">
        <Typography className="m-3" id="modal-title" variant="h6" component="h2">
          Add Progress
        </Typography>
        <select
    className="my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 border-slate-600 block w-full p-2.5"
    value={project}
    onChange={(e) => {  
      const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedId = selectedOption.getAttribute('data-id');
      setproject(selectedOption.value)
      if(typeof selectedId==="string")
      setprojectid(selectedId);
    }}
  >
    <option value="">Projects</option>
    {projects?.map((x: project) => {
      return (
        <option key={x.id} value={`${x.title}`} data-id={x.id}>
          {x.title}
        </option>
      );
    })}
  </select>
  <TextField className="m-[5px]"  sx={{
                   marginY: '10px' ,
                  '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                          borderColor: 'black', 
                      },}}} id="outlined-basic" onChange={(e)=>setprogress(e.target.value)}   label="drive_link" variant="outlined" />
  <Button onClick={Addprogress} variant="contained">Add Link</Button>
  </div>
      </Box>
    </Modal>
    )
  };
  