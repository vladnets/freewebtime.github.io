import { IVector4 } from '../../../api/IVector2';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ICardboardViewProps } from './CarboardView';
import { areObjectsEqual } from '../../../helpers/index';
import { CardboardActions } from '../../../reducers/project/carboardsReducer';

interface ICardboardContentViewState {
  clientRect: IVector4;
}

export class CardboardContentView extends React.Component<ICardboardViewProps, ICardboardContentViewState> {

  updateClientRect = () => {

    const cardboard = this.props.cardboard;
    const appState = this.props.appState;
    const currentRect = cardboard.clientRect; 
    
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

        const areEqual = areObjectsEqual(currentRect, newRect);
      
        if (!areEqual) {
          console.log('updateClientRect', newRect);

          const values = {clientRect: newRect};
          const action = CardboardActions.UpdateCardboard(cardboard.id, values);

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
    return (
      <div className={'cardboard-content'} id={'cardboard-content'}>
        {this.props.children}
        <div className={'inner-shadow'} />
      </div>
    )
  }
}