import { useEffect, useState } from 'react';
import { Button, TableContainer, TextField } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Project from '../types/project';
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import { Proposal } from '../types/proposal';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export function ProjectTables() {
    const [projects,setProjects]= useState<Project[]>();
    const [open, setOpen] = useState(false);
    const [link,setlink]=useState("");
    const [id,setid]=useState("");
    useEffect(() => {
      const getProjects = async () => {
        const response = await axios.get(`${BASE_URL}/projects`);
        console.log(response.data)
        setProjects(response.data);
      };
      getProjects();
  
    },[]);
    const updateProject = async (id:string) => {
      const token = localStorage.getItem('jwt_token');
      try {
          const response = await axios.put(`${BASE_URL}/update_project/`, {
            "id": id,
            "link":link
          }, {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
          alert(response.data.message);
          setProjects(response.data.projects);
          setlink("");
          setOpen(false)
      } catch (error) {
        alert(' Error or Server Unreachable');
      }
  };
    return (
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Progress</StyledTableCell>
              <StyledTableCell align="right">Add to Past Program</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects && projects.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">
                <a href={row.progress} target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" color="primary">
                    Progress
                    </Button>
                  </a>
              </StyledTableCell>
                <StyledTableCell align="right">
                    <Button variant="contained" color="primary"
                    onClick={() => {
                      setOpen(true)
                      setid(row.id)
                    }}
                    >
                      Add
                    </Button>
                    <Transition in={open} timeout={200}>
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
                          entering: { opacity: 1, backdropFilter: "blur(1px)" },
                          entered: { opacity: 1, backdropFilter: "blur(1px)" },
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
                      transition: `opacity 100ms`,
                      ...{
                        entering: { opacity: 1 },
                        entered: { opacity: 1 },
                      }[state],
                    }}
                  >
                    <div className="text-blue-600 text-[20px] mx-3 font-sans2">
                     Add Github Link
                    </div>
                    <DialogContent>
                    <TextField className="m-[5px]"  sx={{
                   marginY: '10px' ,
                  '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                          borderColor: 'black', 
                      },}}} id="outlined-basic" onChange={(e)=>setlink(e.target.value)} value={link}  label="drive_link" variant="outlined" />
  <Button onClick={()=>updateProject(id)} variant="contained">Add Link</Button>
                    </DialogContent>
                  </ModalDialog>
                </Modal>
              )}
            </Transition>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
export function CustomizedTables({ proposals, updateproposal }: { proposals: Proposal[], updateproposal: (id: string, completed: boolean,mentorid:string) => void }) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Drive</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proposals.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                {row.status ? (
                  <Button variant="contained" onClick={() => updateproposal(row.id, row.status,row.mentorid)}>Accepted</Button>
                ) : (
                  <Button variant="contained" onClick={() => updateproposal(row.id, row.status,row.mentorid)}>Pending</Button>
                )}
              </StyledTableCell>
  
                <StyledTableCell align="right">
                  <a href={row.drive} target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" color="primary">
                      Visit Drive
                    </Button>
                  </a>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  