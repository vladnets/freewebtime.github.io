import { resolveReference } from '../../../../helpers';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardViewBase } from './CardViewBase';
import { IFunction } from '../../../../api/project/ISymbol';
import { SymbolCardView } from './SymbolCardView';
import { CardType } from './CardView';

export class FunctionCardView extends CardViewBase {
  
  contentOutputView = () => {
    const func = this.props.symbol as IFunction;
    if (!func) {
      return false;
    }

    const project = this.props.appState.project;
    const paramsTypeId = func.paramsTypeId;
    const paramsType = resolveReference(paramsTypeId, project);
    if (paramsType) {
      return (
        <div className="output-container">
          <SymbolCardView 
            key={paramsTypeId} 
            symbol={paramsType} 
            cardboardId={func.fullId} 
            appState={this.props.appState} 
            pvState={this.props.pvState}
            cardType={CardType.Subcard}
          />
        </div>
      )
    }

    return false;
  }

  contentInputView = () => {
    const func = this.props.symbol as IFunction;
    if (!func) {
      return false;
    }

    const project = this.props.appState.project;
    const paramsTypeId = func.paramsTypeId;
    const paramsType = resolveReference(paramsTypeId, project);
    if (paramsType) {
      return (
        <div className="input-container">
          <SymbolCardView 
            key={paramsTypeId} 
            symbol={paramsType} 
            cardboardId={func.fullId} 
            appState={this.props.appState} 
            pvState={this.props.pvState}
            cardType={CardType.Subcard}
          />
        </div>
      )
    }

    return false;
  }

  contentValueView = () => {
    return (
      <div className="content-container">
      {this.props.symbol.fullId}
      </div>
    )
  }
}