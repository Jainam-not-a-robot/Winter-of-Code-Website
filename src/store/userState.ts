import { atom, selector } from "recoil";
import axios from "axios";
import User from "../types/user";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// -----------------------------
// 1. Synchronous user cache load
// -----------------------------
export const userstate = atom<User | null>({
  key: "userstate",
  default: JSON.parse(localStorage.getItem("user") || "null"),
});

// -----------------------------
// 2. Background user/token refresh
// -----------------------------
export const refreshUserState = selector<User | null>({
  key: "refreshUserState",
  get: async () => {
    try {
      const access = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");

      // If no tokens at all → skip
      if (!access || !refresh) {
        return null;
      }

      const response = await axios.get(`${BASE_URL}/token`, {
        headers: {
          "access-token": access,
          "refresh-token": refresh,
        },
      });

      if (response.data.success) {
        // persist updated tokens
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("jwt_token", response.data.jwt_token);

        // persist updated user
        localStorage.setItem("user", JSON.stringify(response.data.user));

        return response.data.user;
      }

      // if server returns success: false → logout
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      return null;
    } catch (err) {
      // network errors → treat as logged out
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      return null;
    }
  },
});
