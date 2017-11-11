import { ProjectItemType } from '../api/project/IProjectItem';
import { IAppState } from '../api/IAppState';
import * as React from 'react';
import { IHash } from '../api/IHash';
import FontAwesome from 'react-fontawesome';
import { CardView } from './CardView';
import { ICard } from '../api/project/ICard';

export class CardboardView extends React.Component<{appState: IAppState}> {
  render () {

    const card: ICard = {
      id: 'character',
      name: 'character',
      projectItemType: ProjectItemType.Card,
      subitems: {},
      color: 'rgb(4, 58, 27)'
    };
    const card2: ICard = {
      id: 'storypoint',
      name: 'storypoint',
      projectItemType: ProjectItemType.Card,
      subitems: {},
      color: 'rgb(129, 131, 12)'
    };
    const card3: ICard = {
      id: 'location',
      name: 'location',
      projectItemType: ProjectItemType.Card,
      subitems: {},
      color: 'rgb(131, 12, 12)'
    };
    const card4: ICard = {
      id: 'story',
      name: 'story',
      projectItemType: ProjectItemType.Card,
      subitems: {},
      color: 'rgb(12, 97, 131)'
    };

    return (
      <div className={'cardboard-container container-vertical'}>
        <div className="cardboard-header">
          <u>New story</u> > <u>src</u> > storypoint
        </div>
        <div className="cardboard-content">
          <CardView card={card} appState={this.props.appState} />
          <CardView card={card2} appState={this.props.appState} />
          <CardView card={card3} appState={this.props.appState} />
          <CardView card={card4} appState={this.props.appState} />
        </div>
      </div>
    )
  }
}