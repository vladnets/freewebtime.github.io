import { combineReducers } from 'redux';
import ideReducer from './ideReducer';

const appReducer = combineReducers({
    Ide: ideReducer
});

export default appReducer;