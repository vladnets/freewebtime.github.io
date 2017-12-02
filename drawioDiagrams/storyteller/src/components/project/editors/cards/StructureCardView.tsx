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
    const appState = this.props.appState;
    const project = appState.project;
    const subitems = getSubitems(card, project);
    
    if (!subitems) {
      return false;
    }

    const subitemsViews = Object.keys(subitems).map((subitemId: string, index: number) => {
      const subitem = subitems[subitemId];

      return (<CardView key={subitemId} drawType={CardDrawType.Subcard} appState={appState} pvState={this.props.pvState} card={subitem} />)
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