import { useRecoilValue, useRecoilState } from "recoil";
import { togglestate } from "../store/toggle";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userstate } from "../store/userState";
import Card from "./Card";
import '../App.css'
const Login = () => {
  const navigate = useNavigate();
  const toggle = useRecoilValue(togglestate);
  const [user, setuser] = useRecoilState(userstate);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const login=()=>{
    
  }
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const userinfo = await axios.post(`${BASE_URL}/auth/google`, { code });
      if (userinfo.data.success) {
        setuser({
          email: userinfo.data.user.email,
          id: userinfo.data.user.id,
          first_name: userinfo.data.user.given_name,
          last_name: userinfo.data.user.family_name,
          image: userinfo.data.user.picture,
          gender: userinfo.data.user.gender,
        });
        localStorage.setItem("access_token", userinfo.data.token);
        localStorage.setItem("refresh_token", userinfo.data.refresh);
        localStorage.setItem("jwt_token", userinfo.data.jwt_token);
        navigate("/profile");
      } else {
        alert(userinfo.data.message);
      }
    },
    flow: "auth-code",
  });

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tileSize = size.width / 2;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="bg-[url(./assets/bg-snow.png)] bg-repeat"
      style={{ backgroundSize: `${tileSize}px ${tileSize}px` }}
    >
      <div
        className={`w-screen h-screen mt-[140px] flex justify-center overflow-x-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"
          }`}
      >
        <Card className="h-[80%] max-h-[420px] w-[85%] max-w-[350px] p-6 flex flex-col items-center justify-center gap-4">

          <h2 className="text-2xl text-[#E6ECF5] font-semibold mb-4 shiny-icy">Login</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-xl bg-[#1e3a5f]/30 border border-[#87bfff]/40 text-white focus:outline-none focus:border-[#c3e6ff] shadow-[0_0_8px_rgba(135,191,255,0.3)]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-[#1e3a5f]/30 border border-[#87bfff]/40 text-white focus:outline-none focus:border-[#c3e6ff] shadow-[0_0_8px_rgba(135,191,255,0.3)]"
          />

          <button
            onClick={login}
            className="w-full p-3 rounded-xl bg-[#1e3a5f] text-white border border-[#87bfff] hover:shadow-[0_0_12px_rgba(135,191,255,0.8)] hover:border-[#c3e6ff] transition"
          >
            Login
          </button>
          <div className="w-full flex items-center gap-2 my-2">
            <div className="flex-1 h-[1px] bg-white/20"></div>
            <span className="text-white/70 text-sm">or</span>
            <div className="flex-1 h-[1px] bg-white/20"></div>
          </div>
          <button
            onClick={googleLogin}
            className="w-full mt-2"
          >
            <button
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>

          </button>

        </Card>

      </div>
    </div>
  );
};

export default Login;
