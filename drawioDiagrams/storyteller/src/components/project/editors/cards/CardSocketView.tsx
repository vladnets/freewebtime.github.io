import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CircleView } from '../../../svg/CircleView';
import { appConfig } from '../../../../config/appConfig';
import { ISymbol } from '../../../../api/project/ISymbol';

export enum CardSocketType {
  Input = 'Input',
  Output = 'Output',
}

export interface ICardSocketViewProps {
  symbol: ISymbol;
  cardboardId: string;
  socketType: CardSocketType;
  socketText?: string;
}

export class CardSocketView extends React.Component<ICardSocketViewProps> {
  
  render () {
    const className = 'card-socket';
    const isTest = true;
    const circleStyle = {
      width: '10px',
      height: '10px',
      pointerEvents: 'none',
    }
    const socketType = this.props.socketType;
    const strokeColor = socketType === CardSocketType.Input
      ? appConfig.Colors.Green
      : appConfig.Colors.Yellow
    ;
    const fillColor = appConfig.Colors.Transparent;

    const socketText = this.props.socketText 
      ? (
        <div className={'card-socket-text'}>
        {this.props.socketText}
        </div>
      ) 
      : false
    ;

    return (
      <div className={className}>
        <CircleView 
          center={{x: 5, y: 5}}
          radius={3}
          style={circleStyle}
          strokeColor={strokeColor}
          fillColor={fillColor}
          strokeSize={2}
          isDrawSvgContainer={true}
        />
      </div>
    )
  }
}