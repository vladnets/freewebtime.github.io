import { ISymbol } from '../../../api/project/ISymbol';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardView } from './CardView';
import { IAppState } from '../../../api/IAppState';
import { ICard } from '../../../api/project/ICard';
import { IProjectViewState } from '../ProjectView';
import { IReference } from '../../../api/project/IReference';
import { parsePath, createReference, resolveReference, resolveReferenceFast, getSubitems, getSubitemsIds } from '../../../helpers/index';
import { ReferencePathItem } from '../../../api/project/ReferencePath';
import { ICardboard } from '../../../api/project/ICardboard';
import { appConfig } from '../../../config/appConfig';
import { IHash } from '../../../api/IHash';

export interface ICardboardViewProps {
  rootSymbolId: string;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardboardView extends React.Component<ICardboardViewProps> {

  componentWillMount() {
    this.checkForCardboard();
  }

  componentDidUpdate() {
    this.checkForCardboard();
  }

  createCard = (symbol: ISymbol): ICard => {
    return {
      id: symbol.fullId,
      name: symbol.name,
      position: {x: 100, y: 200},
      size: {x: 180, y: 75},
    }
  }

  createCards = (symbols: IHash<ISymbol>) => {
    const appState = this.props.appState;
    const project = appState.project;
    const rootSymbolId = this.props.rootSymbolId;
    const result = {};
    if (symbols) {
      Object.keys(symbols).map((symbolId: string) => {
        const symbol = symbols[symbolId];
        const card = this.createCard(symbol);
        result[card.id] = card;
      })
    }

    return result;
  }

  checkForCardboard = () => {
    const appState = this.props.appState;
    const project = appState.project;
    const rootSymbolId = this.props.rootSymbolId;
    const subitems = getSubitems(rootSymbolId, project);
    console.log('subitems', subitems);
    const rootSymbol = resolveReferenceFast(rootSymbolId, project);
    
    if (rootSymbol) {
      const cardboard = project.cardboards[rootSymbolId];
    
      if (!cardboard) {
        let cards = {}
    
        if (subitems) {
          cards = this.createCards(subitems);
        }

        const newCardboard: ICardboard = {
          id: rootSymbolId,
          name: rootSymbol.name,
          rootSymbolRef: createReference(rootSymbol),
          cards: cards,
        }

        const action = appConfig.Actions.CardboardAdd(newCardboard);
        appState.resources.callback(action);
      }
      
      else {
        //if cardboard is there. check for all the cards
        const addedCards = {}
        let isCardsAdded = false;

        if (subitems) {
          Object.keys(subitems).map((symbolId: string) => {
            const symbol = subitems[symbolId];
            
            if (symbol) {
              const card = cardboard.cards[symbolId];
            
              if (!card) {
                const newCard = this.createCard(symbol);
                
                if (newCard) {
                  addedCards[newCard.id] = newCard;
                  isCardsAdded = true;
                }
              
              }
            
            }

          })
          
        }

        if (isCardsAdded) {
          const newCards = {
            ...cardboard.cards,
            ...addedCards,
          }
          const action = appConfig.Actions.CardboardUpdate(rootSymbolId, {cards: newCards});
          appState.resources.callback(action);
        }

      }

    }
  }

  pathView = () => {
    const rootSymbolId = this.props.rootSymbolId;
    const appState = this.props.appState;
    const project = appState.project;
    const rootSymbol = resolveReferenceFast(rootSymbolId, project);
    if (rootSymbol) {
      const path = parsePath(rootSymbol.fullId);
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
    }

    return false;
  }

  cardsView = () => {
    const appState = this.props.appState;
    const project = appState.project;
    const rootSymbolId = this.props.rootSymbolId;
    const cardboardId = rootSymbolId;
    const symbolsIds = getSubitemsIds(rootSymbolId, project);
    if (symbolsIds) {
      return Object.keys(symbolsIds).map((symbolId: string) => {
        return (
          <CardView key={symbolId} symbolId={symbolId} cardboardId={cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      })
    }

    return false;
  }

  render () {
    return (
      <div className={'cardboard-container container-vertical'}>
        <div className="cardboard-header">
        {this.pathView()}
        </div>
        <div className="cardboard-content">
        {this.cardsView()}
        </div>
      </div>
    )
  }
}

// <div className="cardboard-content">
// <CardView card={card} appState={this.props.appState} />
// <CardView card={card2} appState={this.props.appState} />
// <CardView card={card3} appState={this.props.appState} />
// <CardView card={card4} appState={this.props.appState} />
// </div>