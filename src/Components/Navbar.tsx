import * as React from "react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Avatar , Button, Menu, MenuItem, Snackbar, IconButton } from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { userstate } from "../store/userState";
import { togglestate } from "../store/toggle";
import Sidebar from "./SideBar";
import { mentorrequest } from "../types/mentor";
import { MentorRequestsModal,DriveModal } from "./Modals";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const SnackbarAction = ({ onClose }: { onClose: () => void }) => (
  <React.Fragment>
    <Button color="secondary" size="small" onClick={onClose}>
      UNDO
    </Button>
    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
);

const Navbar: React.FC = () => {
  const [isMentorRequestOpen, setMentorRequestOpen] = useState(false);
  const [isDriveRequestOpen, setDriveRequestOpen] = useState(false);
  const [isSuccessSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [isMentorRequestSnackbarOpen, setMentorRequestSnackbarOpen] = useState(false);
  const [mentors, setMentors] = useState<mentorrequest[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const user = useRecoilValue(userstate);
  const setToggle = useSetRecoilState<boolean | null>(togglestate);
  const navigate = useNavigate();

  const fetchMentorRequests = async () => {
    const token = localStorage.getItem("jwt_token")
    try {
        const response = await axios.get(`${BASE_URL}/getrequests`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        setMentors(response.data);
    } catch (error) {
        console.error("Error fetching mentor requests:", error);
    }
};


  const handleMentorAccept = async (id: string) => {
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await axios.post(
        `${BASE_URL}/acceptmentor`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from server:", response.data);
      fetchMentorRequests();
      setMentorRequestSnackbarOpen(true);
    } catch (error) {
      console.error("Error accepting mentor request:", error);
    }
  };
  const handleMentorRequest = async () => {
    if (user) {
        try {
          const token = localStorage.getItem("jwt_token");
            const response = await axios.post(`${BASE_URL}/tobementor`, {
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSuccessMessage(response.data.msg);
            setSuccessSnackbarOpen(true);
            setAnchorEl(null);
        } catch (error) {
            console.error("Error making mentor request:", error);
        }
    }
};


  const toggleSidebar = () => setToggle((prev) => (prev === null ? true : !prev));
  const closeSidebar = () => setToggle(false);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setToggle(null);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <div>
      <div className="flex items-center justify-between h-[64px] shadow-slate-700 shadow-md" style={{ backgroundColor: "#1976d2" }}>
        <div className="flex items-center mx-12">
          <div className="mx-2" onClick={toggleSidebar}>
            <RxHamburgerMenu className="h-12 w-5 text-white stroke-1 hover:cursor-pointer" />
          </div>
          <div className="mx-2 text-white font-sans text-[0px] md:text-[22px]">
            Winter of Code
          </div>
        </div>
        {!localStorage.getItem("access_token") ? (
          <button onClick={() => navigate("/login")} className="text-white border-white border-[1px] text-[15px] px-5 py-[6px] mx-10 rounded-sm">
            LOG IN
          </button>
        ) : (
          user && (
            <div>
              <Avatar
                id="profile-menu-button"
                aria-controls={anchorEl ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
                onClick={handleMenuOpen}
                className="mx-5 border-2 border-blue-600 w-[60px]"
                alt={user.first_name}
                src={user.image}
              />

              <Menu
                id="profile-menu"
                aria-labelledby="profile-menu-button"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => { setAnchorEl(null); navigate("/profileview"); }}>Profile</MenuItem>
                {user.role === "1" && (
                  <MenuItem onClick={handleMentorRequest}>Mentor Request</MenuItem>
                )}
                {user.role === "scrummaster" && (
                  <MenuItem onClick={() => { fetchMentorRequests(); setMentorRequestOpen(true); }}>Requests</MenuItem>
                )}
                {user.role === "2" && (
                  <MenuItem onClick={() => {  setDriveRequestOpen(true); }}>Add Progress</MenuItem>
                )}
                
                <MenuItem onClick={() => { setAnchorEl(null); 
                  localStorage.removeItem("access_token"); 
                  localStorage.removeItem("refresh_token");
                  localStorage.removeItem("jwt_token");
                  navigate("/login"); 
                  }}>Logout
                  </MenuItem>
              </Menu>
              <DriveModal
              open={isDriveRequestOpen}
              onClose={() => setDriveRequestOpen(false)}
              />
              <MentorRequestsModal
                open={isMentorRequestOpen}
                onClose={() => setMentorRequestOpen(false)}
                mentors={mentors}
                onAccept={handleMentorAccept}
              />

              <Snackbar
                open={isMentorRequestSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setMentorRequestSnackbarOpen(false)}
                message="Accepted Request"
                action={<SnackbarAction onClose={() => setMentorRequestSnackbarOpen(false)} />}
              />

              <Snackbar
                open={isSuccessSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSuccessSnackbarOpen(false)}
                message={successMessage}
                action={<SnackbarAction onClose={() => setSuccessSnackbarOpen(false)} />}
              />
            </div>
          )
        )}
      </div>
      {<Sidebar onClose={closeSidebar} />}
    </div>
  );
};

export default Navbar;
