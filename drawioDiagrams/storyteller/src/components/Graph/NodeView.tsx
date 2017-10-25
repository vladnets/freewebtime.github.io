import { getFunctionById, getTypeById } from '../../helpers/index';
import { IVector2 } from '../../api/IVector2';
import * as React from 'react';
import './Node.css';
import { ICallback } from '../../api/index';
import { appConfig } from '../../config/appConfig';
import { ViewBase } from '../View';
import { IProject } from '../../api/IAppState';
import { INode, ITypeReference, IFunction, IType } from '../../api/INode';
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
    const func: IFunction = getFunctionById(node.reference, this.props.data) as IFunction;
    const type: IType = func 
      ? getTypeById(func.outputTypeId, this.props.data) as IType
      : getTypeById(node.reference, this.props.data) as IType;

    const outputItems = (): any|false => {
      if (func) {
        return Object.keys(func.output).map((key: string, index: number) => {
          const item = func.output[key];
          const outputType = getTypeById(item.typeId, this.props.data);
          const outputTypeName = outputType ? outputType.name : 'Unknown';
          return (
            <div key={item.id}>
              {item.name}
            </div>
          )
        }); 
      }
      else if (type && type.properties) {
        const typeProperties = type.properties;
        if (typeProperties) {
          return Object.keys(type.properties).map((key: string, index: number) => {
            const item = typeProperties[key];
            const propertyType = getTypeById(item.typeId, this.props.data);
            const propertyTypeName = propertyType ? propertyType.name : 'Unknown';
            return (
              <div key={item.id}>
                {item.name}
              </div>
            )
          }); 
        }
      }

      return false;
    };

    const inputItems = (): any|false => {
      if (func) {
        return Object.keys(func.input).map((key: string, index: number) => {
          const item = func.input[key];
          const inputType = getTypeById(item.typeId, this.props.data);
          const inputTypeName = inputType ? inputType.name : 'Unknown';
          return (
            <div key={item.id}>
              {item.name}
            </div>
          )
        }); 
      }

      return false;
    };

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
