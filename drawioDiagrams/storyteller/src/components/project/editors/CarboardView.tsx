import { ISymbol } from '../../../api/project/ISymbol';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardView } from './CardView';
import { IAppState } from '../../../api/IAppState';
import { ICard } from '../../../api/project/ICard';
import { IProjectViewState } from '../ProjectView';
import { IReference } from '../../../api/project/IReference';
import { parsePath } from '../../../helpers/index';
import { ReferencePathItem } from '../../../api/project/ReferencePath';

export interface ICardboardViewProps {
  rootSymbol: ISymbol;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardboardView extends React.Component<ICardboardViewProps> {
  
  pathView = () => {
    const rootSymbol = this.props.rootSymbol;
    const path = parsePath(rootSymbol.fullId);

    if (path) {
      return path.map((pathItem: ReferencePathItem, index: number) => {
        const prefix = index > 0 ? ' > ' : '';
        return (
          <div key={index} className={'cardboard-header-path-item'}>
          {prefix}{pathItem.toString()}
          </div>
        )        
      })
    }

    return false;
  }

  render () {


    return (
      <div className={'cardboard-container container-vertical'}>
        <div className="cardboard-header">
        {this.pathView()}
        </div>
        <div className="cardboard-content">
          Cardboard content
        </div>
      </div>
    )
  }
}

// <div className="cardboard-content">
// <CardView card={card} appState={this.props.appState} />
// <CardView card={card2} appState={this.props.appState} />
// <CardView card={card3} appState={this.props.appState} />
// <CardView card={card4} appState={this.props.appState} />
// </div>