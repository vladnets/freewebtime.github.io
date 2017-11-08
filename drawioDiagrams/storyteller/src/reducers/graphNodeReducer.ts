import { IGraphNode } from '../api/graph/IGraph';
import { IAction } from '../api/IAction';
import { appConfig } from '../config/appConfig';

export const graphNodeReducer = (state: IGraphNode, action: IAction) => {
  
  const updateSubnodes = (state: IGraphNode, action: IAction) => {
    let isChanged = false;
    const subnodes = state.subnodes || {};
    const newValues = {}
    Object.keys(subnodes).map((key: string, index: number)=>{
      const oldValue = subnodes[key];
      if (oldValue) {
        const newValue = graphNodeReducer(oldValue, action);
        if (oldValue !== newValue) {
          newValues[key] = newValue;
          isChanged = true;
        }
      }
    });

    if (isChanged) {
      state = {...state, subnodes: {...subnodes, ...newValues}}
    }

    return state;
  }

  switch (action.type) {
    case appConfig.Actions.Types.NODE_UPDATE:
    {
      if (state.fullId === action.payload.nodeFullId) {
        state = {...state, ...action.payload.newValues}
      }
      else {
        state = updateSubnodes(state, action);
      }
    }
    break;

    case appConfig.Actions.Types.NODE_UPDATE_VIEW_DATA:
    {
      if (state.fullId === action.payload.nodeFullId) {
        state = {
          ...state, 
          viewData: {
            ...state.viewData, 
            ...action.payload.newValues
          }
        }
      }
      else {
        state = updateSubnodes(state, action);
      }
    }
    break;

    case appConfig.Actions.Types.NODE_UPDATE_SOCKETS:
    {
      if (state.fullId === action.payload.nodeFullId) {
        state = {
          ...state, 
          sockets: {
            ...state.sockets, 
            ...action.payload.newValues
          }
        }
      }
      else {
        state = updateSubnodes(state, action);
      }
    }
    break;

    case appConfig.Actions.Types.NODE_UPDATE_INPUT_SOCKET: {
      if (state.fullId === action.payload.nodeFullId) {
        state = {
          ...state, 
          sockets: {
            ...state.sockets,
            input: {
              ...state.sockets.input,
              ...action.payload.newValues
            }
          }
        }
      }
      else {
        state = updateSubnodes(state, action);
      }
    }
    break;

    case appConfig.Actions.Types.NODE_UPDATE_OUTPUT_SOCKET: {
      if (state.fullId === action.payload.nodeFullId) {
        state = {
          ...state, 
          sockets: {
            ...state.sockets,
            output: {
              ...state.sockets.output,
              ...action.payload.newValues
            }
          }
        }
      }
      else {
        state = updateSubnodes(state, action);
      }
    }
    break;

    default:
    state = updateSubnodes(state, action);
    break;
  }

  return state;
}