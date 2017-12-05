import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IProjectViewState } from '../ProjectView';
import { IAppState } from '../../../api/IAppState';
import { ICardboard } from '../../../api/project/ICardboard';
import { ICard } from '../../../api/project/ICard';
import { getSubitems, resolveReference } from '../../../helpers/projectHeler';
import { IHash } from '../../../api/IHash';
import { getRootItems } from '../../../config/createCardboards';
import { ConnectionView } from './ConnectionView';
import { areObjectsEqual } from '../../../helpers/index';

export interface IConnectionsViewProps {
  rootCard: ICard;
  cardboard: ICardboard;
  appState: IAppState;
  pvState: IProjectViewState;
}

export interface IConnectionsViewState {
  visibleCards: IHash<string>;
}

export class ConnectionsView extends React.Component<IConnectionsViewProps, IConnectionsViewState> {

  checkState = () => {

    const oldCards = this.state ? this.state.visibleCards : undefined;
    const newCards = this.collectVisibleCards();

    if (!areObjectsEqual(oldCards, newCards)) {
      this.setState({
        ...this.state,
        visibleCards: newCards,
      })
    }

  }

  componentWillMount() {
    this.checkState();
  }
  componentDidUpdate(){
    this.checkState();
  }

  collectVisibleCards = (): IHash<string> => {
    const idList: IHash<string> = {}
    const appState = this.props.appState;
    const project = appState.project;
    const visibleCards: IHash<ICard> = {};

    const rootCard = this.props.rootCard;
    const subitems = getSubitems(rootCard, project.cards);

    if (subitems) {
      Object.keys(subitems).map((subitemId: string) => {
        const subitem = subitems[subitemId];
        this.collectVisibleSubcards(subitem, idList);
      })
    }

    return idList;
  }

  collectVisibleSubcards = (rootCard: ICard, idList: IHash<string>) => {
    const cardboard = this.props.cardboard;
    const appState = this.props.appState;
    const project = appState.project;

    idList[rootCard.fullId] = rootCard.fullId;

    const cardboardItem = cardboard.items[rootCard.fullId];
    if (cardboardItem && cardboardItem.isCollapsed) {
      return;
    }

    const subitems = getSubitems(rootCard, project.cards);
    if (!subitems) {
      return;
    }

    Object.keys(subitems).map((subcardId: string) => {
      const subcard = subitems[subcardId];
      this.collectVisibleSubcards(subcard, idList);
    })

  }

  connectionView = (cardId: string) => {
    return (
      <ConnectionView key={cardId} cardId={cardId} appState={this.props.appState} cardboard={this.props.cardboard} />
    )
  }

  connectionsView = (idList: IHash<string>) => {
    const cardboard = this.props.cardboard;

    return Object.keys(idList).map((cardId: string) => {
      const card = resolveReference(cardId, this.props.appState.project.cards);
      
      if (!card || !card.valueId) {
        return false;
      }
      
      if (!idList[card.valueId]) {
        return false;
      }

      return (
        <ConnectionView 
          key={cardId}
          cardId={cardId} 
          appState={this.props.appState} 
          cardboard={cardboard}
        />
      )
    })
  }

  render () {

    const className = 'cardboard-connections';
    const rootCard = this.props.rootCard;

    const visibleCardsIds: IHash<string> = this.state.visibleCards;

    return (
      <div className={className}>
        <svg className={'fullwidth fullheight'}>
        {this.connectionsView(visibleCardsIds)}
        </svg>
      </div>
    )
  }
}