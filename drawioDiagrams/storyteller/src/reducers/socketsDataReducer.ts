import { IAction } from '../api/IAction';
import { ISocketsData } from '../api/IAppState';
import { appConfig } from '../config/appConfig';

const initialState: ISocketsData = {
  socketsPositions: {},
  visibleSockets: {},
}
export const socketsDataReducer = (state: ISocketsData = initialState, action: IAction) => {
  switch (action.type) {
    case appConfig.Actions.Types.INOUT_SOCKETS_SET_VISIBLE_SOCKETS: 
    {
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
  
    default:
    {

    }
    break;
  }
  
  return state;
}