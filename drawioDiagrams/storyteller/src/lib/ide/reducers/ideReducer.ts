import { combineReducers } from 'redux';
import { projectReducer } from './projectReducer';
import instanceIdReducer from './instanceIdReducer';
import { IIde } from '../appData/IIde';

const ideReducer = combineReducers({
    InstanceId: instanceIdReducer,
    Project: projectReducer
});

export default ideReducer;