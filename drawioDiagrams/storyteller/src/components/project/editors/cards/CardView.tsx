import { IAppState } from '../../../../api/IAppState';
import { IProjectViewState } from '../../ProjectView';
import { IVector2 } from '../../../../api/IVector2';
import { ICallback } from '../../../../api';
import { getCard } from '../../../../helpers';
import { appConfig } from '../../../../config/appConfig';
import { ICard } from '../../../../api/project/ICard';
import { ISymbol } from '../../../../api/project/ISymbol';
import { CardSocketView, CardSocketType } from './CardSocketView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import Rnd from 'react-rnd';

export enum CardType {
  Unknown = 'Unknown',
  Card = 'Card',
  Subcard = 'Subcard',
}

export interface ICardViewProps {
  cardboardId: string;
  card: ICard;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardView extends React.Component<ICardViewProps> {

  moveCard = (deltaPos: IVector2, callback: ICallback) => {
    const cardboardId = this.props.cardboardId;
    const card = this.props.card;
    
    if (!card) {
      return;
    }

    const cardId = card.id;
    const appState = this.props.appState;
    const currentPos = card.position;
    const newValues = {
      position: {
        x: currentPos.x + deltaPos.x, 
        y: currentPos.y + deltaPos.y
      }
    }

    const action = appConfig.Actions.CardUpdate(cardboardId, card.id, newValues);
    appState.resources.callback(action);      
  }
  placeCard = (newPos: IVector2, callback: ICallback) => {
    const cardboardId = this.props.cardboardId;
    const card = this.props.card;
    
    if (!card) {
      return;
    }

    const cardId = card.id;
    const appState = this.props.appState;
    const currentPos = card.position;
    const newValues = {
      position: newPos
    }

    const action = appConfig.Actions.CardUpdate(cardboardId, card.id, newValues);
    appState.resources.callback(action); 
  }
  resizeCard = (deltaSize: IVector2, newPos: IVector2, callback: ICallback) => {
    const cardboardId = this.props.cardboardId;
    const card = this.props.card;
    
    if (!card) {
      return;
    }

    const cardId = card.id;
    const appState = this.props.appState;
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

    const action = appConfig.Actions.CardUpdate(cardboardId, card.id, newValues);
    appState.resources.callback(action); 

  }

  movableContainer = (card: ICard, children: any) => {
    const appState = this.props.appState;
    const callback = appState.resources.callback;


    if (card) {
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
            this.placeCard({x: d.x, y: d.y}, callback)
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            this.resizeCard({x: ref.offsetWidth, y: ref.offsetHeight}, position, callback)
          }}
          dragHandleClassName={'.card-drag-handler'}
        >
          {children}
        </Rnd>
      )
    }

    return false;
  }

  headerView = (card: ICard|undefined, symbol: ISymbol) => {
    return false;

    // return (
    //   <div className="card-header container-horizontal card-drag-handler">
    //     {this.props.headerInputView}
    //     {this.props.headerValueView}
    //     {this.props.headerOutputView}
    //   </div>
    // )
  }

  contentView = (card: ICard|undefined, symbol: ISymbol) => {
    return false;

    // return (
    //   <div className="card-content container-horizontal">
    //   {this.props.inputView}
    //   {this.props.valueView}
    //   {this.props.outputView}
    //   </div>
    // )
  }

  render () {
    const cardboardId = this.props.cardboardId;
    const card = this.props.card;
    
    if (!card) {
      return false;
    }

    let cardContainerClass = 'card-container card container-vertical fullwidth fullheight';  
    cardContainerClass += (card.isSelected ? ' selected' : '');

    return (
      this.movableContainer(
        card, 
        (
          <div className={cardContainerClass}>
          {this.props.children}
          </div>
        )
      )
    )
  }
}