import { appConfig } from '../../config/appConfig';
import { IGraphNode, IGraphNodeSocket, SocketType } from '../../api/graph/IGraph';
import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IVector2 } from '../../api/IVector2';

export interface IGniosProps {
  socket: IGraphNodeSocket;
  node: IGraphNode;
  resources: IAppResources;
}

export class GraphNodeInOutSoket extends React.Component<IGniosProps> {

  state = {
    position: this.props.socket.position
  }

  updatePosition() {
    const node = this.props.node;
    const socket = this.props.socket;
    const myRect: any = ReactDOM.findDOMNode(this.refs[socket.id]).getBoundingClientRect();
    const newPosition: IVector2 = {
      x: myRect.x + myRect.width/2, 
      y: myRect.y + myRect.height/2
    }
    const graphDomElement: any = document.getElementById('node-graph-view');
    const graphViewRect = graphDomElement.getBoundingClientRect();
    const graphPos = {x: graphViewRect.x, y: graphViewRect.y};
    newPosition.x -= graphPos.x;
    newPosition.y -= graphPos.y;
    const oldPosition: IVector2 = this.state.position;
    if (newPosition.x !== oldPosition.x || newPosition.y !== oldPosition.y) {
      //if need to update data in store
      const newValues = {
        position: newPosition
      }

      this.setState({
        position: newPosition
      });

      if (socket.socketType === SocketType.input) {
        this.props.resources.callback(appConfig.Actions.NodeUpdateInputSocket(node.fullId, newValues))
      }
      else {
        this.props.resources.callback(appConfig.Actions.NodeUpdateOutputSocket(node.fullId, newValues))
      }
    }
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  render () {
    const className = 
    'inout-socket ' + 
    (
      this.props.socket.socketType === SocketType.input
      ? 'input-socket'
      : 'output-socket'
    );

    return (
      <div className={className} ref={this.props.socket.id}>
        <svg>
          <g>
            <circle cx={10} cy={10} r="9" stroke="#0d2b18" fill="#4e6957" />
          </g>
        </svg>
      </div>
    )
  }
}

