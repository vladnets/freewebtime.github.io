import { IProject } from '../api/project/IProject';
import { IVector2 } from '../api/IVector2';
import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
import Typography from 'material-ui/Typography';
import { IGraphNode, IGraphNodeViewData, IReference } from '../api/graph/IGraph';
import { IHash } from '../api/IHash';

export const appConfig = {
  IsSaveStateToLocalStorage: true,
  IsLoadStateFromLocalStorage: false,
  SaveStateToLocalStorageInterval: 1000,

  PrimitiveTypes: {
    string: 'string',
    number: 'number',
    boolean: 'boolean',

  },

  SystemTypeNames: {
    TYPE_STRING: 'System.String',
    TYPE_NUMBER: 'System.Number',
    TYPE_BOOLEAN: 'System.Boolean',

    TYPE_CONSTRUCTOR_STRING: 'Text',
    TYPE_CONSTRUCTOR_NUMBER: 'Number',
    TYPE_CONSTRUCTOR_BOOLEAN: 'Bool',
  },

  Actions: {
    Types: {
      NO_OPERATION: 'NO_OPERATION',
      
      NODE_CREATE_NEW: 'NODE_CREATE_NEW',
      NODE_REMOVE: 'NODE_REMOVE',
      NODE_UPDATE: 'NODE_UPDATE',
      NODE_UPDATE_VIEW_DATA: 'NODE_UPDATE_VIEW_DATA',
      
      INOUT_SOCKET_SET_POSITION: 'INOUT_SOCKET_SET_POSITION',
      INOUT_SOCKETS_SET_VISIBLE_SOCKETS: 'INOUT_SOCKETS_SET_VISIBLE_SOCKETS',

      APP_SET_CALLBACK: 'APP_SET_CALLBACK',

      PROJECT_SELECT_MODULE: 'PROJECT_SELECT_MODULE',
    },

    NoOperation: (): IAction => {
      return {type: appConfig.Actions.Types.NO_OPERATION};
    },

    SetCallback: (callback: ICallback): IAction => {
      return {type: appConfig.Actions.Types.APP_SET_CALLBACK, payload: callback}
    },

    NodeCreateNew: (parentFullId: string, newValues: {}): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: {
          parentFullId: parentFullId,
          newValues: newValues,
        }
      };
    },
    NodeRemove: (nodeFullId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: {
          nodeId: nodeFullId, 
        }
      };
    },
    NodeUpdate: (nodeFullId: string, newValues: {}): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_UPDATE,
        payload: {
          nodeFullId: nodeFullId, 
          newValues: newValues
        },
      }
    },
    NodeUpdateViewData: (nodeFullId: string, newValues: {}): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_UPDATE_VIEW_DATA,
        payload: {
          nodeFullId: nodeFullId,
          newValues: newValues
        }
      }
    },

    InoutSocketSetPosition: (socketId: string, position: IVector2): IAction => {
      return {
        type: appConfig.Actions.Types.INOUT_SOCKET_SET_POSITION,
        payload: {
          socketId, 
          position
        }
      }
    },
    InoutSocketsSetVisibleSockets: (visibleSockets: IHash<string>): IAction => {
      return {
        type: appConfig.Actions.Types.INOUT_SOCKETS_SET_VISIBLE_SOCKETS,
        payload: visibleSockets
      }
    },

    ProjectSelectModule: (reference: IReference) => {
      return {
        type: appConfig.Actions.Types.PROJECT_SELECT_MODULE,
        payload: reference,
      }
    }

    

  },
  
  SystemFunctions: {
    'string_concat': (graphNode: IGraphNode, project: IProject) => {
      return 'string_concat\'s function result';
    }
  }
}

