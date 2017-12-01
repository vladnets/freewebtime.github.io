import * as React from 'react';
import FontAwesome from 'react-fontawesome';

export enum CardSocketType {
  Input = 'Input',
  Output = 'Output',
}

export interface ICardSocketViewProps {
  symbolId: string;
  cardboardId: string;
  socketType: CardSocketType;
}

export class CardSocketView extends React.Component<ICardSocketViewProps> {
  render () {
    const className = 'card-socket';

    return (
      <div className={className}>
      {this.props.socketType} Socket
      </div>
    )
  }
}