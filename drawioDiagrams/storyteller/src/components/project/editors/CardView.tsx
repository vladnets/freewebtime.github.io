import { IVector2 } from '../../../api/IVector2';
import { ICallback } from '../../../api';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import Rnd from 'react-rnd';
import { ICard } from '../../../api/project/ICard';
import { IAppState } from '../../../api/IAppState';
import { ISymbol } from '../../../api/project/ISymbol';
import { IProjectViewState } from '../ProjectView';
import { createReference } from '../../../helpers/index';
import { appConfig } from '../../../config/appConfig';

export interface ICardViewProps {
  symbol: ISymbol;
  cardboardId: string;
  appState: IAppState;
  pvState: IProjectViewState;
}

interface ICardViewState {
  card: ICard|undefined;
}

export class CardView extends React.Component<ICardViewProps, ICardViewState> {

  createCard = (symbol: ISymbol) => {
    const cardId = symbol.fullId;

    const card = {
      id: cardId,
      name: symbol.name,
      symbol: createReference(symbol),
      position: {x: 100, y: 200},
      size: {x: 180, y: 75},
    }

    return card;
  }

  componentWillMount() {
    const appState = this.props.appState;
    const cardboardId = this.props.cardboardId;
    const symbol = this.props.symbol;
    const cardId = symbol.fullId;
    const cardboard = appState.project.cardboards[cardboardId];
    let card: ICard|undefined;
    if (cardboard) {
      card = cardboard.cards[cardId];
    }

    if (!card) {
      card = this.createCard(symbol);

      this.setState({
        ...this.state,
        card: card,
      })

      const action = appConfig.Actions.CardAdd(cardboardId, card);
      appState.resources.callback(action);
    }
  }

  moveCard = (deltaPos: IVector2, callback: ICallback) => {
    const card = this.state.card;
    if (card) {
      const currentPos = card.position;
      const newValues = {
        position: {
          x: currentPos.x + deltaPos.x, 
          y: currentPos.y + deltaPos.y
        }
      }

      const cardboardId = this.props.cardboardId;
      const action = appConfig.Actions.CardUpdate(cardboardId, card.id, newValues);
      const appState = this.props.appState;
      appState.resources.callback(action);      
    }
  }
  placeCard = (newPos: IVector2, callback: ICallback) => {
    const card = this.state.card;
    if (card) {
      const currentPos = card.position;
      const newValues = {
        position: newPos
      }

      const cardboardId = this.props.cardboardId;
      const action = appConfig.Actions.CardUpdate(cardboardId, card.id, newValues);
      const appState = this.props.appState;
      appState.resources.callback(action);      
    }     
  }
  resizeCard = (deltaSize: IVector2, newPos: IVector2, callback: ICallback) => {
    const card = this.state.card;
    if (card) {
      const currentPos = card.position;
      const currentSize = card.size;
      const newSize = {
        x: Math.max(deltaSize.x, 10), 
        y: Math.max(deltaSize.y, 10)
      }
      const newValues = {
        position: newPos,
        size: newSize,
      }

      const cardboardId = this.props.cardboardId;
      const action = appConfig.Actions.CardUpdate(cardboardId, card.id, newValues);
      const appState = this.props.appState;
      appState.resources.callback(action);      
    }     
  }

  render () {

    const card: ICard = this.state.card || this.createCard(this.props.symbol);

    const movableContainer = (children: any) => {

      const pos = card.position;
      const size = card.size;

      return (
        <Rnd 
          default={{
            x: pos.x,
            y: pos.y,
            width: size.x,
            height: size.y,
          }}
          onDragStop={(e, d)=>{
            this.placeCard({x: d.x, y: d.y}, this.props.appState.resources.callback)
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            this.resizeCard({x: ref.offsetWidth, y: ref.offsetHeight}, position, this.props.appState.resources.callback)
          }}
          dragHandleClassName={'.card-drag-handler'}
        >
          {children}
        </Rnd>
      )
    }
    
    const headerStyle = {};
    if (card.color) {
      headerStyle['backgroundColor'] = card.color;
    }
    delete headerStyle['backgroundColor'];

    const cardContainerClass = 'card-container card container-vertical fullwidth fullheight'
      + (card.isSelected ? ' selected' : '')
    ;

    return (
      movableContainer(
        <div className={cardContainerClass}>
          <div className="card-header container-horizontal card-drag-handler" style={headerStyle}>
            <div className="input-container">
              Input
            </div>
            <div className="content-container">
              {card.name}
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