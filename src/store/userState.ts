import { atom, selector } from "recoil";
import User from "../types/user";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
export const userstate = atom<User | null>({
  key: "user",
  default: selector({
    key:"authentication", 
    get: async()=>{
        try{
        const userinfo = await axios.get(`${BASE_URL}/token`, {
          headers:{
         'access-token': localStorage.getItem("access_token"),
         'refresh-token': localStorage.getItem("refresh_token")
          }
        });
        if (userinfo.data.success) {
          localStorage.setItem("access_token", userinfo.data.access_token);
          localStorage.setItem("jwt_token",userinfo.data.jwt_token);
         return userinfo.data.user
         
        } else {
          localStorage.removeItem("access_token");
          return null
        }
      }catch(error){
        console.log("Some error Occured : " ,error);
        localStorage.removeItem("access_token");
        return null
      }
    }
  }),
});
