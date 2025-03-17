import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./Components/Home";
import Mentors from "./Components/Mentors";
import Help from "./Components/Help";
import Timeline from "./Components/Timeline";
import Projects from "./Components/Projects";
import Profile from "./Components/Profile";
import Programs from "./Components/Programs";
import Login from "./Components/Login";
import Idea from "./Components/Idea.tsx";
import Myprojects from "./Components/Myprojects.tsx";
import Proposal from "./Components/Proposals.tsx";
import AdminPortal from "./Components/Adminportal.tsx";
import ProjectForm from "./Components/Projectform.tsx";
import { useRecoilValueLoadable } from "recoil";
import { userstate } from "./store/userState.ts";
import Loading from "./Components/Loading.tsx";
import { Suspense } from "react";
import Navbar from "./Components/Navbar.tsx";
import NotFound from "./Components/NotFound.tsx";
import Profileview from "./Components/Profileview.tsx";

const App = () => {
  const user = useRecoilValueLoadable(userstate);

  if (user.state === "loading") {
    return <Loading />;
  }

  return (
    <div className="relative flex">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <div className="fixed top-0 z-50 w-screen">
            <Navbar />
          </div>
          <Routes>
            <Route path="/proposals" element={<Proposal />} />
            <Route path="/myprojects" element={<Myprojects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pastprogram" element={<Programs />} />
            <Route path="/" element={<Home />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/help" element={<Help />} />
            <Route path="/ideas" element={<Idea />} />
            <Route path="/how-it-works" element={<Timeline />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/addproject" element={<ProjectForm />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/profileview" element={<Profileview />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
