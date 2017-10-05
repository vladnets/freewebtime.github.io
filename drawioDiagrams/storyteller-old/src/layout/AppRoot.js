import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import GraphApp from '../../example/GraphApp';

export default class AppRoot extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      return (
        <div>
          <NavigationBar />
          <GraphApp />
        </div>
      );      
  }
}