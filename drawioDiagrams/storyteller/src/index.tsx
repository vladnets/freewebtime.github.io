import { IAction } from './lib/framework/actions/IAction';
import { IViewData } from './lib/framework/view/IViewData';
import { IIde } from './lib/ide/appData/IIde';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import { View } from './lib/framework/view/View';
import './index.css';
import appReducer from './lib/ide/reducers/appReducer';
import * as Actions from './lib/ide/actions/actions';
import { projectChangeName } from './lib/ide/actions/actions';
import Theme from './lib/ide/view/Theme';
import { IApp } from './lib/ide/appData/IApp';
import { CreateGuid } from './lib/CreateGuid';

const initialState: IApp = {
  Ide: {
    InstanceId: 'asdasd',
    Project: {
      Name: 'Basic name',
      Items: [
        {
          Id: '01',
          Name: 'first item',
          Value: 'first item value',
          ItemType: 'text',
          Tags: [],
          Items: []
        }
      ]
    }
  }
};

const store: Store<IApp> = createStore(
  appReducer,
  initialState,
  applyMiddleware(reduxLogger)
) as Store<IApp>;

const dispatchAction = function(action: IAction)
{
  store.dispatch(action);
}

const domElement = document.getElementById('appRoot');
store.subscribe(() => {
  const state = store.getState() as IApp;
  ReactDOM.render(
    <View data={state} viewData={{itemType: 'app', id:'app', theme: Theme, callback: dispatchAction}} />,
    domElement
  );
});

store.dispatch(Actions.noOperation());
//store.dispatch(Actions.projectChangeName('Supercool project'));
