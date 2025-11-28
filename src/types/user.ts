import project from "./project";
export default interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role?: string;
    year?: string;
    branch?: string;
    phonenumber?: number;
    githublink?: string;
    image: string;
    gender: string;
    projects?: project[];
  }