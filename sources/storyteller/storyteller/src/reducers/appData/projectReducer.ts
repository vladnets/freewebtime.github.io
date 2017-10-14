import { IAction } from '../../api/IAction';
import { IProject } from '../../api/IProject';
import { graphReducer } from '../graph/graphReducer';

export const projectReducer = function(project: IProject, action: IAction) {
  if (!project) {
    return project;
  }

  project.graph = graphReducer(project.graph, action);

  return project;
}