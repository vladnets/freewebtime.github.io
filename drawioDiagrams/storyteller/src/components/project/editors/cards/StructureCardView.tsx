import { IProject } from '../../../../api/project/IProject';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardViewBase } from './CardViewBase';
import { IStructure } from '../../../../api/project/ISymbol';
import { CardType } from './CardView';
import { resolveReference } from '../../../../helpers/index';
import { SymbolCardView } from './SymbolCardView';

export class StructureCardView extends CardViewBase {
  subitemsView = (struct: IStructure, project: IProject) => {

    return Object.keys(struct.subitems).map((subitemName: string) => {
      const subitemId = struct.subitems[subitemName];
      const subitem = resolveReference(subitemId, project);
      console.log('subitems view', this.props.symbol, subitem);
      
      if (subitem) {
        return (
          <SymbolCardView
            key={subitemName} 
            symbol={subitem} 
            cardboardId={struct.fullId} 
            appState={this.props.appState} 
            pvState={this.props.pvState}
            cardType={CardType.Subcard}
          />
        )
      }

      return false;
    })

  }

  contentValueView = () => {
    const struct = this.props.symbol as IStructure;
    if (!struct) {
      return false;
    }
    
    const project = this.props.appState.project;

    return (
      <div className="content-container">
      {this.subitemsView(struct, project)}
      </div>
    )

  }
}