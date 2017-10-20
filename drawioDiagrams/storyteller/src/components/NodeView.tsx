import { DraggableItem } from './DraggableItem';
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
  dragNode(node: INode, deltaPos: any, callback: ICallback) {
    callback(appConfig.Actions.NodeMove(node.id, deltaPos));
  }
  handleStop() {
  }

  render() {
    const className = 'node-view'
    const position = this.props.node.position 
      ? {x: this.props.node.position.x, y: this.props.node.position.y}
      : undefined; 

    return (
      <DraggableItem
        position={position}
        onDrag={(id: string, deltaPos: {x: number, y: number}, newPosition?: {x: number, y: number}) => this.dragNode(this.props.node, deltaPos, this.props.resources.callback)}
      >
        <Segment.Group className={className} size={'tiny'} compact >
          <Segment className={'handle'}>
            {this.props.node.name}
          </Segment>
          <Segment>
            {this.props.node.id}
          </Segment>
        </Segment.Group>
      </DraggableItem>
    );
  }
} 