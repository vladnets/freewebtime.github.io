import { SymbolView } from './SymbolView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IStructure } from '../../../../api/project/ISymbol';
import { CardSocketView, CardSocketType } from './CardSocketView';
import { resolveReference } from '../../../../helpers/index';
import { SymbolViewBase } from './SymbolViewBase';

export class StructureSymbolView extends SymbolViewBase {
  contentValueView = () => {
    const appState = this.props.appState;
    const project = appState.project;
    const structure = this.props.symbol as IStructure;
    const cardboardId = this.props.cardboardId;
    
    if (structure) {
      return (
        <div className="content-container">
        {
          Object.keys(structure.subitems).map((subitemName: string) => {
            const subitemTypeId = structure.subitems[subitemName];
            const subitemType = resolveReference(subitemTypeId, project);
            if (subitemType) {
              return (
                <div>
                  <SymbolView memberName={subitemName} symbol={subitemType} cardboardId={cardboardId} appState={appState} pvState={this.props.pvState} />
                </div>
              )
            }

            return false;
          })
        }    
        </div>
      )
    }

    return false;
  }
}