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

export class NodeView extends ViewBase<{data: IProject, node: INode}> {
  handleStart() {
    console.log('start: ', arguments);  
  }
  handleDrag() {
    console.log('drag: ', arguments);  
  }
  handleStop() {
    console.log('stop ', arguments);  
  }

  render() {
    const className = 'node-view'

    return (
      <Draggable
        //axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
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