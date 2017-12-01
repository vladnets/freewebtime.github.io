import { SourceCodeCardView } from './SourceCodeCardView';
import { PrimitiveCardView } from './PrimitiveCardView';
import { getCard, resolveReference } from '../../../../helpers';
import { CardView } from './CardView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IProjectViewState } from '../../ProjectView';
import { IAppState } from '../../../../api/IAppState';
import { CardSocketView, CardSocketType } from '../CardSocketView';
import { ICard } from '../../../../api/project/ICard';
import { ISymbol, SymbolType } from '../../../../api/project/ISymbol';
import { FunctionCardView } from './FunctionCardView';
import { FunctionCallCardView } from './FunctionCallCardView';
import { ObjectCardView } from './ObjectCardView';
import { StructureCardView } from './StructureCardView';

export interface ISymbolCardViewProps {
  symbol: ISymbol;
  cardboardId: string;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class SymbolCardView extends React.Component<ISymbolCardViewProps> {

  render () {
    const project = this.props.appState.project;
    const symbol = this.props.symbol;
    const card = getCard(this.props.cardboardId, symbol.fullId, project);
    
    if (!card || !symbol) {
      return false;
    }

    switch (symbol.symbolType) {
      
      case SymbolType.Function: {
        return (
          <FunctionCardView symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.FunctionCall: {
        return (
          <FunctionCallCardView symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.Object: {
        return (
          <ObjectCardView symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.Primitive: {
        return (
          <PrimitiveCardView symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.SourceCode: {
        return (
          <SourceCodeCardView symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 
      case SymbolType.Structure: {
        return (
          <StructureCardView symbol={symbol} cardboardId={this.props.cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
        )
      } 

      default: {
        return false;
      }
    }
  }
}