import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import App from './App';
import './index.css';
import rootReducer from './lib/ide/reducers/rootReducer';
import { IAppState } from './lib/ide/state/IAppState';

import { NavbarItemTypes } from './lib/ide/state/NavbarItemTypes';
import { INavbarItem } from './lib/ide/state/INavbarItem';

const initialState: IAppState = {
  IdeState: {
    Navbar: {
      items: [
        {
          isEnabled: true,
          itemId: 'text01',
          type: NavbarItemTypes.Text,
          href: '#',
          text: 'hello world item',
          onClick: ()=>{},
        },
        {
          isEnabled: true,
          itemId: 'text02',
          type: NavbarItemTypes.Text,
          href: '#',
          text: 'hello world item 2',
          onClick: ()=>{},
        },
        {
          isEnabled: true,
          itemId: 'link 01',
          type: NavbarItemTypes.Link,
          href: '#',
          text: 'Link item',
          onClick: ()=>{},
        },
        {
          isEnabled: true,
          itemId: 'btn 01',
          type: NavbarItemTypes.Link,
          href: '#',
          text: 'Link item',
          onClick: (e: INavbarItem)=>{console.log(e);},
        },
        {
          isEnabled: true,
          itemId: 'dropdown 01',
          type: NavbarItemTypes.Dropdown,
          href: '#',
          text: 'Dropdown',
          onClick: ()=>{},
          children: [
            {
              isEnabled: true,
              itemId: 'btn 01',
              type: NavbarItemTypes.Link,
              href: '#',
              text: 'Submenu 1',
              onClick: (e: INavbarItem)=>{console.log(e);},
            },          
            {
              isEnabled: true,
              itemId: 'btn 02',
              type: NavbarItemTypes.Link,
              href: '#',
              text: 'Submenu 2',
              onClick: (e: INavbarItem)=>{console.log(e);},
            },          
            {
              isEnabled: true,
              itemId: 'btn 03',
              type: NavbarItemTypes.Link,
              href: '#',
              text: 'Submenu 3',
              onClick: (e: INavbarItem)=>{console.log(e);},
            },          
          ]
        },
      ]
    }
  }
};
const store: Store<IAppState> = createStore(
  rootReducer,
  initialState,
  applyMiddleware(reduxLogger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('appRoot')
);

console.log(store.getState());

// store.dispatch(Actions.noOperation());
// store.dispatch(Actions.ideInitialize());
// store.dispatch(Actions.projectCreate('new project name'));
