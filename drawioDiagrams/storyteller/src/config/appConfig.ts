import { IVector2 } from '../api/IVector2';
import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
import Typography from 'material-ui/Typography';
import { IGraphNode, IGraphNodeViewData } from '../api/graph/IGraph';

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

      APP_SET_CALLBACK: 'APP_SET_CALLBACK',

      PROJECT_SELECT_MODULE: 'PROJECT_SELECT_MODULE',
    },

    NoOperation: (): IAction => {
      return {type: appConfig.Actions.Types.NO_OPERATION};
    },

    SetCallback: (callback: ICallback): IAction => {
      return {type: appConfig.Actions.Types.APP_SET_CALLBACK, payload: callback}
    },

    NodeCreateNew: (data: {}): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: {data: data}
      };
    },
    NodeRemove: (nodeId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: {nodeId: nodeId}
      };
    },
    NodeUpdate: (nodeId: string, newValues: {}): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_UPDATE,
        payload: {
          nodeId: nodeId, 
          newValues: newValues
        },
      }
    },
    NodeUpdateViewData: (nodeId: string, newValues: {}): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_UPDATE_VIEW_DATA,
        payload: {
          nodeId: nodeId,
          newValues: newValues
        }
      }
    },

    ProjectSelectModule: (moduleId: string) => {
      return {
        type: appConfig.Actions.Types.PROJECT_SELECT_MODULE,
        payload: moduleId,
      }
    }

    

  },
  SystemFunctions: {
    ['System.String'] : (args) => {
      if (args[('value')]) {
        return args[('value')];
      }
    },
    'System.Boolean': (args) => {
      if (args[('value')]) {
        return args[('value')];
      }
    },
    'System.Number': (args) => {
      if (args[('value')]) {
        return args[('value')];
      }
    },
  }
}

