import { IProject } from '../api/project/IProject';
import { v4 } from 'node-uuid';
import { IGraphNode, GraphNodeType } from '../api/graph/IGraph';
import { appConfig } from './appConfig';

export const createInitialState = (): IProject => {
  
  const createSystemModule = (): IGraphNode => {
    
    const result: IGraphNode = {
      id: 'System',
      name: 'System',
      nodeType: GraphNodeType.Construction,
      viewData: {
        position: {x: 0, y: 0},
        size: {x: 120, y: 80},
        isCollapsed: false,
      },
      subnodes: {
        [appConfig.PrimitiveTypes.string]: {
          id: appConfig.PrimitiveTypes.string,
          name: appConfig.PrimitiveTypes.string,
          nodeType: GraphNodeType.Primitive,
          viewData: {
            position: {x: 50, y: 0},
            size: {x: 120, y: 80},
            isCollapsed: false,
          },
        },
        [appConfig.PrimitiveTypes.number]: {
          id: appConfig.PrimitiveTypes.number,
          name: appConfig.PrimitiveTypes.number,
          nodeType: GraphNodeType.Primitive,
          viewData: {
            position: {x: 50, y: 100},
            size: {x: 120, y: 80},
            isCollapsed: false,
          },
        },
        [appConfig.PrimitiveTypes.boolean]: {
          id: appConfig.PrimitiveTypes.boolean,
          name: appConfig.PrimitiveTypes.boolean,
          nodeType: GraphNodeType.Primitive,
          viewData: {
            position: {x: 50, y: 200},
            size: {x: 120, y: 80},
            isCollapsed: false,
          },
        },
      } 
    }

    return result;
  }

  const systemModule = createSystemModule();

  const result: IProject = {
    id: v4(),
    name: 'New project',
    modules: {
    },
    imports: {
      [systemModule.id]: systemModule
    },
  };
  return result;
}