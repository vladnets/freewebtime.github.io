import { applyMiddleware, compose, createStore, Store } from 'redux';
import reduxLogger from 'redux-logger';
import { appReducer } from './reducers/appReducer';
import { appConfig } from './config/appConfig';
import { loadState } from './helpers/LocalStorageHelper';

const initialState = loadState();

export const configureStore = () => {
  const store = createStore(
    appReducer,
    initialState,
    compose (
      applyMiddleware(reduxLogger),
      window[('devToolsExtension')] ? window[('devToolsExtension')]() : f => f      
    )
  );
  
  const dispatchAction = (action) => {
      store.dispatch(action);
  }

  dispatchAction(appConfig.Actions.SetCallback(dispatchAction));

  return store;
}
