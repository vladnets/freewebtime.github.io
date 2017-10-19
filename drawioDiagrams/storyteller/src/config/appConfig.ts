import { IAction } from '../api/IAction';
import { INode } from '../api/INode';
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
    },

    NoOperation: (): IAction => {
      return {type: appConfig.Actions.Types.NO_OPERATION};
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


  }
}

