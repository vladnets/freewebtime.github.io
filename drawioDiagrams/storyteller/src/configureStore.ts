import { applyMiddleware, compose, createStore, Store } from 'redux';
import reduxLogger from 'redux-logger';
import { rootReducer } from './reducers/rootReducer';
import { appConfig } from './config/appConfig';

export const configureStore = () => {
  const store = createStore(
    rootReducer,
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
