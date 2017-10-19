import { RootView } from './components/RootView';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { configureStore } from './configureStore';
import * as React from 'react';

const store = configureStore();

render(
    <RootView store={store} />,
    document.getElementById('appRoot')
);