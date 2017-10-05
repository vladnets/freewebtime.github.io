import { Dispatch } from "react-redux";

export interface IMDType {
  Name: string,
  //inputs, outputs...
}

export interface IMetadata {
  Types: IMDType[],
}

export interface IProject{
  Name: string,
  Created: Date,
  Metadata: IMetadata
}

export default interface IAppState {
  Project?: IProject,
  dispatch?: Dispatch<{}>;
}