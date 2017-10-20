import { NodeView } from './NodeView';
import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState, IProject } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { DraggableItem } from './DraggableItem';

export class NodeGraphView extends ViewBase<{data: IProject, resources: IAppResources}> {
  state = {
    dragging: false,
    dragStart: {x: 0, y: 0}, 
    position: {x: 0, y: 0},
  };
  
  onMouseDown(e: any, context: React.Component) {
    context.setState({
      ...context.state, 
      dragStart: {x: e.pageX, y: e.pageY},
      dragging: true,
    });

    e.stopPropagation()
    e.preventDefault()
  }
  onMouseOut(e: any, context: React.Component) {
    context.setState({
      ...context.state, 
      dragging: false,
    });

    e.stopPropagation()
    e.preventDefault()
  }
  onMouseUp(e: any, context: React.Component) {
    context.setState({
      ...context.state, 
      dragging: false,
    });

    e.stopPropagation()
    e.preventDefault()
  }
  onMouseMove(e: any, context: React.Component) {
    if (!context.state[('dragging')]) {
      return;
    }

    this.setState({
      ...context.state, 
      position: {
        x: context.state[('position')].x + (e.pageX - context.state[('dragStart')].x),
        y: context.state[('position')].y + (e.pageY - context.state[('dragStart')].y),
      },
      dragStart: {x: e.pageX, y: e.pageY},
    });
    
    e.stopPropagation()
    e.preventDefault()
  } 

  render() {
    const className = 'node-graph-view';
    const areaSize = 1000;


    return (
      <div 
        className={className} 
        style={{position: 'relative', overflow: 'hidden'}}
        onMouseDown={(e: any) => this.onMouseDown(e, this)}
        onMouseUp={(e: any) => this.onMouseUp(e, this)}
        onMouseMove={(e: any) => this.onMouseMove(e, this)}
        onMouseOut={(e: any) => this.onMouseOut(e, this)}
      >
        <div style={{left: this.state.position.x, top: this.state.position.y, background: 'yellow', position: 'relative', width: '0px', height: areaSize}}>
          {
            Object.keys(this.props.data.nodes).map((key: string, index: number) => (
              <NodeView key={key} data={this.props.data} node={this.props.data.nodes[key]} resources={this.props.resources}/>
            ))          
          }
        </div>
      </div>
    );
  }
} 
