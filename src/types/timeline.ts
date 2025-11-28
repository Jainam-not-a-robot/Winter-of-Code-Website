import { IconType } from "react-icons/lib";

export interface timeline {
    id: string;
    date: string;
    events: string[];
    completed: boolean;
    logo: IconType;
  }
  export interface unparsedtimeline {
    id: string;
    date: string;
    events: string;
    completed: boolean;
    logo: IconType;
  }