import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from '../src/layout/AppRoot';
import ReduxApp from '../redux/components/ReduxApp';

let drawGraph = false;
if (drawGraph)
{
  ReactDOM.render(
    <AppRoot />,
    document.getElementById('reactroot')
  );
} else {
  ReactDOM.render(
    <ReduxApp />,
    document.getElementById('reactroot')
  );
}


