import React, { useState } from "react";
import { useRecoilValue,useRecoilState} from "recoil";
import { togglestate } from "../store/toggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userstate } from "../store/userState";
import { TextField ,Box,Button} from "@mui/material";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const Profileview: React.FC = () => {
  const [user, setuser] = useRecoilState(userstate);
  useEffect(() => {
    const getuser = async () => {
      if (user) {
          try {
              const token = localStorage.getItem('jwt_token');
              const userinfo = await axios.get(`${BASE_URL}/userinfo/${user.id}`
              , {
                  headers: {
                      'Authorization': `Bearer ${token}` 
                  }
              });
              if (userinfo.data.success != "true") {
                setFirstName(user.first_name);
                setLastName(user.last_name);
              } else {
                setFirstName(userinfo.data.user.first_name);
                setLastName(userinfo.data.user.last_name);
                setSelectedBranch(userinfo.data.user.branch);
                setGithubLink(userinfo.data.user.githublink);
                setPhoneNumber(userinfo.data.user.phonenumber);
                setSelectedGender(userinfo.data.user.gender);
                setSelectedYear(userinfo.data.user.year);
                localStorage.setItem("jwt_token",userinfo.data.token);
              }
          } catch (error) {
              console.error("Error fetching user info:", error);
          }
      }
  };
    getuser();
  }, [user]);
  const navigate = useNavigate();
  const toggle = useRecoilValue(togglestate);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  return (
    <div
      className={`overflow-x-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
    >
      <div
        className=" flex justify-center md2:h-[180px] h-[120px] w-screen md2:absolute md2:top-0 md2:left-0 z-1 "
        style={{ backgroundColor: "#1976d2" }}
      ></div>
      <div className=" md2:my-[120px] bg-white md2:w-[808px] shadow-custom md2:absolute md2:top-0 md2:right-1/2 md2:transform md2:translate-x-1/2 z-0">
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Profile
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Your Winter of Code's Official Account Details
            </p>
          </div>
          <form
            action="#"
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <TextField
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={firstName}
                    defaultValue={firstName}
                    InputProps={{ readOnly: true }}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <TextField
                    type="text"
                    InputProps={{ readOnly: true }}
                    name="last-name"
                    id="last-name"
                    required
                    autoComplete="family-name"
                    value={lastName}
                    defaultValue={lastName}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="years"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Year
                </label>
                <select
                  id="years"
                  name="selectedYear"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={selectedYear}
                  defaultValue={selectedYear}
                  disabled
                >
                  <option value="0">Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="selectedGender"
                  defaultValue={selectedGender}
                  value={selectedGender}
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="branches"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Branch
                </label>
                <select
                  id="branches"
                  name="selectedBranch"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  defaultValue={selectedBranch}
                  value={selectedBranch}
                  disabled
                >
                  <option value="">Branch</option>
                  <option value="ch">Chemical Engineering</option>
                  <option value="ai">
                    Artificial Intelligence and Data Science
                  </option>
                  <option value="ee">Electrical Engineering</option>
                  <option value="me">Mechanical Engineering</option>
                  <option value="cse">Computer Science and Engineering</option>
                  <option value="ci">Civil Engineering</option>
                  <option value="mt">Materials Engineering</option>
                  <option value="bsbe">Bioscience and Biotechnology</option>
                  <option value="es">Engineering Science</option>
                  <option value="ph">Bachelor of Science (Physics)</option>
                  <option value="cy">Bachelor of Science (Chemistry)</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="github"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Github Link
                </label>
                <div className="mt-2.5">
                  <TextField
                    type="github"
                    name="github"
                    id="github"
                    autoComplete="github"
                    InputProps={{ readOnly: true }}
                    value={githubLink}
                    defaultValue={githubLink}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="relative mt-2.5">
                  <TextField
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    InputProps={{ readOnly: true }}
                    autoComplete="tel"
                    value={phoneNumber}
                    defaultValue={phoneNumber}
                    required
        
                  />
                </div>
              </div>
            </div>

            <Box mt={4} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={() => navigate("/profile")}>Update Profile</Button>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Profileview;
