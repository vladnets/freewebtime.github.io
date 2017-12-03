import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../../api/IAppState';
import { IProjectViewState } from '../../ProjectView';
import { CardType, ICard } from '../../../../api/project/ICard';
import { CardSocketView, CardSocketType } from './CardSocketView';
import { CardViewBase } from './CardViewBase';
import { PrimitiveCardView } from './PrimitiveCardView';
import { StructureCardView } from './StructureCardView';
import { FunctionCardView } from './FunctionCardView';
import { ICardboardRenderData } from '../CarboardView';

export enum CardDrawType {
  Card = 'Card',
  Subcard = 'Subcard',
}

export interface ICardViewProps {
  drawType: CardDrawType;
  card: ICard;
  cardboardRenderData: ICardboardRenderData;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardView extends React.Component<ICardViewProps> {
  
  render() {
    const appState = this.props.appState;
    const card = this.props.card;
    const cardboardRenderData = this.props.cardboardRenderData;

    switch (card.cardType) {
      
      case CardType.Primitive: {
        return (<PrimitiveCardView cardboardRenderData={cardboardRenderData} drawType={this.props.drawType} appState={appState} card={card} pvState={this.props.pvState} />)
      }

      case CardType.Structure: {
        return (<StructureCardView cardboardRenderData={cardboardRenderData} drawType={this.props.drawType} appState={appState} card={card} pvState={this.props.pvState} />)
      }
      
      case CardType.Function: {
        return (<FunctionCardView cardboardRenderData={cardboardRenderData} drawType={this.props.drawType} appState={appState} card={card} pvState={this.props.pvState} />)
      }
      
      default: {
        return (
          <CardViewBase cardboardRenderData={cardboardRenderData} appState={appState} drawType={this.props.drawType} card={card} pvState={this.props.pvState} />
        )
      }
    }
  }
}