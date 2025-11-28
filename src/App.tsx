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
import Loading from "./Components/NewLoading.tsx";
import { Suspense } from "react";
import Navbar from "./Components/NewNavbar.tsx";
import NewNotFound from "./Components/NewNotFound.tsx";
import Profileview from "./Components/Profileview.tsx";
import Projectsv2 from "./pages/Projectsv2.tsx";


const App = () => {
  const user = useRecoilValueLoadable(userstate);

  if (user.state === "loading") {
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
              <Route path="/login" element={<Login />} />
              <Route path="/pastprogram" element={<Programs />} />
              <Route path="/" element={<Home />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/projects" element={<Projectsv2 />} />

              <Route path="/help" element={<Help />} />
              <Route path="/ideas" element={<Idea />} />
              <Route path="/how-it-works" element={<Timeline />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/addproject" element={<ProjectForm />} />
              <Route path="*" element={<NewNotFound />} />
              <Route path="/profileview" element={<Profileview />} />
            </Routes>
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;

