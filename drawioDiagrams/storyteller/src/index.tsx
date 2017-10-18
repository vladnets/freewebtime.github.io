import { render } from 'react-dom';
import './index.css';
import { configureStore } from './configureStore';
import { AppRootView } from './components/AppRootView';
import * as React from 'react';

const store = configureStore();

render(
    <AppRootView store={store} />,
    document.getElementById('appRoot')
);