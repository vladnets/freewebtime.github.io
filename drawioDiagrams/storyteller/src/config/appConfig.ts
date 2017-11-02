import { IVector2 } from '../api/IVector2';
import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
import Typography from 'material-ui/Typography';
import { INode } from '../api/INode';
import { IFunction } from '../api/project/IFunction';

export const appConfig = {
  IsSaveStateToLocalStorage: true,
  IsLoadStateFromLocalStorage: true,
  SaveStateToLocalStorageInterval: 1000,

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

      APP_SET_CALLBACK: 'APP_SET_CALLBACK',
    },

    NoOperation: (): IAction => {
      return {type: appConfig.Actions.Types.NO_OPERATION};
    },

    SetCallback: (callback: ICallback): IAction => {
      return {type: appConfig.Actions.Types.APP_SET_CALLBACK, payload: callback}
    },

    NodeCreateNew: (data: {}, moduleId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: {data: data, moduleId: moduleId}
      };
    },
    NodeRemove: (nodeId: string, moduleId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: {nodeId: nodeId, moduleId: moduleId}
      };
    },
    NodeUpdate: (updatedNode: INode, moduleId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_UPDATE,
        payload: {node: updatedNode, moduleId: moduleId},
      }
    },

    

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

