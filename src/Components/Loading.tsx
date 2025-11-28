import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { togglestate } from '../store/toggle';
import { useRecoilValue } from 'recoil';
const Loading=()=>{
  const toggle = useRecoilValue(togglestate);
    return(
      <div
      className={`overflow-x-hidden  ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
    >
    <div className="w-screen h-screen flex justify-center  mt-[300px] ">
      <Box sx={{ display: 'flex' }} >
        <CircularProgress />
      </Box>
      </div>
      </div>
    )
}
export default Loading;