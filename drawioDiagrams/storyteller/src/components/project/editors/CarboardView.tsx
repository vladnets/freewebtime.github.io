import { PrimitiveSymbolView } from './cards/PrimitiveSymbolView';
import { ISymbol, SymbolType } from '../../../api/project/ISymbol';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../api/IAppState';
import { ICard } from '../../../api/project/ICard';
import { IProjectViewState } from '../ProjectView';
import { parsePath, getSubitems, getSubitemsIds, resolveReference } from '../../../helpers/index';
import { ReferencePathItem } from '../../../api/project/ReferencePath';
import { ICardboard } from '../../../api/project/ICardboard';
import { appConfig } from '../../../config/appConfig';
import { IHash } from '../../../api/IHash';
import { CardView, CardType } from './cards/CardView';
import { IProject } from '../../../api/project/IProject';
import { SymbolView } from './cards/SymbolView';

export interface ICardboardViewProps {
  cardboardId: string;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardboardView extends React.Component<ICardboardViewProps> {

  pathView = (cardboard: ICardboard) => {
    const namespace = cardboard.id;
    const path = parsePath(namespace);
    if (path) {
      return path.map((pathItem: ReferencePathItem, index: number) => {
        const prefix = index > 0 ? ' > ' : '';
        return (
          <div key={index} className={'cardboard-header-path-item'}>
          {prefix}{pathItem.toString()}
          </div>
        )        
      })
    }

    return false;
  }

  symbolView = (symbol: ISymbol, cardboard: ICardboard, appState: IAppState) => {
    return (
      <SymbolView symbol={symbol} cardboardId={cardboard.id} appState={appState} pvState={this.props.pvState} />
    )      
  }

  cardsView = (cardboard: ICardboard) => {
    const appState = this.props.appState;
    const project = appState.project;
    
    return Object.keys(cardboard.cards).map((cardId: string) => {
      const card = cardboard.cards[cardId];
      const symbol = resolveReference(card.id, project);
      const cardContent = symbol
        ? this.symbolView(symbol, cardboard, appState)
        : false
      ;
      
      return (
        <CardView 
          key={cardId}
          appState={this.props.appState}
          pvState={this.props.pvState}
          cardboardId={cardboard.id}
          card={card}
        >
        {cardContent}
        </CardView>
      )
    })
  }

  render () {
    const project = this.props.appState.project;
    const cardboardId = this.props.cardboardId;
    const cardboard = project.cardboards[cardboardId];
    
    if (!cardboard) {
      return false;
    }

    return (
      <div className={'cardboard-container container-vertical'}>
        <div className="cardboard-header">
        {this.pathView(cardboard)}
        </div>
        <div className={'cardboard-content container-vertical'}>
        {this.cardsView(cardboard)}
        </div>
      </div>
    )
  }
}