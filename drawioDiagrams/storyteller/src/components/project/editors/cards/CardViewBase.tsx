import { ICallback } from '../../../../api';
import { IVector2 } from '../../../../api/IVector2';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../../api/IAppState';
import { IProjectViewState } from '../../ProjectView';
import { CardType, ICard } from '../../../../api/project/ICard';
import { CardSocketView, CardSocketType } from './CardSocketView';
import { CardDrawType, ICardViewProps } from './CardView';
import Rnd from 'react-rnd';
import { appConfig } from '../../../../config/appConfig';

interface ICardViewState {
  isShowContent: boolean;
  isDragging: boolean;
}

export class CardViewBase extends React.Component<ICardViewProps, ICardViewState> {
  state = {
    isShowContent: true,
    isDragging: true,
  }

  toggleShowContent = () => {
    this.setState({
      ...this.state,
      isShowContent: !this.state.isShowContent,
    })
  }
  onClick = () => {
    if (this.state && this.state.isDragging) {
      return;
    }

    // this.toggleShowContent();
  }
 
  dragStart = (e, d)=>{
    this.setState({
      ...this.state,
      isDragging: true,
    })
  }
  dragStop = (e, d)=>{
    this.placeCard({x: d.x, y: d.y}, this.props.appState.resources.callback);
    this.setState({
      ...this.state,
      isDragging: false,
    })
    console.log('dragStop');
  }
  resizeStop = (e, direction, ref, delta, position) => {
    const callback = this.props.appState.resources.callback;
    this.resizeCard({x: ref.offsetWidth, y: ref.offsetHeight}, position, callback)
    this.setState({
      ...this.state,
      isDragging: false,
    })
    console.log('dragStop');
  }

  moveCard = (deltaPos: IVector2, callback: ICallback) => {
    const card = this.props.card;
    
    if (!card) {
      return;
    }

    const appState = this.props.appState;
    const currentPos = card.position || {x: 0, y: 0};
    const newValues = {
      position: {
        x: currentPos.x + deltaPos.x, 
        y: currentPos.y + deltaPos.y
      }
    }

    const action = appConfig.Actions.CardUpdate(card.fullId, newValues);
    appState.resources.callback(action);      
  }
  placeCard = (newPos: IVector2, callback: ICallback) => {
    const card = this.props.card;
    
    if (!card) {
      return;
    }

    const appState = this.props.appState;
    const newValues = {
      position: newPos
    }

    const action = appConfig.Actions.CardUpdate(card.fullId, newValues);
    appState.resources.callback(action); 
  }
  resizeCard = (deltaSize: IVector2, newPos: IVector2, callback: ICallback) => {
    const card = this.props.card;
    
    if (!card) {
      return;
    }

    const appState = this.props.appState;
    const currentPos = card.position;
    const currentSize = card.size;
    const newSize = {
      x: Math.max(deltaSize.x, 10), 
      y: Math.max(deltaSize.y, 10)
    }
    
    const newValues = {
      position: newPos,
      size: newSize,
    }

    const action = appConfig.Actions.CardUpdate(card.fullId, newValues);
    appState.resources.callback(action); 

  }

  headerInputView = (): JSX.Element|boolean => {
    if (!this.props.pvState.isShowTypeReferences) {
      return false;
    }

    const className = 'card-header-input';
    const socketId = `input-type-socket-${this.props.card.fullId}`;

    return (
      <div className={className}>
        <CardSocketView socketId={socketId} socketType={CardSocketType.Input} card={this.props.card} />
      </div>
    )
  }
  headerOutputView = (): JSX.Element|boolean => {
    if (!this.props.pvState.isShowTypeReferences) {
      return false;
    }

    const className = 'card-header-output';
    const socketId = `output-type-socket-${this.props.card.fullId}`;
    
    return (
      <div className={className}>
        <CardSocketView socketId={socketId} socketType={CardSocketType.Output} card={this.props.card} />
      </div>
    )
  }
  headerValueView = (): JSX.Element|boolean => {
    const className = 'card-header-value container-vertical';
    return (
      <div className={className} onClick={this.onClick}>
        <div>
        {this.props.card.name}
        </div>
      </div>
    )
  }

