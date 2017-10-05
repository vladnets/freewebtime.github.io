import { Dispatch } from "react-redux";
import { IProject } from "./IProject";

export interface IAppState {
  StatusText?: string;
  Project?: IProject;
  dispatch?: Dispatch<{}>;
}