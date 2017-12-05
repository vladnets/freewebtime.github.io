import { CardboardActions } from '../../../../reducers/project/carboardsReducer';
import { areObjectsEqual } from '../../../../helpers';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import { CircleView } from '../../../svg/CircleView';
import { appConfig } from '../../../../config/appConfig';
import { ICard } from '../../../../api/project/ICard';
import { IAppState } from '../../../../api/IAppState';
import { ICardboardItem, ICardboard } from '../../../../api/project/ICardboard';
import { IVector4 } from '../../../../api/IVector2';
import { CardboardItemActions } from '../../../../reducers/project/cardboardItemsReducer';

export enum CardSocketType {
  Input = 'Input',
  Output = 'Output',
}

export interface ICardSocketViewProps {
  card: ICard;
  socketId: string;
  socketType: CardSocketType;
  socketText?: string;
  appState: IAppState;
  cardboard: ICardboard;
  cardboardItem: ICardboardItem;
  isSilentMode: boolean;
}

export class CardSocketView extends React.Component<ICardSocketViewProps> {
  
  updateClientRect = () => {
    if (this.props.isSilentMode) {
      console.log('isSilent mode!!!');
      return;
    }
    
    const cardboardItem = this.props.cardboardItem;
    const socketType = this.props.socketType;
    const cardboard = this.props.cardboard;
    const appState = this.props.appState;
    const card = this.props.card;
    let currentRect: IVector4|undefined = socketType === CardSocketType.Input 
      ? cardboardItem.inputSocketRect
      : cardboardItem.outputSocketRect;
    ;
    
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode) {
      const clientRect = domNode.getBoundingClientRect();
      if (clientRect) {

        const newRect = {
          x: clientRect.left,
          y: clientRect.top,
          z: clientRect.width,
          w: clientRect.height,
        }
        
        if (!areObjectsEqual(currentRect, newRect)) {
          const values = socketType === CardSocketType.Input 
            ? {inputSocketRect: newRect}
            : {outputSocketRect: newRect} 
          ;
          const action = CardboardItemActions.UpdateItem(cardboard.id, cardboardItem.id, values);
          appState.resources.callback(action);
        }
        
      }
    }

  }

  componentDidMount() {
    this.updateClientRect();
  }
  componentDidUpdate() {
    this.updateClientRect();
  }

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
      ? appConfig.Colors.DarkGray
      : appConfig.Colors.DarkGray
    ;
    const fillColor = appConfig.Colors.LightGray;

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