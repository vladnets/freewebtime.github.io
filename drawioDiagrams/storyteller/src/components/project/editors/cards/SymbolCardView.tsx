import { ISymbol, SymbolType } from '../../../../api/project/ISymbol';
import { IAppState } from '../../../../api/IAppState';
import { FunctionCardView } from './FunctionCardView';
import { FunctionCallCardView } from './FunctionCallCardView';
import { ObjectCardView } from './ObjectCardView';
import { PrimitiveCardView } from './PrimitiveCardView';
import { SourceCodeCardView } from './SourceCodeCardView';
import { StructureCardView } from './StructureCardView';
import { getCard, resolveReference } from '../../../../helpers';
import { CardView, CardType } from './CardView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { ICardViewBaseProps } from './CardViewBase';
import { IProjectViewState } from '../../ProjectView';

export interface ISymbolCardViewState {
  symbol: ISymbol;
  cardboardId: string;
  appState: IAppState;
  pvState: IProjectViewState;
  cardType: CardType;
}

export class SymbolCardView extends React.Component<ISymbolCardViewState> {

  render () {
    const project = this.props.appState.project;
    const symbol = this.props.symbol;
    const card = getCard(this.props.cardboardId, symbol.fullId, project);
    
    if (!symbol) {
      return false;
    }

    switch (symbol.symbolType) {
      
      case SymbolType.Function: {
        return (
          <FunctionCardView card={card} cardType={this.props.cardType} symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.FunctionCall: {
        return (
          <FunctionCallCardView card={card} cardType={this.props.cardType} symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.Object: {
        return (
          <ObjectCardView card={card} cardType={this.props.cardType} symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.Primitive: {
        return (
          <PrimitiveCardView card={card} cardType={this.props.cardType} symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.SourceCode: {
        return (
          <SourceCodeCardView card={card} cardType={this.props.cardType} symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.Structure: {
        return (
          <StructureCardView card={card} cardType={this.props.cardType} symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.SourceCode: {
        return (
          <SourceCodeCardView card={card} cardType={this.props.cardType} symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 

      default: {
        return false;
      }
    }
  }
}