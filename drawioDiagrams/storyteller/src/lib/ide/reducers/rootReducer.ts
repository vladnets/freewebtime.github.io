import { combineReducers } from 'redux';
import ideReducer from './ideReducer';

const rootReducer = combineReducers({
  IdeState: ideReducer
});

export default rootReducer;