import { applyMiddleware, compose, createStore, Store } from 'redux';
import reduxLogger from 'redux-logger';
import { rootReducer } from './reducers/rootReducer';

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose (
      applyMiddleware(reduxLogger),
      window.devToolsExtension ? window.devToolsExtension() : f => f      
    )
  );
  
  const dispatchAction = (action) => {
      store.dispatch(action);
  }

  return store;
}