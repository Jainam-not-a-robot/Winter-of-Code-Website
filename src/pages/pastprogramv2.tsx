import React from "react";
import logo from "../assets/devlup.png";
import { togglestate } from "../store/toggle";
import { useRecoilValue } from "recoil";
import ProjectCard from "../Components/newProjectcard";
import { useState, useEffect } from "react";
import axios from "axios";
import { program } from "../types/program";



const Programs: React.FC = () => {
  const [programs, setprograms] = useState<program[] | undefined>(undefined);
  const [temp, settemp] = useState("");
  const [query, setquery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  // ----------------- BACKEND: uncomment to enable server fetch -----------------
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
  
    (async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/pastprograms`);
        if (!mounted) return;
        setprograms(resp.data);
      } catch (err: any) {
        console.error("Failed to fetch past programs", err);
        if (!mounted) return;
        setError(
          err?.response?.data?.message || err?.message || "Failed to load programs. Please try again later."
        );
        setprograms([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
  
    return () => {
      mounted = false;
    };
  }, [BASE_URL]);
 


  // Small helper — safe lowercase
  const q = (query ?? "").toLowerCase();

  const filteredPrograms = (programs ?? []).filter((x) => {
    return (
      x.title.toLowerCase().includes(q) ||
      x.mentor.toLowerCase().includes(q) ||
      x.mentee.some((m) => m.toLowerCase().includes(q)) ||
      x.year.toLowerCase().includes(q) ||
      x.description.toLowerCase().includes(q) ||
      x.technology.toLowerCase().includes(q)
    );
  });

  const toggle = useRecoilValue(togglestate);

  // quick tag helper
  const applyTag = (tag: string) => {
    settemp(tag);
    setquery(tag);
  };
  // dummy data
  useEffect(() => {
    if (programs === undefined) {
      setprograms([
       
        {
          title: "Weather App",
          mentor: "Riya Sharma",
          year: "2024",
          description: "A weather forecast web app using OpenWeather API.",
          technology: "React",
          mentee: ["Aman", "Rohit"],
          codelink: "https://github.com/example/weather"
        }
      ]);
    }
  }, [programs]);
  

  return (
    <div
      className={` -mt-14 min-h-screen transition-all duration-300 ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
    >
      {/* HERO */}
      <section className="bg-gradient-to-r from-[#071014] to-[#07172a] text-white pt-20 sm:pt-28 md:pt-32 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text column */}
            <div className="lg:col-span-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full sm:w-auto text-center sm:text-left">
                  <h1
                    className="
                      -mt-10
                      pb-5 sm:pb-[20px]
                      text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                      font-extrabold leading-tight
                      bg-clip-text text-transparent bg-gradient-to-b from-[#DCE5F5] to-[#00C6FF]
                      drop-shadow-[0_2px_8px_rgba(0,200,255,0.35)]
                      sm:drop-shadow-[0_3px_12px_rgba(0,200,255,0.45)]
                      md:drop-shadow-[0_4px_18px_rgba(0,200,255,0.55)]
                      mx-auto sm:mx-0
                    "
                  >
                    Past Programs of WOC
                  </h1>

                  <p className=" sm:mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto sm:mx-0">
                    Search and Discover Projects
                  </p>
                </div>
              </div>
            </div>

            {/* Logo column */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-3 sm:p-4 shadow-2xl flex items-center justify-center border-2 border-[#00C6FF] drop-shadow-[0_2px_4px_rgba(0,200,255,0.35)]
                sm:drop-shadow-[0_3px_6px_rgba(0,200,255,0.45)]
                md:drop-shadow-[0_4px_8px_rgba(0,200,255,0.55)]">
                <img src={logo} alt="WOC logo" className="object-contain w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="bg-transparent backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
          {/* Search bar */}
          <div className=" -ml-8 -mt-8 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                aria-label="Search programs"
                placeholder="Search Projects"
                className="
                  w-full p-3 sm:p-2 rounded-xl
                  bg-white
                  outline-none
                  placeholder:text-[#1A2333]
                  text-[#0D1117]
                  hover:bg-[#DCE5F5]
                  border-2
                  border-[#00C6FF]
                  shadow-[0_0_15px_rgba(56,189,248,0.25)]
                  caret-black
                  transition
                "
                value={temp}
                onChange={(e) => settemp(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setquery(temp)}
              />

              {temp && (
                <button
                  aria-label="clear input"
                  onClick={() => settemp("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setquery(temp)}
                className="bg-[#00C6FF] hover:bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg font-semibold shadow w-full sm:w-auto"
              >
                Search
              </button>
              <button
                onClick={() => {
                  settemp("");
                  setquery("");
                }}
                className="px-3 py-2 border rounded-lg text-slate-300 border-slate-700 hover:bg-slate-800 w-full sm:w-auto"
              >
                Clear
              </button>
            </div>
          </div>

          {/* status / grid */}
          <div className="mt-6">
            {loading ? (
              <div className="py-20 text-center">
                <div className="inline-block px-6 py-3 rounded bg-[#071016] text-slate-300 shadow">Loading programs...</div>
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <div className="inline-block p-6 rounded bg-[#2a2f33] text-red-300 border border-red-600">
                  <div className="font-semibold mb-2">Unable to load programs</div>
                  <div className="text-sm">{error}</div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filteredPrograms ?? []).length === 0 ? (
                  <div className="col-span-full p-8 bg-[#071016] rounded-lg border border-slate-700 text-center text-slate-300">
                    No programs found. Try clearing filters or search.
                  </div>
                ) : (
                  filteredPrograms.map((x) => (
                    <div key={x.title} className="flex justify-center">
                      <div className="w-full max-w-md">
                        <ProjectCard
                          year={x.year}
                          mentor={x.mentor}
                          description={x.description}
                          title={x.title}
                          mentee={x.mentee}
                          technology={x.technology}
                          codelink={x.codelink}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <style >{``}</style>
    </div>
  );
};

export default Programs;
