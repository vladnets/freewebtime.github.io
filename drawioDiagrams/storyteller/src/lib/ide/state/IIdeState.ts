import { IProject } from './IProject';
import { INavbarData } from './INavbarData';

export interface IIdeState {
  Navbar: INavbarData;
  Project?: IProject;
}