import { IGraphNode } from '../../api/graph/IGraph';
import * as React from 'react';
import './Node.css';
import { IVector2 } from '../../api/IVector2';
import './Node.css';
import { ICallback } from '../../api/index';
import { appConfig } from '../../config/appConfig';
import { ViewBase } from '../View';
import { IAppResources } from '../../api/IAppResources';
import Rnd from 'react-rnd';
import * as FA from 'react-fontawesome';
import { v4 } from 'node-uuid';

interface INodeViewProps {
  node: IGraphNode;
  resources: IAppResources;
}

export class NodeView extends React.Component<INodeViewProps> {

  moveNode(self: NodeView, deltaPos: IVector2, callback: ICallback) {
    const node = self.props.node;
    const currentPos = node.viewData.position;
    const newValues = {
      position: {
        x: currentPos.x + deltaPos.x, 
        y: currentPos.y + deltaPos.y
      }
    }

    callback(appConfig.Actions.NodeUpdateViewData(node.id, newValues));
  }
  placeNode(self: NodeView, newPos: IVector2, callback: ICallback) {
    const node = self.props.node;
    const currentPos = node.viewData.position;
    const newValues = {
      position: newPos
    }
    callback(appConfig.Actions.NodeUpdateViewData(node.id, newValues));
  }
  resizeNode(self: NodeView, deltaSize: IVector2, newPos: IVector2, callback: ICallback) {
    const node = self.props.node;
    const currentPos = node.viewData.position;
    const currentSize = node.viewData.size;
    const newSize = {
      x: Math.max(deltaSize.x, 10), 
      y: Math.max(deltaSize.y, 10)
    }
    const newValues = {
      position: newPos,
      size: newSize,
    }
    callback(appConfig.Actions.NodeUpdateViewData(node.id, newValues));
  }

  render() {
    
    const node = this.props.node;

    const outputItem = (key, func, type) => (
      <div key={key}>
      {func.output[key].name}
      <br />
      {type.name}
      </div>
    );

    const outputItems = () => {
      return false;
    }

    const inputItems = () => {
      return false;
    }


  
    const nodeOutputView = (
      <div className={'node-output'}>
        {outputItems()}
      </div>
    );
    const nodeInputView = (
      <div className={'node-input'}>
        {inputItems()}
      </div>
    );

    const nodeBodyView = (
      <div className={'node-body'}>
        {}
      </div>
    );

    const nodeContentView = (
      <div className={'node-content'}>
        {nodeInputView}
        {nodeBodyView}
        {nodeOutputView}
        </div>
    );

    const nodeRootView = (
      <div className={'node-view'}>
        <div className={'node-header'}>
          {node.name}
        </div>
        {nodeContentView}
        <div className={'node-inner-shadow'} />
      </div>
    );

    return (
      <Rnd 
        default={{
          x: node.viewData.position.x,
          y: node.viewData.position.y,
          width: node.viewData.size.x,
          height: node.viewData.size.y,
        }}
        // size={{width: node.size.x, height: node.size.y}}
        // position={node.position}
        onDragStop={(e, d)=>{
          this.placeNode(this, {x: d.x, y: d.y}, this.props.resources.callback)
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this.resizeNode(this, {x: ref.offsetWidth, y: ref.offsetHeight}, position, this.props.resources.callback)
        }}
        dragHandleClassName={'.node-header'}
      >
        {nodeRootView}
      </Rnd>
    );
  }
} 
