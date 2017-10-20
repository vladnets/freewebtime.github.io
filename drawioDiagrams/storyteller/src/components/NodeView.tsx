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
  resizeNode(node: INode, deltaSize: any, callback: ICallback) {
    callback(appConfig.Actions.NodeResize(node.id, deltaSize));
  }
  handleStop() {
  }

  render() {
    const className = 'node-view'
    const position = this.props.node.position 
      ? {x: this.props.node.position.x, y: this.props.node.position.y}
      : undefined; 
    const resizeHandlerSize = 30;

    return (
      <DraggableItem
        size={this.props.node.size}
        position={position}
        onDrag={(id: string, deltaPos: {x: number, y: number}, newPosition?: {x: number, y: number}) => this.dragNode(this.props.node, deltaPos, this.props.resources.callback)}
        style={{position: 'absolute'}}
      >
        <div className={'node-view'}>
          <div className={'node-header'}>
            {this.props.node.name}
          </div>
          <div className={'node-content'}>
            {this.props.node.id}
          </div>
        </div>

        <DraggableItem 
          className={'node-resize-handler'}
          position={{x: (this.props.node.size || {x: 0, y: 0}).x - resizeHandlerSize - 1, y: (this.props.node.size || {x: 0, y: 0}).y - resizeHandlerSize - 1}}
          style={{width: resizeHandlerSize + 'px', height: resizeHandlerSize + 'px', position: 'absolute'}}
          onDrag={(id: string, deltaPos: {x: number, y: number}, newPosition?: {x: number, y: number}) => this.resizeNode(this.props.node, deltaPos, this.props.resources.callback)}
        />
      </DraggableItem>
    );
  }
} 