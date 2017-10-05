import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import App from './App';
import './index.css';
import rootReducer from './lib/tutorial/rootReducer';
import IAppState from './lib/tutorial/IAppState';

import * as Actions from './lib/tutorial/actions';

// import './lib/tutorial/redux.ts';

console.log('hello world!');

const store: Store<IAppState> = createStore(
  rootReducer, 
  applyMiddleware(reduxLogger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('appRoot')
);

store.dispatch(Actions.noOperation());
store.dispatch(Actions.projectCreate('new project name'));