  contentInputView = (): JSX.Element|boolean => {
    if (!this.props.pvState.isShowValueReferences) {
      return false;
    }
    
    const className = 'card-content-input';
    const socketId = `input-value-socket-${this.props.card.fullId}`;

    const card = this.props.card;
    switch (card.cardType) {
      case CardType.Primitive:
        
        break;
    
      default:
        break;
    }

    return (
      <div className={className}>
        <CardSocketView socketId={socketId} socketType={CardSocketType.Input} card={this.props.card} />
      </div>
    )
  }
  contentOutputView = (): JSX.Element|boolean => {
    if (!this.props.pvState.isShowValueReferences) {
      return false;
    }

    const className = 'card-content-output';
    const socketId = `output-value-socket-${this.props.card.fullId}`;
    
    return (
      <div className={className}>
        <CardSocketView socketId={socketId} socketType={CardSocketType.Output} card={this.props.card} />
      </div>
    )
  }
  contentValueView = (): JSX.Element|boolean => {
    const className = 'card-content-value container-vertical';
    return (
      <div className={className}>
        <div>
        {this.props.card.name}
        </div>
        <div className={'subheader'}>
        {this.props.card.fullId}
        </div>
      </div>
    )
  }

  footerInputView = (): JSX.Element|boolean => {
    return false;
  }
  footerOutputView = (): JSX.Element|boolean => {
    return false;
  }
  footerValueView = (): JSX.Element|boolean => {
    if (this.props.pvState.isShowFooters !== true) {
      return false;
    }
    
    const className = 'card-footer-value container-vertical';
    return (
      <div className={className} onClick={this.onClick}>
        <div className={'subheader'}>
        {this.props.card.fullId}
        </div>
      </div>
    )
  }


  headerView = (): JSX.Element|boolean => {
    const className = 'card-header container-horizontal card-drag-handler';
    return (
      <div className={className}>
      {this.headerOutputView()}
      {this.headerValueView()}
      {this.headerInputView()}
      </div>
    )
  }
  contentView = (): JSX.Element|boolean => {
    if (!this.state.isShowContent) {
      return false;
    }

    const className = 'card-content container-horizontal';
    return (
      <div className={className}>
      {this.contentOutputView()}
      {this.contentValueView()}
      {this.contentInputView()}
      </div>
    )
  }
  footerView = (): JSX.Element|boolean => {
    const className = 'card-footer container-horizontal';
    return (
      <div className={className}>
      {this.footerOutputView()}
      {this.footerValueView()}
      {this.footerInputView()}
      </div>
    )
  }

  
  movableContainer = (card: ICard, children: any) => {
    const appState = this.props.appState;
    const callback = appState.resources.callback;

    const defaultPos = {x: 0, y: 0}
    const defaultSize = {x: 200, y: 50}


    if (card) {
      const pos = card.position || defaultPos;
      const size = card.size || defaultSize;
  
      return (
        <Rnd 
          default={{
            x: pos.x,
            y: pos.y,
            width: size.x,
            height: size.y,
          }}
          onDragStart={this.dragStart}
          onDragStop={this.dragStop}
          onResizeStop={this.resizeStop}
          dragHandleClassName={'.card-drag-handler'}
        >
          {children}
        </Rnd>
      )
    }

    return false;
  }

  render() {
    
    let className = `card container-vertical card-${this.props.card.cardType} ${this.props.drawType}`;
    if (this.props.drawType === CardDrawType.Card) {
      className += ' fullheight fullwidth';
    }
    const cardContent = (
      <div className={className}>
      {this.headerView()}
      {this.contentView()}
      {this.footerView()}
      </div>
    );
    
    const resultView = this.props.drawType === CardDrawType.Card
      ? this.movableContainer(this.props.card, cardContent)
      : cardContent;

    return resultView;
  }
}