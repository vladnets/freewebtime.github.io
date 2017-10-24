import { NodeView } from './NodeView';
import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState, IProject } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import * as ReactDom from 'react-dom';
import Rnd from 'react-rnd';

export class NodeGraphView extends ViewBase<{data: IProject, resources: IAppResources}> {
  state = {
    dragging: false,
    dragStart: {x: 0, y: 0}, 
    position: {x: 0, y: 0},
    scale: 1
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
  onMouseWheel(self: React.Component, event: React.WheelEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    
    if (event.ctrlKey) {
      this.setState({
        ...this.state,
        scale: this.state.scale + (event.deltaY/-1000)
      });
    } 
  }

  render() {
    const className = 'node-graph-view';
    const areaSize = 1000;

    return (
      <div 
        className={className} 
        style={{position: 'relative', overflow: 'hidden'}} 
        onWheel={(e)=> {this.onMouseWheel(this, e)}}
      >
        <div 
          style={{transform: 'scale(' + this.state.scale + ')'}}
        >
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
