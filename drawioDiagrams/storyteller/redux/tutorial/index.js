import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from '../../src/layout/AppRoot';
import ReduxApp from '../components/ReduxApp';
import client from './components/client';
import { createStore } from "redux";

const reducer = function(state, action){
    switch (action.type) {
        case "INC":
            return state + action.payload;
        
        case "DEC":
            return state - action.payload;

        default:
            return state;
    }
}

const store = createStore(reducer, 0);
store.subscribe(()=>{
    $("#reactroot").append("<p>State changed! " + store.getState() + "</p>");
});

store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 2});
store.dispatch({type: "DEC", payload: 3});
store.dispatch({type: "INC", payload: 1});

