import axios from "axios";
import { atom, selector } from "recoil";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
export const wocstate = atom<boolean | null>({
  key: "woc",
  default: selector({
    key:"woc_state",
    get:async()=>{
      const woc_state = await axios.get(`${BASE_URL}/woc_status`)
      return woc_state.data
    }
  }),
});
