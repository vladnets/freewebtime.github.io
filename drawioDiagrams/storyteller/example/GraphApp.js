import React, { Component } from 'react';

// import ReactNodeGraph from 'react-node-graph'; 

import ReactNodeGraph from '../src/NodeGraph';

var exampleGraph = {
  "nodes":[
    {"nid":1,"type":"Camera","x":549,"y":478,"fields":{"in":[{"name":"aspect"},{"name":"near"}],"out":[{"name":"out"},{"name":"out2"}]}},
    {"nid":2,"type":"Scene","x":1216,"y":217,"fields":{"in":[{"name":"children"}],"out":[{"name":"out"}]}},
    {"nid":3,"type":"Merge","x":948,"y":217,"fields":{"in":[{"name":"in0"},{"name":"in1"},{"name":"in2"},{"name":"in3"},{"name":"in4"}],"out":[{"name":"out"}]}},
  ],
  "connections":[
    {"from_node":1,"from":"out","to_node":2,"to":"children"},
    {"from_node":2,"from":"out","to_node":3,"to":"in1"},
  ]
};

export default class GraphApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = exampleGraph;
  }

  onNewConnector(fromNode,fromPin,toNode,toPin) {
    let connections = [...this.state.connections, {
      from_node : fromNode,
      from : fromPin,
      to_node : toNode,
      to : toPin
    }]

    this.setState({connections: connections})
  }

  onRemoveConnector(connector) {
    let connections = [...this.state.connections]
    connections = connections.filter((connection) => {
      return connection != connector
    })

    this.setState({connections: connections})
  }

  onNodeMove(nid, pos) { 
    console.log('end move : ' + nid, pos)
  }

  onNodeStartMove(nid) { 
    console.log('start move : ' + nid)
  }

  handleNodeSelect(nid) {
    console.log('node selected : ' + nid)
  }

  handleNodeDeselect(nid) {
    console.log('node deselected : ' + nid)
  }

  render() {
      return (
          <ReactNodeGraph 
            data={this.state} 
            onNodeMove={(nid, pos)=>this.onNodeMove(nid, pos)}
            onNodeStartMove={(nid)=>this.onNodeStartMove(nid)}
            onNewConnector={(n1,o,n2,i)=>this.onNewConnector(n1,o,n2,i)}
            onRemoveConnector={(connector)=>this.onRemoveConnector(connector)}
            onNodeSelect={(nid) => {this.handleNodeSelect(nid)}}
            onNodeDeselect={(nid) => {this.handleNodeDeselect(nid)}}
          />
      );      
  }
}