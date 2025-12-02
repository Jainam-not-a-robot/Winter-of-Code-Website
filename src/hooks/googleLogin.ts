import { useRecoilState } from "recoil";
import { userstate } from "@/store/userState";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const useGoogleAuth = () => {
  const [user, setUser] = useRecoilState(userstate);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/google`, { code });
        const data = response.data;

        if (data.success) {
          const u = data.user;

          setUser({
            email: u.email,
            id: u.id,
            first_name: u.given_name,
            last_name: u.family_name,
            image: u.picture,
            gender: u.gender,
          });

          localStorage.setItem("access_token", data.token);
          localStorage.setItem("refresh_token", data.refresh);
          localStorage.setItem("jwt_token", data.jwt_token);

          navigate("/profile");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Google login failed:", error);
        alert("Something went wrong with Google login.");
      }
    },
  });

  return googleLogin;
};
