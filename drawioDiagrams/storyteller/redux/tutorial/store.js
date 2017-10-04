import { createStore, applyMiddleware } from "redux";
import {createLogger} from 'redux-logger';
import thunk from "redux-thunk";
import axios from 'axios';
import promise from 'redux-promise-middleware';
import reducer from './reducers'

const logger = createLogger({logErrors : true, duration: true, timestamp: true});
const middleware = applyMiddleware(promise(), thunk, logger);

export default createStore(reducer, middleware);