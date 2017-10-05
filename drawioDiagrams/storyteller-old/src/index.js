import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import {Provider} from 'react-redux';
import state from './state';

const app = document.getElementById("reactroot");
ReactDOM.render(
    <Provider store={state.store}>
        <Layout />
    </Provider>
, app);
