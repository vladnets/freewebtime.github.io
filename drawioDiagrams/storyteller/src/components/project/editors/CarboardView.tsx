import { SymbolCardView } from './cards/SymbolCardView';
import { ISymbol, SymbolType } from '../../../api/project/ISymbol';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../api/IAppState';
import { ICard } from '../../../api/project/ICard';
import { IProjectViewState } from '../ProjectView';
import { parsePath, getSubitems, getSubitemsIds, resolveReference } from '../../../helpers/index';
import { ReferencePathItem } from '../../../api/project/ReferencePath';
import { ICardboard } from '../../../api/project/ICardboard';
import { appConfig } from '../../../config/appConfig';
import { IHash } from '../../../api/IHash';
import { CardView } from './cards/CardView';
import { IProject } from '../../../api/project/IProject';

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
    
    if (!symbolsIds) {
      return false;
    }

    return Object.keys(symbolsIds).map((symbolId: string) => {

      const symbol = resolveReference(symbolId, project);
      if (!symbol) {
        return false;
      }

      return (
        <SymbolCardView key={symbolId} symbol={symbol} cardboardId={cardboardId} appState={this.props.appState} pvState={this.props.pvState} />
      )
    })
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