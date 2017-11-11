import { resolveReference } from '../../helpers';
import { GraphNodeType, IFunctionNode, IGraphNode, IGraphNodeSocket, SocketType, IGraphNodeSockets } from '../../api/graph/IGraph';
import * as React from 'react';
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
import { IProjectOld } from '../../api/project/IProject';
import SvgComponent from '../SvgComponent';
import * as ReactDOM from 'react-dom';
import { ISocketsData } from '../../api/IAppState';
import { GraphNodeInOutSoket } from './GraphNodeInOutSoket';

export enum NodeViewDrawType {
  Node,
  Subnode,
}

export interface INodeViewProps {
  drawType: NodeViewDrawType;
  node: IGraphNode;
  project: IProjectOld;
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
      const fNode = node as IFunctionNode;
      if (fNode && fNode.output && fNode.subnodes) {
        return (
          Object.keys(fNode.output).map((key: string)=> {
            if (!fNode.subnodes) {
              return false;
            }

            const subnodeId = fNode.output[key];
            const subnode = fNode.subnodes[subnodeId];
            if (!subnode) {
              return false;
            }

            return (
              <NodeView 
                key={key} 
                drawType={NodeViewDrawType.Subnode} 
                node={subnode} 
                project={this.props.project} 
                resources={this.props.resources} 
              />
            )
          })
        )
      }

      return false;
    }

    const inputItems = () => {
      const fNode = node as IFunctionNode;
      if (fNode && fNode.input && fNode.subnodes) {
        return (
          Object.keys(fNode.input).map((key: string)=> {
            if (!fNode.subnodes) {
              return false;
            }

            const subnodeId = fNode.input[key];
            const subnode = fNode.subnodes[subnodeId];
            if (!subnode) {
              return false;
            }

            return (
              <NodeView 
                key={key} 
                drawType={NodeViewDrawType.Subnode} 
                node={subnode} 
                project={this.props.project} 
                resources={this.props.resources} 
              />
            )
          })
        )
      }

      return false;
    }

    const nodeOutputView = () => {
      if (node.nodeType !== GraphNodeType.Function) {
        return false;
      }
      
      return (
        <div className={'node-output'}>
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

    const inSocketView = () => {
      if (!node.sockets) {
        return false;
      }

      if (!node.sockets.input) {
        return false;
      }

      return (
        <GraphNodeInOutSoket
          socket={node.sockets.input}
          node={node}
          resources={this.props.resources}
        />
      )
    }

    const outSocketView = () => {
      if (!node.sockets) {
        return false;
      }

      if (!node.sockets.output) {
        return false;
      }

      return (
        <GraphNodeInOutSoket
          socket={node.sockets.output}
          node={node}
          resources={this.props.resources}
        />
      )
    }

    let typeName = '';
    if (node.typeReference) {
      const typeNode = resolveReference(node.typeReference, node, this.props.project);
      if (typeNode) {
        typeName = '(' + typeNode.name + ')';
      }
    }
    
    const nodeHeader = () => {
      return (
        <span>
        {node.name} {typeName}
        </span>
      )
    }

    const nodeRootView = () => {
      const className = 'node-view ' + 
        (this.props.drawType === NodeViewDrawType.Node
          ? 'fullheight'
          : ''
        )

      return (
        <div className={className}>
          <div className={'node-header'}>
            {inSocketView()}
            <div className={'node-header-content'}>
            {nodeHeader()}
            </div>
            {outSocketView()}
          </div>
          {nodeContentView()}
          <div className={'node-inner-shadow1'} />
        </div>
      )
    }

    const movableContainer = (children: any) => {
      const viewData = node.viewData || {};
      const pos = viewData.position || {x: 0, y: 0}
      const size = viewData.size || {x: 120, y: 60}

      return (
        <Rnd 
          default={{
            x: pos.x,
            y: pos.y,
            width: size.x,
            height: size.y,
          }}
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
      return (children);
    }

    const finalView = isMovable
      ? movableContainer(nodeRootView())
      : nonMovableContainer(nodeRootView())

    return (
      finalView
    );
  }
} 

