import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { userstate } from "../store/userState";
import { useGoogleAuth } from "../hooks/googleLogin";
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

  const closeSidebar = () => setToggle(false);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setToggle(null);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("jwt_token");
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Mentors", link: "/mentors" },
    { name: "Projects", link: "/projects" },
    { name: "How it works", link: "/how-it-works" },
    { name: "Past Programs", link: "/pastprogram" },
    // { name: "Ideas", link: "/ideas" },
    { name: "Help", link: "/help" },
  ];

  return (
    <div>
      <ResizableNavbar className="fixed top-2">
        {/* Desktop Navigation */}
        <NavBody className="bg-arctic-steel/80 backdrop-blur-md border-b border-white/5">
          <NavItems items={navItems} />
          {!localStorage.getItem("access_token") ? (
            <NavbarButton 
              onClick={() => googleLogin()}
              className="bg-gradient-to-r from-ice-surge to-frost-ember text-deep-night font-semibold hover:shadow-[0_0_20px_rgba(0,198,255,0.4)]"
            >
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
                  className="cursor-pointer border-2 border-ice-surge/50 hover:border-ice-surge transition-colors"
                  alt={user.first_name}
                  src={user.image}
                  sx={{ width: 40, height: 40 }}
                />
                <Menu
                  id="profile-menu"
                  aria-labelledby="profile-menu-button"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#1A2333",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      mt: 1,
                      "& .MuiMenuItem-root": {
                        color: "#DCE5F5",
                        fontSize: "14px",
                        "&:hover": {
                          backgroundColor: "rgba(0, 198, 255, 0.1)",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem onClick={() => { setAnchorEl(null); navigate("/profileview"); }}>
                    Profile
                  </MenuItem>
                  {user.role === "1" && (
                    <MenuItem onClick={handleMentorRequest}>Mentor Request</MenuItem>
                  )}
                  {user.role === "scrummaster" && (
                    <MenuItem onClick={() => { fetchMentorRequests(); setMentorRequestOpen(true); }}>
                      Requests
                    </MenuItem>
                  )}
                  {user.role === "2" && (
                    <MenuItem onClick={() => { setDriveRequestOpen(true); }}>
                      Add Progress
                    </MenuItem>
                  )}
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ color: "#f87171 !important" }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )
          )}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="bg-transparent backdrop-blur-md border-b border-white/5">
          <MobileNavHeader>
            <a href="/" className="text-frost-white font-bold text-lg">
              Winter of Code
            </a>
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            className="bg-arctic-steel border border-white/10 rounded-xl mt-2 shadow-2xl"
          >
            {/* Navigation Links */}
            <div className="flex flex-col space-y-1 w-full">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-frost-white hover:bg-ice-surge/10 rounded-lg transition-colors text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10 my-2"></div>

            {/* Auth Section */}
            {!localStorage.getItem("access_token") ? (
              <button
                onClick={() => { googleLogin(); setIsOpen(false); }}
                className="w-full py-3 px-4 bg-gradient-to-r from-ice-surge to-frost-ember text-deep-night font-semibold rounded-lg text-sm"
              >
                LOG IN
              </button>
            ) : (
              user && (
                <div className="flex flex-col space-y-1 w-full">
                  <button
                    onClick={() => { navigate("/profileview"); setIsOpen(false); }}
                    className="w-full text-left px-4 py-3 text-frost-white hover:bg-ice-surge/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    Profile
                  </button>
                  {user.role === "1" && (
                    <button
                      onClick={() => { handleMentorRequest(); setIsOpen(false); }}
                      className="w-full text-left px-4 py-3 text-frost-white hover:bg-ice-surge/10 rounded-lg transition-colors text-sm font-medium"
                    >
                      Mentor Request
                    </button>
                  )}
                  {user.role === "scrummaster" && (
                    <button
                      onClick={() => { fetchMentorRequests(); setMentorRequestOpen(true); setIsOpen(false); }}
                      className="w-full text-left px-4 py-3 text-frost-white hover:bg-ice-surge/10 rounded-lg transition-colors text-sm font-medium"
                    >
                      Requests
                    </button>
                  )}
                  {user.role === "2" && (
                    <button
                      onClick={() => { setDriveRequestOpen(true); setIsOpen(false); }}
                      className="w-full text-left px-4 py-3 text-frost-white hover:bg-ice-surge/10 rounded-lg transition-colors text-sm font-medium"
                    >
                      Add Progress
                    </button>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              )
            )}
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>

      {/* Modals */}
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

      {/* Snackbars */}
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
