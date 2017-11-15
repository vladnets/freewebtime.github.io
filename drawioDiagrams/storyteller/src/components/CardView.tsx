import { IVector2 } from '../api/IVector2';
import { IAppState } from '../api/IAppState';
import * as React from 'react';
import { IHash } from '../api/IHash';
import FontAwesome from 'react-fontawesome';
import { ICard } from '../api/project/ICard';
import Rnd from 'react-rnd';
import { appConfig } from '../config/appConfig';
import { ICallback } from '../api/index';

export interface ICardViewState {
  position: IVector2;
  size: IVector2;
}
export class CardView extends React.Component<{card: ICard, appState: IAppState}, ICardViewState> {
  state = {
    position: {x: 100, y: 100},
    size: {x: 180, y: 70}
  }

  moveCard(self: CardView, deltaPos: IVector2, callback: ICallback) {
    const currentPos = this.state.position;
    const newValues = {
      position: {
        x: currentPos.x + deltaPos.x, 
        y: currentPos.y + deltaPos.y
      }
    }

    this.setState({...this.state, ...newValues})
  }
  placeCard(self: CardView, newPos: IVector2, callback: ICallback) {
    const newValues = {
      position: newPos
    }

    this.setState({...this.state, ...newValues})
  }
  resizeCard(self: CardView, deltaSize: IVector2, newPos: IVector2, callback: ICallback) {
    const currentPos = this.state.position;
    const currentSize = this.state.size;
    const newSize = {
      x: Math.max(deltaSize.x, 10), 
      y: Math.max(deltaSize.y, 10)
    }
    const newValues = {
      position: newPos,
      size: newSize,
    }

    this.setState({...this.state, ...newValues})
  }

  render () {
    const movableContainer = (children: any) => {

      const pos = this.state.position;
      const size = this.state.size;

      return (
        <Rnd 
          default={{
            x: pos.x,
            y: pos.y,
            width: size.x,
            height: size.y,
          }}
          onDragStop={(e, d)=>{
            this.placeCard(this, {x: d.x, y: d.y}, this.props.appState.resources.callback)
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            this.resizeCard(this, {x: ref.offsetWidth, y: ref.offsetHeight}, position, this.props.appState.resources.callback)
          }}
          dragHandleClassName={'.card-drag-handler'}
        >
          {children}
        </Rnd>
      )
    }
    
    const headerStyle = {};
    if (this.props.card.color) {
      headerStyle['backgroundColor'] = this.props.card.color;
    }
    delete headerStyle['backgroundColor'];

    const cardContainerClass = 'card-container card container-vertical fullwidth fullheight'
      + (this.props.card.isSelected ? ' selected' : '')
    ;

    return (
      movableContainer(
        <div className={cardContainerClass}>
          <div className="card-header container-horizontal card-drag-handler" style={headerStyle}>
            <div className="input-container">
              Input
            </div>
            <div className="content-container">
              {this.props.card.name}
            </div>
            <div className="output-container">
              Output
            </div>
          </div>
          <div className="card-content container-horizontal">
            <div className="input-container">
              Input
            </div>
            <div className="content-container">
              Card content
            </div>
            <div className="output-container">
              Output
            </div>
          </div>
        </div>
      )
    )
  }
}