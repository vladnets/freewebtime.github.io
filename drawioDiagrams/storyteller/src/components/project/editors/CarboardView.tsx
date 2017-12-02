import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../api/IAppState';
import { IProjectViewState } from '../ProjectView';
import { ReferencePathItem } from '../../../api/project/ReferencePath';
import { CardView, CardDrawType } from './cards/CardView';
import { IProject } from '../../../api/project/IProject';
import { parsePath, getSubitems, resolveReference } from '../../../helpers/projectHeler';
import { ICard } from '../../../api/project/ICard';

export interface ICardboardViewProps {
  namespace: string;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardboardView extends React.Component<ICardboardViewProps> {

  pathView = (namespace: string) => {
    const path = parsePath(namespace);
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

  cardsView = (project: IProject, rootCard: ICard) => {
    
    const subitems = getSubitems(rootCard, project);
    if (!subitems) {
      return false;
    }

    return Object.keys(subitems).map((subitemId: string) => {
      const card = subitems[subitemId];
      
      return (
        <CardView 
          key={subitemId}
          drawType={CardDrawType.Card}
          appState={this.props.appState}
          pvState={this.props.pvState}
          card={card}
        />
      )
    })
  }

  render () {
    const project = this.props.appState.project;
    const rootCard = resolveReference(this.props.namespace, project);
    
    if (!rootCard) {
      return false;
    }

    return (
      <div className={'cardboard-container container-vertical'}>
        <div className="cardboard-header">
        {this.pathView(rootCard.fullId)}
        </div>
        <div className={'cardboard-content'}>
        {this.cardsView(project, rootCard)}
        </div>
      </div>
    )
  }
}