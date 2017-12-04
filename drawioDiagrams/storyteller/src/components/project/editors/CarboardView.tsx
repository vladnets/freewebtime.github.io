import { CardSocketType } from './cards/CardSocketView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../api/IAppState';
import { IProjectViewState } from '../ProjectView';
import { ReferencePathItem } from '../../../api/project/ReferencePath';
import { CardView, CardDrawType } from './cards/CardView';
import { IProject } from '../../../api/project/IProject';
import { parsePath, getSubitems, resolveReference } from '../../../helpers/projectHeler';
import { ICard } from '../../../api/project/ICard';
import { IVector2 } from '../../../api/IVector2';
import { IHash } from '../../../api/IHash';
import { ICardboard } from '../../../api/project/ICardboard';

export interface ICardboardViewProps {
  cardboard: ICardboard;
  appState: IAppState;
  pvState: IProjectViewState;
}

export interface ISocketRenderData {
  socketId: string;
  socketType: CardSocketType;
  position: IVector2;
}
export interface ICardboardRenderData {
  visibleSockets: IHash<ISocketRenderData>;
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
    
    const cardboard = this.props.cardboard;
    const subitems = getSubitems(rootCard, project.cards);
    if (!subitems) {
      return false;
    }

    const renderData: ICardboardRenderData = {
      visibleSockets: {},
    }

    return Object.keys(subitems).map((subitemId: string) => {
      const subitemCard = subitems[subitemId];
      const cardboardItem = cardboard.items[subitemId];

      if (!cardboardItem) {
        return false;
      }

      return (
        <CardView 
          key={subitemId}
          cardboard={cardboard}
          cardboardItem={cardboardItem}
          cardboardRenderData={renderData}
          drawType={CardDrawType.Card}
          appState={this.props.appState}
          pvState={this.props.pvState}
          card={subitemCard}
        />
      )
    })
  }

  render () {
    const project = this.props.appState.project;
    const rootCard = resolveReference(this.props.cardboard.rootId, project.cards);
    
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
        <div className={'inner-shadow'} />
        </div>
      </div>
    )
  }
}