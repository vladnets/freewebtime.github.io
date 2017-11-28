import { getCard } from '../../../helpers';
import { IVector2 } from '../../../api/IVector2';
import { ICallback } from '../../../api';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import Rnd from 'react-rnd';
import { ICard } from '../../../api/project/ICard';
import { IAppState } from '../../../api/IAppState';
import { ISymbol } from '../../../api/project/ISymbol';
import { IProjectViewState } from '../ProjectView';
import { createReference, resolveReferenceFast } from '../../../helpers/index';
import { appConfig } from '../../../config/appConfig';

export interface ICardViewProps {
  symbolId: string;
  cardboardId: string;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardView extends React.Component<ICardViewProps> {

  moveCard = (deltaPos: IVector2, callback: ICallback) => {
    const cardboardId = this.props.cardboardId;
    const cardId = this.props.symbolId;
    const appState = this.props.appState;
    const project = appState.project;
    const card = getCard(cardboardId, cardId, project);
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
    const cardboardId = this.props.cardboardId;
    const cardId = this.props.symbolId;
    const appState = this.props.appState;
    const project = appState.project;
    const card = getCard(cardboardId, cardId, project);
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
    const cardboardId = this.props.cardboardId;
    const cardId = this.props.symbolId;
    const appState = this.props.appState;
    const project = appState.project;
    const card = getCard(cardboardId, cardId, project);
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

  movableContainer = (children: any) => {
    const cardboardId = this.props.cardboardId;
    const cardId = this.props.symbolId;
    const appState = this.props.appState;
    const project = appState.project;
    const card = getCard(cardboardId, cardId, project);
    
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

    return false;
  }

  render () {
    
    const cardboardId = this.props.cardboardId;
    const cardId = this.props.symbolId;
    const appState = this.props.appState;
    const project = appState.project;
    const card = getCard(cardboardId, cardId, project);
    
    if (card) {
      const headerStyle = {};
      if (card.color) {
        headerStyle['backgroundColor'] = card.color;
      }
      delete headerStyle['backgroundColor'];
  
      const cardContainerClass = 'card-container card container-vertical fullwidth fullheight'
        + (card.isSelected ? ' selected' : '')
      ;

      return (
        this.movableContainer(
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

    return false;
  }
}