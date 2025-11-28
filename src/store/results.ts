import axios from "axios";
import { atom, selector } from "recoil";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
export const resultstate = atom<boolean | null>({
  key: "result",
  default: selector({
    key:"results",
    get:async()=>{
      const result_state = await axios.get(`${BASE_URL}/results`)
      return result_state.data
    }
  }),
});
