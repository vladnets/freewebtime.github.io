import { resolveReference } from '../../helpers';
import { IGraphNode, GraphNodeType } from '../../api/graph/IGraph';
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
import { IHash } from '../../api/IHash';
import { IProject } from '../../api/project/IProject';

export enum NodeViewDrawType {
  Node,
  Subnode,
}

export interface INodeViewProps {
  drawType: NodeViewDrawType;
  node: IGraphNode;
  project: IProject;
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

    callback(appConfig.Actions.NodeUpdateViewData(node.fullId, newValues));
  }
  placeNode(self: NodeView, newPos: IVector2, callback: ICallback) {
    const node = self.props.node;
    const currentPos = node.viewData.position;
    const newValues = {
      position: newPos
    }
    callback(appConfig.Actions.NodeUpdateViewData(node.fullId, newValues));
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
    callback(appConfig.Actions.NodeUpdateViewData(node.fullId, newValues));
  }

  render() {
    
    const node = this.props.node;
    const isMovable = this.props.drawType === NodeViewDrawType.Node;

    const outputItems = () => {
      return false;
    }

    const inputItems = () => {
      return false;
    }

    const nodeOutputView = () => {
      if (node.nodeType !== GraphNodeType.Function) {
        return false;
      }
      
      return (
        <div className={'node-output'}>
        Output area  
        {outputItems()}
        </div>
      )
    } 

    const nodeInputView = () => {
      if (node.nodeType !== GraphNodeType.Function) {
        return false;
      }

      return (
        <div className={'node-input'}>
        Input area
        {inputItems()}
        </div>
      )
    } 

    const subnodesView = (subnodes: IHash<IGraphNode>) => {
      return (
        Object.keys(subnodes).map((key: string, index: number)=>{
          const subnode = subnodes[key];
          return (
            <NodeView 
              drawType={NodeViewDrawType.Subnode} 
              node={subnode}
              resources={this.props.resources}
              project={this.props.project}
              key={subnode.id}
            />
          )
        })
      )
    }

    const nodeBodyView = () => {
      const wrapper = (children: any) => {
        return (
          <div className={'node-body'}>
          {children}
          </div>
        )
      }

      if (node.nodeType === GraphNodeType.Construction) {
        const subnodes = node.subnodes || {}

        return (wrapper(
          subnodesView(subnodes)
        ))
      }

      return (wrapper(
        <span>hello world</span>
      ));
    } 

    const nodeContentView = () => {
      return (
        <div className={'node-content'}>
          {nodeInputView()}
          {nodeBodyView()}
          {nodeOutputView()}
          </div>
      )
    }

    const nodeRootView = () =>
    {
      const className = 'node-view ' + 
        (this.props.drawType === NodeViewDrawType.Node
          ? 'fullheight'
          : ''
        )

      let typeName = node.name;
      if (node.typeReference) {
        const typeNode = resolveReference(node.typeReference, node, this.props.project);
        if (typeNode) {
          typeName = typeNode.name;
        }
      }

      return (
        <div className={className}>
          <div className={'node-header'}>
            {node.name} ({typeName})
          </div>
          {nodeContentView()}
          <div className={'node-inner-shadow1'} />
        </div>
      )
    }

    const movableContainer = (children: any) => {
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
          {children}
        </Rnd>
      )
    }
    const nonMovableContainer = (children: any) => {
      return (children)
    }

    const finalView = isMovable
      ? movableContainer(nodeRootView())
      : nonMovableContainer(nodeRootView())

    return (
      finalView
    );
  }
} 

