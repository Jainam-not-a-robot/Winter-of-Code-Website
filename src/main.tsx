import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RecoilRoot } from "recoil";
const client_id = import.meta.env.VITE_REACT_APP_CLIENT_ID;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
