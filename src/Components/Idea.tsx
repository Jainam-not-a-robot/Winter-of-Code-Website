import { TextField, Button, Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";
import { userstate } from "../store/userState";

interface idea {
  name: string;
  title: string;
  description: string;
}
const Idea = () => {

  const user = useRecoilValue(userstate);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [ideas, setideas] = useState<idea[]>();
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const create_idea = async () => {
    if (user) {
      const resp = await axios.post(`${BASE_URL}/idea`, {
        name: user?.first_name + " " + user?.last_name,
        title: title,
        description: desc,
      });
      console.log(resp);
      settitle("");
      setdesc("");
    } else 
    {
      alert("login to add idea");
    }
  };
  useEffect(() => {
   const getideas = async () => {
  try {
    const token = localStorage.getItem("jwt_token");

    const resp = await axios.get(`${BASE_URL}/idea`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(resp);
    setideas(resp.data);
  } catch (error) {
    console.error("Error fetching ideas:", error);
  }
};
    getideas();
  }, [BASE_URL]);
    const toggle = useRecoilValue(togglestate);
    console.log(user);
    return (
    <div
    className={`flex justify-center  overflow-x-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
  >
      {user && user.role == "scrummaster" ? (
        <div className="w-screen h-screen overflow-hidden flex justify-center flex-wrap  mt-[130px]">
          {ideas &&
            ideas.map((x: idea) => {
              return (
                <Card
                  style={{
                    borderRadius: "16px",
                    margin:"5px"
                  }}
                  sx={{
                    overflow: "hidden",
                    Width: 700,
                    "@media(max-width: 480px)": {
                      width: "300px",
                      height: "420px",
                    },
                    width: "400px",
                    height: "150px",
                  }}
                >
                  <div className="p-2 font-fontstylish">Title : {x.title}</div>
                  <div className="p-2">Description : {x.description}</div>
                  <div className="p-2">{x.name}</div>
                </Card>
              );
            })}
        </div>
      ) :  (
        <div className="  w-screen h-screen bg-slate-100 flex justify-center">
        <div className=" p-4 my-[130px] font-sans2 shadow-custom bg-white h-[500px]  w-[400px]">
          <div className="flex justify-center text-blue-600 text-[30px]">
            Add Your Idea
          </div>
          <div className="m-10 flex justify-center h-[50px]">
            <TextField
              value={title}
              required
              onChange={(e) => {
                settitle(e.target.value);
              }}
              fullWidth
              id="outlined-basic"
              className="text-[50px] h-[50px]"
              label="Title"
              variant="outlined"
            />
          </div>
          <div className="m-10 flex justify-center">
            <TextField
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
              id="outlined-textarea"
              label="Description"
              placeholder="Description"
              multiline
              rows={5}
              fullWidth
            />
          </div>
          <div className="m-10">
            <Button variant="contained" onClick={create_idea}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
export default Idea;
