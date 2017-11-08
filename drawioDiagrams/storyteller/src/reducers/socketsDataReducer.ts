import { IAction } from '../api/IAction';
import { ISocketsData } from '../api/IAppState';
import { appConfig } from '../config/appConfig';

const initialState: ISocketsData = {
  socketsPositions: {},
  visibleSockets: {},
  graphPosition: {x: 0, y:0},
}
export const socketsDataReducer = (state: ISocketsData = initialState, action: IAction) => {
  switch (action.type) {
    case appConfig.Actions.Types.INOUT_SOCKETS_SET_VISIBLE_SOCKETS: 
    {
      console.log('set visible sockets', action);
      state = {...state, visibleSockets: action.payload};
    }
    break;

    case appConfig.Actions.Types.INOUT_SOCKET_SET_POSITION: {
      const socketsPositions = {
        ...state.socketsPositions
      };

      state = {
        ...state,
        socketsPositions: {
          ...state.socketsPositions,
          [action.payload.socketId]: action.payload.position
        }
      }
    }
    break;

    case appConfig.Actions.Types.GRAPH_VIEW_SET_POSITION: 
    {
      state = {
        ...state,
        graphPosition: action.payload,
      }
    }
    break;
  
    default:
    {

    }
    break;
  }
  
  return state;
}