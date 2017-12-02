import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../../api/IAppState';
import { IProjectViewState } from '../../ProjectView';
import { ICard } from '../../../../api/project/ICard';

export interface ICardViewProps {
  card: ICard;
  appState: IAppState;
  pvState: IProjectViewState;
}

export class CardView extends React.Component<ICardViewProps> {
  render() {
    return (
      <div>
        card
      </div>
    )
  }
}