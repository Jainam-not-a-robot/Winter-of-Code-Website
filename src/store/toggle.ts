import { atom } from "recoil";
export const togglestate = atom<boolean | null>({
  key: "toggle",
  default: null,
});
