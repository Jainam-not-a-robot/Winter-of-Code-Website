import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { togglestate } from '../store/toggle';
import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import Switch from '@mui/material/Switch';
import { userstate } from '../store/userState';
import { wocstate } from '../store/woc';
import { resultstate } from '../store/results';
import axios from 'axios';
import NotFound from './NotFound';
import { ProjectTables } from './Tables';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface CurrentProgramProps {
  name: string;
}




const CurrentProgram: React.FC<CurrentProgramProps> = ({ name }) => {
  return (
    <div>
      <ProjectTables />
      <br />
      <hr />
      <hr />
      <br />
      <div className="flex justify-center">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-xxl sm:tracking-tight">
          {name}
        </h2>
      </div>
      <br />
      <div className='flex justify-center '>
        <span className=" mx-4">
          <Link to="/addproject">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <span className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true">+</span>
              Add Projects
            </button>
          </Link>
        </span>
        
      </div>
    </div>
  )
}

const AdminPortal: React.FC = () => {
  const toggle = useRecoilValue(togglestate);
  const user = useRecoilValue(userstate);
  const [woc,setwoc]= useRecoilState(wocstate);
  const [results,setresults]=useRecoilState(resultstate)
  const changewoc = async () => {
    try {
      const jwtToken = localStorage.getItem('jwt_token');
      const response = await axios.put(`${BASE_URL}/changestatus`, {
      }, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      });
      setwoc(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const changeresults = async () => {
    try {
      const jwtToken = localStorage.getItem('jwt_token');
      const response = await axios.put(`${BASE_URL}/changeresult`, {
      }, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      });
      setresults(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    user && user.role == "scrummaster" ? (
    <div className={` overflow-x-hidden h-screen w-screen ${toggle === null ? "" : toggle ? "contract" : "expand"}`}>
      <div className="w-full h-[180px] bg-[#1976d2] " />
      <div className="relative flex justify-center bg-white w-full max-w-4xl shadow-custom mx-auto z-0">
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden  blur-3xl sm:top-[-20rem]" aria-hidden="true">
            <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            {user && (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hi {user.first_name} {user.last_name}!</h2>
              </>
            )}
            <p className="m-2 text-lg leading-8 text-gray-600">
              Manage all of the Winter of Code Programs here.
            </p>
          </div>
          <br /><br />
          <div className="lg:flex lg:items-center lg:justify-between mx-4">
            <div className="min-w-0 flex-1">
              <div className="mt-1 flex flex-col  justify-center sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex justify-center  items-center text-sm text-gray-500">
                  <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  Scrummaster
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  Devlup Labs
                </div>
              </div>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
            </div>
          </div>
          <br /><br />
          <div className='w-2/4 mx-auto shadow-md'>
          <div className='flex justify-between  m-3'>
        
          <div className='font-bold mx-2 pt-2'>Start WOC</div>
            <div>
          <Switch checked={woc ?? false} onChange={changewoc}/>
            </div>
            </div>
            <div className='flex justify-between m-3'>
            <div className='font-bold mx-2 pt-2'>Announce Results</div>
            <div>
              </div>
            <Switch checked={results ?? false} onChange={changeresults}/>
            </div>
            </div>
          <div className="flex justify-center">
            <div className="lg:flex lg:items-center lg:justify-between mx-4">
              <div className="min-w-0 flex-1">
                <hr />
                <hr />
                <br />
                <div className='flex justify-center'>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl my-2">Current Programs</h3>
                </div>
                <CurrentProgram 
                  name="Winter of Code 2024" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ):(
      <div className={` overflow-x-hidden h-screen w-screen ${toggle === null ? "" : toggle ? "contract" : "expand"}`}>
       <NotFound/>
      </div>
    )
  );
};

export default AdminPortal;
