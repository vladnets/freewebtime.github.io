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

export const areObjectsEqual = ( x, y ) => {
  if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== 'object' ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

    if ( ! areObjectsEqual( x[ p ],  y[ p ] ) ) return false;
      // Objects and Arrays must be tested recursively
  }

  for ( p in y ) {
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
      // allows x[ p ] to be set to undefined
  }
  return true;
}