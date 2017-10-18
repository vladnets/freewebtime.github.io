import { applyMiddleware, compose, createStore, Store } from 'redux';
import { IAppData } from './api/IAppData';
import { appReducer } from './reducers/appReducer';
import reduxLogger from 'redux-logger';
import { IAction } from './api/actions/IAction';

export const configureStore = () => {
  const store = createStore(
    appReducer,
    compose (
      applyMiddleware(reduxLogger),
      window.devToolsExtension ? window.devToolsExtension() : f => f      
    )
  );
  
  const dispatchAction = (action) => {
      store.dispatch(action);
  }
}