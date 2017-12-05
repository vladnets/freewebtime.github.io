import { IFunction } from '../../../../api/project/ICard';
import * as React from 'react';
import { CardViewBase } from './CardViewBase';
import { getSubitems, resolveReferences, resolveReference } from '../../../../helpers/projectHeler';
import { CardView, CardDrawType } from './CardView';

export class FunctionCardView extends CardViewBase {

  contentValueView = () => {
    const isTest = false;
    if (isTest) {
      return false;
    }
    
    const className = 'card-content-value container-vertical';
    const func = this.props.card as IFunction;
    
    if (!func) {
      return false;
    }

    return (
      <div className={className}>
        <div>
        {func.functionType} {func.cardType} 
        </div>
      </div>
    )
  }
  
  contentInputView = () => {
    const className = 'card-content-input container-vertical';
    const func = this.props.card as IFunction;
    
    if (!func) {
      return false;
    }

    const appState = this.props.appState;
    const project = appState.project;
    const cardboard = this.props.cardboard;
    const paramsCard = resolveReference(func.paramsId, project.cards);
    
    if (!paramsCard) {
      return false;
    }

    const cardboardItem = cardboard.items[paramsCard.fullId];
    
    if (!cardboardItem) {
      return false;
    }

    return (
      <div className={className}>
        <CardView 
          key={paramsCard.fullId}
          isSilentMode={this.props.isSilentMode}
          cardboard={cardboard} 
          cardboardItem={cardboardItem} 
          drawType={CardDrawType.Subcard} 
          appState={appState} 
          pvState={this.props.pvState} 
          card={paramsCard} 
        />
      </div>
    )
  }

  contentOutputView = () => {
    const className = 'card-content-output container-vertical';
    const func = this.props.card as IFunction;
    
    if (!func) {
      return false;
    }

    const card = this.props.card;
    const appState = this.props.appState;
    const project = appState.project;
    const cardboard = this.props.cardboard;

    const resultCard = resolveReference(func.resultId, project.cards);
    
    if (!resultCard) {
      return false;
    }

    const cardboardItem = cardboard.items[resultCard.fullId];
    
    if (!cardboardItem) {
      return false;
    }

    return (
      <div className={className}>
        <CardView 
          key={resultCard.fullId} 
          isSilentMode={this.props.isSilentMode}
          cardboardItem={cardboardItem}
          cardboard={cardboard}
          drawType={CardDrawType.Subcard} 
          appState={appState} 
          pvState={this.props.pvState} 
          card={resultCard} 
        />
      </div>
    )
  }

}