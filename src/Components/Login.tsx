import { useRecoilValue, useRecoilState} from "recoil";
import { togglestate } from "../store/toggle";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { userstate } from "../store/userState";
const Login = () => {
  const navigate = useNavigate();
  const toggle = useRecoilValue(togglestate);
  const [user, setuser] = useRecoilState(userstate);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const userinfo = await axios.post(`${BASE_URL}/auth/google`, {
        code,
      });
      if (userinfo.data.success) {
        setuser({
          email: userinfo.data.user.email,
          id: userinfo.data.user?.id,
          first_name: userinfo.data.user.given_name,
          last_name: userinfo.data.user.family_name,
          image: userinfo.data.user.picture,
          gender:userinfo.data.user.gender
        });
        console.log(user);
        localStorage.setItem("access_token", userinfo.data.token);
        localStorage.setItem("refresh_token", userinfo.data.refresh);
        localStorage.setItem("jwt_token",userinfo.data.jwt_token);
        navigate("/profile");
      } else {
        alert(userinfo.data.message);
      }
    },
    flow: "auth-code",
  });

  return (
    <div
      className={` w-screen h-screen mt-[160px]  flex justify-center  overflow-x-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
    >
      <div className="w-[300px] h-[00px] py-20 shadow-custom flex justify-center items-center ">
      
        <GoogleButton onClick={login} />
        </div>
    </div>
  );
};
export default Login;
