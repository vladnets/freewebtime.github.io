import { IVector2 } from '../api/IVector2';
import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
import { INode } from '../api/INode';
import Typography from 'material-ui/Typography';
export const appConfig = {
  NodeTypes: {
    NODE_TYPE_STRING: 'NODE_TYPE_STRING',
    NODE_TYPE_NUMBER: 'NODE_TYPE_NUMBER',
    NODE_TYPE_IMAGE: 'NODE_TYPE_IMAGE',
    NODE_TYPE_BOOL: 'NODE_TYPE_BOOL',
    NODE_TYPE_ICON: 'NODE_TYPE_ICON',
    NODE_TYPE_OBJECT: 'NODE_TYPE_OBJECT',
  },
  Actions: {
    Types: {
      NO_OPERATION: 'NO_OPERATION',
      
      NODE_CREATE_NEW: 'NODE_CREATE_NEW',
      NODE_REMOVE: 'NODE_REMOVE',
      NODE_UPDATE: 'NODE_UPDATE',
      NODE_MOVE: 'NODE_MOVE',

      APP_SET_CALLBACK: 'APP_SET_CALLBACK',
    },

    NoOperation: (): IAction => {
      return {type: appConfig.Actions.Types.NO_OPERATION};
    },

    SetCallback: (callback: ICallback): IAction => {
      return {type: appConfig.Actions.Types.APP_SET_CALLBACK, payload: callback}
    },

    NodeCreateNew: (newNode: INode): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: newNode
      };
    },
    NodeRemove: (nodeId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: nodeId
      };
    },
    NodeUpdate: (updatedNode: INode): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_UPDATE,
        payload: updatedNode,
      }
    },
    NodeMove: (nodeId: string, offset: IVector2) => {
      return {
        type: appConfig.Actions.Types.NODE_MOVE,
        payload: {nodeId, offset},
      }
    }


  }
}

