import { ISymbol } from '../../../api/project/ISymbol';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardView } from './CardView';
import { IAppState } from '../../../api/IAppState';
import { ICard } from '../../../api/project/ICard';
import { IProjectViewState } from '../ProjectView';
import { parsePath, getSubitems, getSubitemsIds } from '../../../helpers/index';
import { ReferencePathItem } from '../../../api/project/ReferencePath';
import { ICardboard } from '../../../api/project/ICardboard';
import { appConfig } from '../../../config/appConfig';
import { IHash } from '../../../api/IHash';

export interface ICardboardViewProps {
  namespace: string;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardboardView extends React.Component<ICardboardViewProps> {

  pathView = () => {
    const namespace = this.props.namespace;
    const appState = this.props.appState;
    const project = appState.project;
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

  cardsView = () => {
    const appState = this.props.appState;
    const project = appState.project;
    const namespace = this.props.namespace;
    const cardboardId = namespace;
    const symbolsIds = getSubitemsIds(namespace, project);
    if (symbolsIds) {
      return Object.keys(symbolsIds).map((symbolId: string) => {
        return (
          <CardView key={symbolId} symbolId={symbolId} cardboardId={cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
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
        {this.cardsView()}
        </div>
      </div>
    )
  }
}