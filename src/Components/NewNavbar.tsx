
import React, { useState, ReactNode } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem, Snackbar, IconButton } from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { userstate } from "../store/userState";
import {useGoogleAuth} from "../hooks/googleLogin";
import { togglestate } from "../store/toggle";
import Sidebar from "./SideBar";
import { mentorrequest } from "../types/mentor";
import { MentorRequestsModal, DriveModal } from "./Modals";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "../imported_components/ui/resizable-navbar";

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

const NewNavbar: React.FC = () => {
  const [isMentorRequestOpen, setMentorRequestOpen] = useState(false);
  const [isDriveRequestOpen, setDriveRequestOpen] = useState(false);
  const [isSuccessSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [isMentorRequestSnackbarOpen, setMentorRequestSnackbarOpen] = useState(false);
  const [mentors, setMentors] = useState<mentorrequest[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [user] = useRecoilState(userstate);
  const setToggle = useSetRecoilState<boolean | null>(togglestate);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const googleLogin = useGoogleAuth();
  const fetchMentorRequests = async () => {
    const token = localStorage.getItem("jwt_token");
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
        const response = await axios.post(
          `${BASE_URL}/tobementor`,
          {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Mentors", link: "/mentors" },
    { name: "Projects", link: "/projects" },
    { name: "How it works", link: "/how-it-works" },
    { name: "Past Programs", link: "/pastprogram" },
    { name: "Ideas", link: "/ideas" },
    { name: "Help", link: "/help" },
  ];
  

  return (
    <div>
      <ResizableNavbar className="fixed top-0">
        <NavBody>
          {/* <NavbarLogo /> */}
          <NavItems items={navItems} />
          {!localStorage.getItem("access_token") ? (
            <NavbarButton onClick={() => googleLogin()}>
              LOG IN
            </NavbarButton>
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
                    <MenuItem onClick={() => { setDriveRequestOpen(true); }}>Add Progress</MenuItem>
                  )}
                  <MenuItem onClick={() => { setAnchorEl(null); 
                    localStorage.removeItem("access_token"); 
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("jwt_token");
                  }}>Logout
                  </MenuItem>
                </Menu>
              </div>
            )
          )}
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <NavItems items={navItems} onItemClick={() => setIsOpen(false)} />
            {!localStorage.getItem("access_token") ? (
              <NavbarButton onClick={() => { navigate("/login"); setIsOpen(false); }}>
                LOG IN
              </NavbarButton>
            ) : (
              user && (
                <div className="flex flex-col items-start space-y-2">
                  <Button onClick={() => { navigate("/profileview"); setIsOpen(false); }}>Profile</Button>
                  {user.role === "1" && (
                    <Button onClick={() => { handleMentorRequest(); setIsOpen(false); }}>Mentor Request</Button>
                  )}
                  {user.role === "scrummaster" && (
                    <Button onClick={() => { fetchMentorRequests(); setMentorRequestOpen(true); setIsOpen(false); }}>Requests</Button>
                  )}
                  {user.role === "2" && (
                    <Button onClick={() => { setDriveRequestOpen(true); setIsOpen(false); }}>Add Progress</Button>
                  )}
                  <Button onClick={() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("jwt_token");
                    navigate("/login");
                    setIsOpen(false);
                  }}>Logout</Button>
                </div>
              )
            )}
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
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
      <Sidebar onClose={closeSidebar} />
    </div>
  );
};

export default NewNavbar;
