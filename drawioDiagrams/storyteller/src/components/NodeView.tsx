import { ICallback } from '../api/index';
import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState, IProject } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { Card, Segment } from 'semantic-ui-react';
import { INode } from '../api/INode';
import * as ReactDom from 'react-dom';
import Draggable from 'react-draggable';
import { appConfig } from '../config/appConfig';

export class NodeView extends ViewBase<{data: IProject, node: INode, resources: IAppResources}> {
  handleStart() {
  }
  dragNode(node: INode, dd: any, callback: ICallback) {
    callback(appConfig.Actions.NodeMove(node.id, {x: dd.deltaX, y: dd.deltaY}));
  }
  handleStop() {
  }

  render() {
    const className = 'node-view'
    const position = this.props.node.position 
      ? {x: this.props.node.position.x, y: this.props.node.position.y}
      : undefined; 

    console.log('node pos is ', position);

    return (
      <Draggable
        handle=".handle"
        // defaultPosition={{x: 0, y: 0}}
        //position={position}
        grid={[25, 25]}
        // onStart={this.handleStart}
        onDrag={(e: any, dd: any)=> this.dragNode(this.props.node, dd, this.props.resources.callback)}
        // onStop={this.handleStop}
      >
        <Segment.Group className={className} size={'tiny'} compact >
          <Segment className={'handle'}>
            {this.props.node.name}
          </Segment>
          <Segment>
            {this.props.node.id}
          </Segment>
        </Segment.Group>
      </Draggable>
    );
  }
} 