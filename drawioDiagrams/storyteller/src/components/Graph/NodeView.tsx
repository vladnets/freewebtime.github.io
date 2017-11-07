import { resolveReference } from '../../helpers';
import { IGraphNode, GraphNodeType, IFunctionNode } from '../../api/graph/IGraph';
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
import SvgComponent from '../SvgComponent';
import * as ReactDOM from 'react-dom';
import { ISocketsData } from '../../api/IAppState';

export enum NodeViewDrawType {
  Node,
  Subnode,
}

export interface INodeViewProps {
  drawType: NodeViewDrawType;
  node: IGraphNode;
  project: IProject;
  visibleSockets: IHash<string>;
  socketsData: ISocketsData;
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
                visibleSockets={this.props.visibleSockets}
                socketsData={this.props.socketsData}
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
                visibleSockets={this.props.visibleSockets}
                socketsData={this.props.socketsData}
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
              visibleSockets={this.props.visibleSockets}
              key={subnode.id}
              socketsData={this.props.socketsData}
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

    const nodeRootView = () => {
      const className = 'node-view ' + 
        (this.props.drawType === NodeViewDrawType.Node
          ? 'fullheight'
          : ''
        )

      let typeName = '';
      if (node.typeReference) {
        const typeNode = resolveReference(node.typeReference, node, this.props.project);
        if (typeNode) {
          typeName = '(' + typeNode.name + ')';
        }
      }

      return (
        <div className={className}>
          <div className={'node-header'}>
            <GraphNodeInOutSoket 
              socketType={SocketType.Input} 
              node={node} 
              resources={this.props.resources}
              socketsData={this.props.socketsData}
              visibleSockets={this.props.visibleSockets}  
            />
            <div className={'node-header-content'}>
            {node.name} {typeName}
            </div>
            <GraphNodeInOutSoket 
              socketType={SocketType.Output} 
              node={node} 
              visibleSockets={this.props.visibleSockets}
              resources={this.props.resources}
              socketsData={this.props.socketsData}
            />
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

export enum SocketType {Input, Output}
export interface IGniosProps {
  socketType: SocketType;
  node: IGraphNode;
  visibleSockets: IHash<string>;
  socketsData: ISocketsData;
  resources: IAppResources;
}

export class GraphNodeInOutSoket extends React.Component<IGniosProps> {
  state = {...this.props};

  componentDidMount() {
    const rect: any = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const socketPosition: IVector2 = {
      x: rect.x,
      y: rect.y
    }
    const action = appConfig.Actions.InoutSocketSetPosition(this.state[('socketId')], socketPosition);
    this.state.resources.callback(action);
  }
  
  componentWillMount() {
    const newState = {...this.state}
    const socketId = 
    (
      this.props.socketType === SocketType.Input
      ? 'input-'
      : 'output-'
    )
    + this.props.node.fullId;
    newState[('socketId')] = socketId;
    newState[('clientRect')] = undefined;

    this.setState(newState);
  }

  render () {

    const className = 
    'inout-socket ' + 
    (
      this.props.socketType === SocketType.Input
      ? 'input-socket'
      : 'output-socket'
    );

    const socketId = this.state[('socketId')];
    this.props.visibleSockets[socketId] = socketId;

    return (
      <div className={className}>
        <svg>
          <g>
            <circle cx={10} cy={10} r="9" stroke="#0d2b18" fill="#4e6957" />
          </g>
        </svg>
      </div>
    )
  }
}

