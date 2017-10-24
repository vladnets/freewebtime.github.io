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
import { appConfig } from '../config/appConfig';
import Rnd from 'react-rnd';

export class NodeView extends ViewBase<{data: IProject, node: INode, resources: IAppResources}> {
  state = {
    node: undefined,
    callback: undefined,
  }
  
  moveNode(self: NodeView, deltaPos: any, callback: ICallback) {
    const node = self.props.node;
    const newPos = {
      x: node.position.x + deltaPos.x, 
      y: node.position.y + deltaPos.y
    }
    const newNode = {...node, position: newPos};

    callback(appConfig.Actions.NodeUpdate(newNode));
  }
  placeNode(self: NodeView, newPos: any, callback: ICallback) {
    const node = self.props.node;
    const newNode = {...node, position: newPos};

    callback(appConfig.Actions.NodeUpdate(newNode));
  }
  resizeNode(self: NodeView, deltaSize: any, callback: ICallback) {
    const node = self.props.node;
    const newSize = {
      x: node.size.x + deltaSize.x, 
      y: node.size.y + deltaSize.y
    }
    const newNode = {...node, size: newSize};

    callback(appConfig.Actions.NodeUpdate(newNode));
  }

  render() {
    const node = this.props.node;

    return (
      <Rnd 
        size={{width: node.size.x, height: node.size.y}}
        position={node.position}
        onDragStop={(e, d)=>{
          this.placeNode(this, {x: d.x, y: d.y}, this.props.resources.callback)
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.resizeNode(this, delta, this.props.resources.callback)
          this.placeNode(this, position, this.props.resources.callback)
        }}
        dragHandleClassName={'.node-header'}
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


