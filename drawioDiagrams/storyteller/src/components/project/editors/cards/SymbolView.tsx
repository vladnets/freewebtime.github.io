import { ISymbol, SymbolType } from '../../../../api/project/ISymbol';
import { IAppState } from '../../../../api/IAppState';
import { getCard, resolveReference } from '../../../../helpers';
import { CardView, CardType } from './CardView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { ICardViewBaseProps } from './CardViewBase';
import { IProjectViewState } from '../../ProjectView';
import { CardSocketView, CardSocketType } from './CardSocketView';
import { PrimitiveSymbolView } from './PrimitiveSymbolView';
import { SymbolViewBase } from './SymbolViewBase';
import { StructureSymbolView } from './StructureSymbolView';

export interface ISymbolViewState {
  cardboardId: string;
  symbol: ISymbol;
  appState: IAppState;
  pvState: IProjectViewState;
  memberName?: string;
}

export class SymbolView extends React.Component<ISymbolViewState> {

  render () {
    const cardboardId = this.props.cardboardId;
    const appState = this.props.appState;
    const symbol = this.props.symbol;
    const memberName = this.props.memberName;

    if (!symbol) {
      return false;
    }
    
    switch (symbol.symbolType) {

      case SymbolType.Primitive: {
        return (
          <PrimitiveSymbolView symbol={symbol} memberName={memberName} cardboardId={cardboardId} appState={appState} pvState={this.props.pvState} />
        )
      }
    
      case SymbolType.Structure: {
        return (
          <StructureSymbolView symbol={symbol} memberName={memberName} cardboardId={cardboardId} appState={appState} pvState={this.props.pvState} />
        )
      }
    
      default: {
        return (
          <SymbolViewBase symbol={symbol} memberName={memberName} cardboardId={cardboardId} appState={appState} pvState={this.props.pvState} />
        )
      }
    }

  }
}