import { DraggableItem } from './DraggableItem';
import { ICallback } from '../api/index';
import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState, IProject } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { INode } from '../api/INode';
import * as ReactDom from 'react-dom';
import Draggable from 'react-draggable';
import { appConfig } from '../config/appConfig';
import { Resizable, ResizableBox } from 'react-resizable';
import Rnd from 'react-rnd';

export class NodeView extends ViewBase<{data: IProject, node: INode, resources: IAppResources}> {
  handleStart() {
  }
  dragNode(node: INode, deltaPos: any, callback: ICallback) {
    console.log('delta pos is ', deltaPos);
    callback(appConfig.Actions.NodeMove(node.id, deltaPos));
  }
  setNodePos(node: INode, newPos: any, callback: ICallback) {
    callback(appConfig.Actions.NodeUpdate({...node, position: newPos}));
  }
  resizeNode(node: INode, deltaSize: any, callback: ICallback) {
    callback(appConfig.Actions.NodeResize(node.id, deltaSize));
  }
  handleStop() {
  }

  render() {
    const node = this.props.node;
    const nodeSize = node.size || {x: 250, y: 80};
    const nodePos = node.position || {x: 0, y: 0};

    return (
      <Rnd 
        size={{width: nodeSize.x, height: nodeSize.y}}
        position={nodePos}
        onDragStop={(e, d)=>{
          this.setNodePos(node, {x: d.x, y: d.y}, this.props.resources.callback)
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.resizeNode(node, delta, this.props.resources.callback)
        }}
      >
        <div className={'node-view'}>
          <div className={'node-header'}>
            {this.props.node.name}
          </div>
          <div className={'node-content'}>
            {this.props.node.id}
          </div>
        </div>
      </Rnd>
    );
  }
} 


// return (
//   <DraggableItem
//     size={this.props.node.size}
//     position={position}
//     onDrag={(id: string, deltaPos: {x: number, y: number}, newPosition?: {x: number, y: number}) => this.dragNode(this.props.node, deltaPos, this.props.resources.callback)}
//     style={{position: 'absolute'}}
//   >
//     <div className={'node-view'}>
//       <div className={'node-header'}>
//         {this.props.node.name}
//       </div>
//       <div className={'node-content'}>
//         {this.props.node.id}
//       </div>
//     </div>

//     <DraggableItem 
//       className={'node-resize-handler'}
//       position={{x: (this.props.node.size || {x: 0, y: 0}).x - resizeHandlerSize - 1, y: (this.props.node.size || {x: 0, y: 0}).y - resizeHandlerSize - 1}}
//       style={{width: resizeHandlerSize + 'px', height: resizeHandlerSize + 'px', position: 'absolute'}}
//       onDrag={(id: string, deltaPos: {x: number, y: number}, newPosition?: {x: number, y: number}) => this.resizeNode(this.props.node, deltaPos, this.props.resources.callback)}
//     />
//   </DraggableItem>
// );


