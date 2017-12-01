import { ISymbol, SymbolType } from '../../../../api/project/ISymbol';
import { IAppState } from '../../../../api/IAppState';
import { getCard, resolveReference } from '../../../../helpers';
import { CardView, CardType } from './CardView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { ICardViewBaseProps } from './CardViewBase';
import { IProjectViewState } from '../../ProjectView';

export interface ISymbolCardViewState {
  symbol: ISymbol;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class SymbolView extends React.Component<ISymbolCardViewState> {

  headerView = (symbol: ISymbol) => {
    return (
      <div className="card-header container-horizontal card-drag-handler">
      {symbol.name}
      </div>
    )
  }

  contentView = (symbol: ISymbol) => {
    return (
      <div className="card-content container-horizontal">
      {symbol.fullId}
      </div>
    )
  }

  render () {
    const symbol = this.props.symbol;
    
    if (!symbol) {
      return false;
    }

    return (
      <div className={'symbol-view container-vertical'}>
      {this.headerView(symbol)}
      {this.contentView(symbol)}
      </div>
    )
  }
}