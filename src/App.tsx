import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./Components/Home";
import Mentors from "./Components/Mentors";
import Help from "./Components/Help";
import Timeline from "./Components/Timeline";
import Projects from "./Components/Projects";
import Profile from "./Components/Profile";
import Programs from "./Components/Programs";
import Idea from "./Components/Idea.tsx";
import Myprojects from "./Components/Myprojects.tsx";
import Proposal from "./Components/Proposals.tsx";
import AdminPortal from "./Components/Adminportal.tsx";
import ProjectForm from "./Components/Projectform.tsx";

import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { refreshUserState, userstate } from "./store/userState.ts";

import Loading from "./Components/NewLoading.tsx";
import { Suspense, useEffect } from "react";
import Navbar from "./Components/NewNavbar.tsx";
import NewNotFound from "./Components/NewNotFound.tsx";
import Profileview from "./Components/Profileview.tsx";
import Projectsv2 from "./pages/Projectsv2.tsx";

import HelpContactv2 from "./pages/HelpContactv2.tsx";
import PastProgramv2 from "./pages/pastprogramv2.tsx";


const App = () => {
  // NEW: synchronous user load (from PR)
  const user = useRecoilValue(userstate);

  // Your logic + her logic merged cleanly
  const setUser = useSetRecoilState(userstate);
  const refresh = useRecoilValueLoadable(refreshUserState);

  useEffect(() => {
    if (refresh.state === "hasValue") {
      setUser(refresh.contents);
    } else if (refresh.state === "hasError") {
      console.error("Failed to refresh user:", refresh.contents);
      setUser(null);
    }
  }, [refresh.state, refresh.contents, setUser]);

  // Keep the correct loading gate from main
  if (refresh.state === "loading") {
    return <Loading />;
  }

  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Navbar />
          <div>
            <Routes>
              <Route path="/proposals" element={<Proposal />} />
              <Route path="/myprojects" element={<Myprojects />} />

              {/* NEW updated past programs */}
              <Route path="/pastprogram" element={<PastProgramv2 />} />

              <Route path="/" element={<Home />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/projects" element={<Projectsv2 />} />

              {/* Correct help route */}
              <Route path="/help" element={<HelpContactv2 />} />

              <Route path="/ideas" element={<Idea />} />
              <Route path="/how-it-works" element={<Timeline />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/addproject" element={<ProjectForm />} />
              <Route path="/profileview" element={<Profileview />} />
              <Route path="*" element={<NewNotFound />} />
            </Routes>
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
