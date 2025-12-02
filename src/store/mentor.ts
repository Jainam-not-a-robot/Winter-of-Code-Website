import { atom, selector } from "recoil";
import { Mentor } from "../types/mentor";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
export const mentorstate = atom<Mentor[] | null>({
  key: "mentor",
  default: selector({
    key:"getmentors",
    get: async()=>{
        const resp = await axios.get(`${BASE_URL}/project/summary`);
        return resp.data
    }
  }),
});