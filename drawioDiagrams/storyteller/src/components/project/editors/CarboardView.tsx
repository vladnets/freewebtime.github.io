import { ISymbol } from '../../../api/project/ISymbol';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardView } from './CardView';
import { IAppState } from '../../../api/IAppState';
import { ICard } from '../../../api/project/ICard';
import { IProjectViewState } from '../ProjectView';
import { IReference } from '../../../api/project/IReference';
import { parsePath, createReference } from '../../../helpers/index';
import { ReferencePathItem } from '../../../api/project/ReferencePath';
import { ICardboard } from '../../../api/project/ICardboard';
import { appConfig } from '../../../config/appConfig';

export interface ICardboardViewProps {
  rootSymbol: ISymbol;
  appState: IAppState;
  pvState: IProjectViewState;
}

interface ICardboardViewState {
  cardboard: ICardboard|undefined;
}

export class CardboardView extends React.Component<ICardboardViewProps, ICardboardViewState> {
  
  componentWillMount() {
    const appState = this.props.appState;
    const rootSymbol = this.props.rootSymbol;
    const cardboardId = rootSymbol.fullId;
    let cardboard = this.state ? this.state.cardboard : undefined;
    if (cardboard && cardboard.id !== rootSymbol.fullId) {
      cardboard = undefined;
    }

    if (!cardboard) {
      const project = appState.project;
      const cardboards = project.cardboards;
      cardboard = cardboards[cardboardId];
    }

    if (!cardboard) {
      cardboard = {
        id: cardboardId,
        name: rootSymbol.name,
        cards: {},
        rootSymbolRef: createReference(rootSymbol),
      };

      this.setState({
        ...this.state,
        cardboard: cardboard
      });

      const action = appConfig.Actions.CardboardAdd(cardboard);
      appState.resources.callback(action);
    }
  }

  pathView = () => {
    const rootSymbol = this.props.rootSymbol;
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

    return false;
  }

  cardsView = () => {
    const cardboard = this.state.cardboard;
    if (cardboard) {
      const cardboardId = cardboard.id;
      const symbols = this.props.appState.project.symbols;
      return Object.keys(symbols).map((symbolId: string, index: number) => {
        const symbol = symbols[symbolId];
  
        return (
          <CardView key={symbolId} symbol={symbol} cardboardId={cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
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