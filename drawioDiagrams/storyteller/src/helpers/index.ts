import { IHash } from '../api/IHash';
import { appConfig } from '../config/appConfig';
import { IProject } from '../api/project/IProject';
import { IGraphNode, IReference, ReferenceType, ReferencePath } from '../api/graph/IGraph';

export const getSelectedNode = (project: IProject): IGraphNode|undefined => {
  if (!project.selectedNode) {
    return undefined;
  }

  const selectedNode = resolveReference(project.selectedNode, project, project);
  return selectedNode;
}

export const resolveReferenceRaw = (referencePath: ReferencePath, rootNode: IGraphNode, project: IProject): IGraphNode|undefined => {
  if (referencePath.length <= 0) {
    return undefined;
  }

  const subnodes = rootNode.subnodes;
  if (!subnodes) {
    return undefined;
  }

  const subnode = subnodes[referencePath[0]];
  if (subnode) {
    if (referencePath.length > 1) {
      const subPath = referencePath.slice(1);
      return resolveReferenceRaw(subPath, subnode, project);
    }
    
    return subnode;
  }
  
  return undefined;
}

export const resolveReference = (reference: IReference, context: IGraphNode, project: IProject): IGraphNode|undefined => {
  if (!project || !reference) {
    return;
  }

  switch (reference.referenceType) {
    case ReferenceType.Relative:
    {
      return resolveReferenceRaw(reference.referencePath, context, project);
    }
    
    case ReferenceType.Global:
    {
      return resolveReferenceRaw(reference.referencePath, project, project);
    }
  
    default:
    break;
  }

  return undefined;
}