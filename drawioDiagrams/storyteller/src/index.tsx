import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import { App } from './App';
import './index.css';
import appReducer from './lib/ide/reducers/appReducer';
import * as Actions from './lib/ide/actions/actions';
import { projectChangeName } from './lib/ide/actions/actions';
import { Templates } from './lib/ide/view/Templates';

const initialState: any = {
};

const store: Store<any> = createStore(
  appReducer,
  initialState,
  applyMiddleware(reduxLogger)
);


const domElement = document.getElementById('appRoot');
store.subscribe(() => {
  ReactDOM.render(
    <App data={store.getState()} template={Templates.Templates}/>,
    domElement
  )
});

let projectTemplates = {
  story: {
    Items: [

    ]
  }
}

store.dispatch(Actions.noOperation());
store.dispatch(Actions.projectCreate({templateName: 'story', name: 'Amazing story project', templates: projectTemplates}));
store.dispatch(Actions.projectChangeName('Supercool project'));
