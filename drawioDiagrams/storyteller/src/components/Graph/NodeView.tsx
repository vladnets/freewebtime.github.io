import { getFunctionById, getTypeById, getTypeByReference, getFunctionOfFunctionCall } from '../../helpers/index';
import { IVector2 } from '../../api/IVector2';
import * as React from 'react';
import './Node.css';
import { ICallback } from '../../api/index';
import { appConfig } from '../../config/appConfig';
import { ViewBase } from '../View';
import { IFunction, IFunctionCall, IModule, INode, IType, NodeType } from '../../api/INode';
import { IAppResources } from '../../api/IAppResources';
import Rnd from 'react-rnd';
import * as FA from 'react-fontawesome';
import { IProject } from '../../api/IAppState';
import { v4 } from 'node-uuid';

export class NodeView extends ViewBase<{module: IModule, func: IFunction, resources: IAppResources, project: IProject}> {
  state = {
    node: this.props.module.nodes[this.props.func.id],
    callback: this.props.resources.callback,
    func: this.props.func,
    module: this.props.module,
  }

  componentWillMount() {
    const func = this.props.func;
    let node = this.props.module.nodes[func.id];

    if (!node) {
      node = {
        id: func.id,
        name: func.name,
        reference: func.id,
        nodeType: NodeType.Function,
        size: {x: 120, y: 80},
        position: {x: 100, y: 100},
      };

      this.setState({
        ...this.state,
        node: node
      });

      this.props.resources.callback(appConfig.Actions.NodeUpdate(node, this.state.module.id));
    }
  }

  moveNode(self: NodeView, deltaPos: IVector2, callback: ICallback, module: IModule) {
    const node = self.state.node;
    const newPos = {
      x: node.position.x + deltaPos.x, 
      y: node.position.y + deltaPos.y
    }
    const newNode = {...node, position: newPos};

    callback(appConfig.Actions.NodeUpdate(newNode, module.id));
  }
  placeNode(self: NodeView, newPos: IVector2, callback: ICallback, module: IModule) {
    const node = self.state.node;
    const newNode = {...node, position: newPos};

    callback(appConfig.Actions.NodeUpdate(newNode, module.id));
  }
  resizeNode(self: NodeView, deltaSize: IVector2, newPos: IVector2, callback: ICallback, module: IModule) {
    const node = self.state.node;
    const newSize1 = {
      x: node.size.x + deltaSize.x, 
      y: node.size.y + deltaSize.y
    }
    const newSize = deltaSize;

    newSize.x = Math.max(newSize.x, 10);
    newSize.y = Math.max(newSize.y, 10);
    
    const newNode = {...node, size: newSize, position: newPos};

    callback(appConfig.Actions.NodeUpdate(newNode, module.id));
  }

  render() {
    
    const func = this.state.func;
    const module = this.state.module;
    const project = this.props.project;
    const node = this.state.node;

    const outputItem = (key, func, type) => (
      <div key={key}>
      {func.output[key].name}
      <br />
      {type.name}
      </div>
    );

    const outputItems = func
      ? (Object.keys(func.output).map((key: string, index: number) => (
        outputItem(key, func, getFunctionOfFunctionCall(func.output[key], module, project))
      ))) 
      : false;

    const inputItem = (key, func, type) => (
      <div key={key}>
      {func.input[key].name}
      <br />
      {type.name}
      </div>
    );

    const inputItems = func
      ? (Object.keys(func.input).map((key: string, index: number) => (
        inputItem(key, func, getTypeByReference(func.input[key], module, project))
      ))) 
      : false;
  
    const nodeOutputView = (
      <div className={'node-output'}>
        {outputItems}
      </div>
    );
    const nodeInputView = (
      <div className={'node-input'}>
        {inputItems}
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
          x: node.position.x,
          y: node.position.y,
          width: node.size.x,
          height: node.size.y,
        }}
        // size={{width: node.size.x, height: node.size.y}}
        // position={node.position}
        onDragStop={(e, d)=>{
          this.placeNode(this, {x: d.x, y: d.y}, this.props.resources.callback, this.state.module)
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this.resizeNode(this, {x: ref.offsetWidth, y: ref.offsetHeight}, position, this.props.resources.callback, this.state.module)
        }}
        dragHandleClassName={'.node-header'}
      >
        {nodeRootView}
      </Rnd>
    );
  }
} 
