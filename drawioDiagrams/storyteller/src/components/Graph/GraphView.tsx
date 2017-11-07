import Spline from '../Spline';
import { NodeView, NodeViewDrawType } from './NodeView';
import { Store } from 'redux';
import { ViewBase } from '../View';
import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDom from 'react-dom';
import Rnd from 'react-rnd';
import './Graph.css';
import SvgComponent from '../SvgComponent';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import * as FA from 'react-fontawesome';
import { IProject } from '../../api/project/IProject';
import { IGraphNode } from '../../api/graph/IGraph';
import { IHash } from '../../api/IHash';
import { ISocketsData } from '../../api/IAppState';

interface IGraphViewProps {
  project: IProject;
  rootNode: IGraphNode;
  visibleSockets: IHash<string>;
  socketsData: ISocketsData;
  resources: IAppResources;
}

export class GraphView extends ViewBase<IGraphViewProps> {
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

  handleClick(e, data) {
    console.log(data);
  }
  
  render() {
    const className = 'node-graph-view';
    const areaSize = 1000;

    const project = this.props.project;
    const rootNode = this.props.rootNode;
    const subnodes = rootNode.subnodes;
    const subnodesView = () => {
      if (subnodes) {
        return (Object.keys(subnodes).map((key: string, index: number) => {
          const subnode = subnodes[key];
  
          return (
            <NodeView 
              key={key} 
              resources={this.props.resources} 
              node={subnode} 
              drawType={NodeViewDrawType.Node} 
              project={project}
              visibleSockets={this.props.visibleSockets}
              socketsData={this.props.socketsData}
            />
          )
        }))
      }

      return false;
    }

    const connections = (
      <div>
        heyhohohoho
        <SvgComponent ref="svgComponent">
          <Spline 
            mousePos={{x: 150, y: 450}}
            start={{x: 450, y: 460}}
            end={{x: 700, y: 50}}
          />
        </SvgComponent>
      </div>
    );

    const contextMenu = (
      <ContextMenu id="some_unique_identifier">
        <MenuItem data={{'some data': 'some_data 1'}} onClick={this.handleClick}>
          ContextMenu Item 1
        </MenuItem>
        <MenuItem data={{'some data': 'some_data 2'}} onClick={this.handleClick}>
          ContextMenu Item 2
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{'some data': 'some_data 3'}} onClick={this.handleClick}>
          ContextMenu Item 3
        </MenuItem>
      </ContextMenu>
    );

    const graphView = (
      <div style={{transform: 'scale(' + this.state.scale + ')'}} >
      {subnodesView()}
      </div>
    );

    return (
      <ContextMenuTrigger id="some_unique_identifier">
        <div 
          className={className} 
          style={{position: 'relative', overflow: 'hidden'}} 
          onWheel={(e)=> {this.onMouseWheel(this, e)}}
        >
        {graphView}
        {
          // connections
        }
        {contextMenu}
      </div>
    </ContextMenuTrigger>
  )}
} 