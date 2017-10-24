import { IVector2 } from '../../api/IVector2';
import * as React from 'react';
import './Node.css';
import { ICallback } from '../../api/index';
import { appConfig } from '../../config/appConfig';
import { ViewBase } from '../View';
import { IProject } from '../../api/IAppState';
import { INode } from '../../api/INode';
import { IAppResources } from '../../api/IAppResources';
import Rnd from 'react-rnd';
import * as FA from 'react-fontawesome';

export class NodeView extends ViewBase<{data: IProject, node: INode, resources: IAppResources}> {
  state = {
    node: undefined,
    callback: undefined,
  }
  
  moveNode(self: NodeView, deltaPos: IVector2, callback: ICallback) {
    const node = self.props.node;
    const newPos = {
      x: node.position.x + deltaPos.x, 
      y: node.position.y + deltaPos.y
    }
    const newNode = {...node, position: newPos};

    callback(appConfig.Actions.NodeUpdate(newNode));
  }
  placeNode(self: NodeView, newPos: IVector2, callback: ICallback) {
    const node = self.props.node;
    const newNode = {...node, position: newPos};

    callback(appConfig.Actions.NodeUpdate(newNode));
  }
  resizeNode(self: NodeView, deltaSize: IVector2, newPos: IVector2, callback: ICallback) {
    const node = self.props.node;
    const newSize1 = {
      x: node.size.x + deltaSize.x, 
      y: node.size.y + deltaSize.y
    }
    const newSize = deltaSize;

    newSize.x = Math.max(newSize.x, 10);
    newSize.y = Math.max(newSize.y, 10);
    
    const newNode = {...node, size: newSize, position: newPos};

    callback(appConfig.Actions.NodeUpdate(newNode));
  }

  render() {
    const node = this.props.node;
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const outputItems = (
      items.map((item: number, index) => {
        return (
          <div key={item}>
            Hello world {item}
          </div>
        )
      })
    );

    const nodeOutputView = (
      <div className={'node-output'}>
        {outputItems}
      </div>
    );
    const nodeInputView = (
      <div className={'node-input'}>
        Input item 1<br />
        Input item 2<br />
        Input item 3<br />
        Input item 4<br />
      </div>
    );

    const nodeBodyView = (
      <div className={'node-body'}>
      Водитель банды грабителей банков в день ограбления просыпается в квартире любовницы, врет подельникам, что уже выехал, и выясняет, что любовница уже ушла на работу, квартиру заперла и ключей ему не оставила, а ограбление, с которого он должен забрать грабителей, уже началось.
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
          {this.props.node.name}
        </div>
        {nodeContentView}
        <div className={'node-inner-shadow'} />
      </div>
    );

    return (
      <Rnd 
        default={{
          x: node.position.x,
          y: node.position.y,
          width: node.size.x,
          height: node.size.y,
        }}
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
