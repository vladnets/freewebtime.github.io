import { IHash } from '../api/IHash';
import { appConfig } from '../config/appConfig';
import { IProject } from '../api/project/IProject';
import { IGraphNode } from '../api/graph/IGraph';

export const getSelectedNode = (project: IProject): IGraphNode|undefined => {
  if (!project.selectedModuleId) {
    return undefined;
  }

  if (project.modules) {
    const selectedModule = project.modules[project.selectedModuleId];
    if (selectedModule) {
      return selectedModule;
    }
  }
  if (project.imports) {
    const selectedImport = project.imports[project.selectedModuleId];
    if (selectedImport) {
      return selectedImport;
    }
  }

  return undefined;
}