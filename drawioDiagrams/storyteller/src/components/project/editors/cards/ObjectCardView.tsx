import { getCard, resolveReference } from '../../../../helpers';
import { CardView } from './CardView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IProjectViewState } from '../../ProjectView';
import { IAppState } from '../../../../api/IAppState';
import { CardSocketView, CardSocketType } from '../CardSocketView';
import { ICard } from '../../../../api/project/ICard';
import { ISymbol } from '../../../../api/project/ISymbol';

export interface IObjectCardViewProps {
  symbol: ISymbol;
  cardboardId: string;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class ObjectCardView extends React.Component<IObjectCardViewProps> {
  headerInputView = (card: ICard, symbol: ISymbol) => {
    return (
      <div className="input-container">
        <CardSocketView socketType={CardSocketType.Input} symbolId={card.id} cardboardId={this.props.cardboardId} />
      </div>
    )
  }

  headerOutputView = (card: ICard, symbol: ISymbol) => {
    return (
      <div className="output-container">
        <CardSocketView socketType={CardSocketType.Output} symbolId={card.id} cardboardId={this.props.cardboardId} />
      </div>
    )
  }

  headerValueView = (card: ICard, symbol: ISymbol) => {
    return (
      <div className="content-container">
        {card.name}
      </div>
    )
  }
  contentInputView = (card: ICard, symbol: ISymbol) => {
    return (
      <div className="input-container">
        Input
      </div>
    )
  }
  contentOutputView = (card: ICard, symbol: ISymbol) => {
    return (
      <div className="output-container">
        Output
      </div>
    )
  }
  contentValueView = (card: ICard, symbol: ISymbol) => {
    return (
      <div className="content-container">
        Card value
      </div>
    )
  }

  render () {
    const project = this.props.appState.project;
    const symbol = this.props.symbol;
    const card = getCard(this.props.cardboardId, symbol.fullId, project);
    
    if (!card || !symbol) {
      return false;
    }

    return (
      <CardView 
        appState={this.props.appState}
        pvState={this.props.pvState}
        symbolId={symbol.fullId}
        cardboardId={this.props.cardboardId}
        inputView={this.contentInputView(card, symbol)}
        outputView={this.contentOutputView(card, symbol)}
        valueView={this.contentValueView(card, symbol)}
        headerInputView={this.headerInputView(card, symbol)}
        headerOutputView={this.headerOutputView(card, symbol)}
        headerValueView={this.headerValueView(card, symbol)}
      />
    )
  }
}