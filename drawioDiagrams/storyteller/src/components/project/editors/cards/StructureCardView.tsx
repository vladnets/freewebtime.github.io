import * as React from 'react';
import { CardViewBase } from './CardViewBase';
import { IStructure } from '../../../../api/project/ICard';
import { getSubitems } from '../../../../helpers/projectHeler';
import { CardView, CardDrawType } from './CardView';

export class StructureCardView extends CardViewBase {
  contentValueView = () => {
    const className = 'card-content-value container-vertical';
    const structure = this.props.card as IStructure;
    
    if (!structure) {
      return false;
    }

    const card = this.props.card;
    const cardboard = this.props.cardboard;
    const appState = this.props.appState;
    const project = appState.project;
    const subitems = getSubitems(card, project.cards);
    
    if (!subitems) {
      return false;
    }

    const subitemsViews = Object.keys(subitems).map((subitemId: string, index: number) => {
      const subitem = subitems[subitemId];
      const cardboardItem = cardboard.items[subitem.fullId];

      if (!cardboardItem) {
        return false;
      }

      return (
        <CardView 
          key={subitemId} 
          cardboard={cardboard} 
          cardboardItem={cardboardItem}
          cardboardRenderData={this.props.cardboardRenderData}
          drawType={CardDrawType.Subcard} 
          appState={appState} 
          pvState={this.props.pvState} 
          card={subitem} 
        />
      )
    })

    return (
      <div className={className}>
      {subitemsViews}
      </div>
    )
  }

  contentInputView = () => {
    return false;
  }

  contentOutputView = () => {
    return false;
  }
}