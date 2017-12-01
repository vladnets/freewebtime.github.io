import { ICard } from '../../../../api/project/ICard';
import { CardSocketType, CardSocketView } from './CardSocketView';
import { ISymbol } from '../../../../api/project/ISymbol';
import { IProjectViewState } from '../../ProjectView';
import { IAppState } from '../../../../api/IAppState';
import * as React from 'react';
import { CardView } from './CardView';
import { getCard } from '../../../../helpers/index';

export interface ICardViewBaseProps {
  symbol: ISymbol;
  card: ICard;
  cardboardId: string;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardViewBase extends React.Component<ICardViewBaseProps> {
  headerInputView = (): any => {
    return (
      <div className="input-container">
        <CardSocketView socketType={CardSocketType.Input} symbol={this.props.symbol} cardboardId={this.props.cardboardId} />
      </div>
    )
  }

  headerOutputView = (): any => {
    return (
      <div className="output-container">
        <CardSocketView socketType={CardSocketType.Output} symbol={this.props.symbol} cardboardId={this.props.cardboardId} />
      </div>
    )
  }

  headerValueView = (): any => {
    return (
      <div className="content-container">
        {this.props.card.name}
      </div>
    )
  }
  contentInputView = (): any => {
    return false;
  }
  contentOutputView = (): any => {
    return false;
  }
  contentValueView = (): any => {
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
        inputView={this.contentInputView()}
        outputView={this.contentOutputView()}
        valueView={this.contentValueView()}
        headerInputView={this.headerInputView()}
        headerOutputView={this.headerOutputView()}
        headerValueView={this.headerValueView()}
      />
    )
  }
}