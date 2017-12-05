import { IAppState } from '../../../api/IAppState';
import Spline from '../../svg/Spline';
import Spline2 from '../../svg/Spline2';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ICard } from '../../../api/project/ICard';
import { ICardboardItem, ICardboard } from '../../../api/project/ICardboard';
import { resolveReference } from '../../../helpers/projectHeler';
import { IVector2, IVector4 } from '../../../api/IVector2';
import { appConfig } from '../../../config/appConfig';

export interface IConnectionViewProps {
  cardId: string;
  cardboard: ICardboard;
  appState: IAppState;
}

export class ConnectionView extends React.Component<IConnectionViewProps> {
  render () {

    const className = 'connection';

    const cardId = this.props.cardId;
    const cardboard = this.props.cardboard;
    const appState = this.props.appState;
    const project = appState.project;
    const fromCard = resolveReference(cardId, project.cards);

    if (!fromCard) {
      return false;
    }

    const toCard = resolveReference(fromCard.valueId, project.cards);
    if (!toCard) {
      return false;
    }

    const fromCardItem = cardboard.items[fromCard.fullId];
    const toCardItem = cardboard.items[toCard.fullId]

    if (!fromCardItem || !toCardItem) {
      return false;
    }

    const inputSocketRect = fromCardItem.inputSocketRect;
    const outputSocketRect = toCardItem.outputSocketRect;

    if (!inputSocketRect || !outputSocketRect) {
      return false;
    }

    const cardboardRect = cardboard.clientRect || {x: 0, y: 0, z: 0, w: 0};
    const radius = appConfig.ConnectionPointRadius;

    const inputPos: IVector2 = {
      x: inputSocketRect.x - cardboardRect.x,
      y: inputSocketRect.y - cardboardRect.y,
    }
    const outputPos: IVector2 = {
      x: outputSocketRect.x - cardboardRect.x,
      y: outputSocketRect.y - cardboardRect.y,
    }

    const startPos = {
      x: inputPos.x + inputSocketRect.z/2,
      y: inputPos.y + inputSocketRect.w/2,
    }
    const endPos = {
      x: outputPos.x + outputSocketRect.z/2,
      y: outputPos.y + outputSocketRect.w/2,
    }

    const width = Math.abs(endPos.x - startPos.x);
    const height = Math.abs(endPos.y - startPos.y);
    
    const position: IVector2 = {
      x: startPos.x,
      y: startPos.y,
    }

    const style = {
      left: `${position.x}px`,
      top: `${position.y}px`,
    }

    const isUpsideDown = true;

    const lineParams: IVector4 = isUpsideDown
      ? {
        x: 0,
        y: height,
        z: width,
        w: 0,
      }
      : {
        x: 0,
        y: 0,
        z: width,
        w: height,
      }
    ;

    return (
      // <svg className={'test-spline'} width={width} height={height} style={style}>
      // <line x1={lineParams.x} y1={lineParams.y} x2={lineParams.z} y2={lineParams.w} />
      // <rect x={startPos.x} y={startPos.y} width={width} height={height} />
        // </svg>
      <Spline
        mousePos={{x: 0, y: 0}}
        start={startPos}
        end={endPos}
      />
    )
  }
}