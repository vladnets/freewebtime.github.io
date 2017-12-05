import { CardboardItemActions } from '../../../../reducers/project/cardboardItemsReducer';
import { getCardSocketId } from '../../../../helpers/projectHeler';
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
import { areObjectsEqual } from '../../../../helpers/index';

interface ICardViewState {
  isDragging: boolean;
  isResizing: boolean;
  isCollapsed: boolean;
  size?: IVector2;
  position?: IVector2;
}

export class CardViewBase extends React.Component<ICardViewProps, ICardViewState> {

  updState = (props: ICardViewProps) => {
    const item = props.cardboardItem;
    const itemSize = item.isCollapsed ? item.collapsedSize : item.expandedSize;

    const newState: ICardViewState = {
      isDragging: false,
      isResizing: false,
      size: itemSize,
      position: item.position || {x: 0, y: 0},
      isCollapsed: item.isCollapsed,
    }

    if (!areObjectsEqual(this.state, newState)) {
      this.setState(newState);
    }

  }

  componentWillMount() {
    this.updState(this.props);
  }

  onDragStart = (e, d)=>{
    console.log('on drag start');

    this.setState({
      ...this.state,
      isDragging: true,
      isResizing: false,
    })
  }
  onDragStop = (e, d)=>{
    console.log('on drag stop');
    const newPos = {x: d.x, y: d.y}

    //this.placeCard(newPos);
    this.setState({
      ...this.state,
      position: newPos,
      isDragging: false,
      isResizing: false,
    })
  }
  onResizeStop = (e, direction, ref, delta, position) => {
    console.log('on resize stop');
    //this.resizeCard({x: ref.offsetWidth, y: ref.offsetHeight}, position)
    this.setState({
      ...this.state,
      isDragging: false,
      isResizing: false,
    })
  }

  onResize = (e, direction, ref, delta, position) => {
    console.log('on resize');

    this.setState({
      ...this.state,
      isDragging: false,
      isResizing: true,
      size: {
        x: ref.offsetWidth,
        y: ref.offsetHeight,
      },
      position: {...position},
    })
  }

  onResizeStart = (e, direction, ref) => {
    console.log('on resize start');

    this.setState({
      ...this.state,
      isDragging: false,
      isResizing: true,
      size: {
        x: ref.offsetWidth,
        y: ref.offsetHeight,
      },
    })
  }

  moveCard = (deltaPos: IVector2) => {
    const cardboardItem = this.props.cardboardItem;
    const appState = this.props.appState;
    const currentPos = cardboardItem.position || {x: 0, y: 0};
    const newValues = {
      position: {
        x: currentPos.x + deltaPos.x, 
        y: currentPos.y + deltaPos.y
      }
    }

    const action = CardboardItemActions.UpdateItem(this.props.cardboard.id, this.props.cardboardItem.id, newValues);
    appState.resources.callback(action); 
  }
  placeCard = (newPos: IVector2) => {
    const newValues = {
      position: newPos
    }

    const action = CardboardItemActions.UpdateItem(this.props.cardboard.id, this.props.cardboardItem.id, newValues);
    this.props.appState.resources.callback(action); 
  }
  resizeCard = (deltaSize: IVector2, newPos: IVector2) => {
    const cardboardItem = this.props.cardboardItem;
    const appState = this.props.appState;
    const newSize = {
      x: Math.max(deltaSize.x, 10), 
      y: Math.max(deltaSize.y, 10)
    }
    const newValues = cardboardItem.isCollapsed 
      ? {
        position: newPos,
        collapsedSize: newSize,
      }
      : {
        position: newPos,
        expandedSize: newSize,
      }
    ;

    const action = CardboardItemActions.UpdateItem(this.props.cardboard.id, this.props.cardboardItem.id, newValues);
    this.props.appState.resources.callback(action); 
  }

  toggleIsCollapsed = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cardboardItem = this.props.cardboardItem;
    
    const newValues = {
      isCollapsed: !cardboardItem.isCollapsed,
    }

    const action = CardboardItemActions.UpdateItem(this.props.cardboard.id, this.props.cardboardItem.id, newValues);
    this.props.appState.resources.callback(action); 

    const newSize = newValues.isCollapsed ? cardboardItem.collapsedSize : cardboardItem.expandedSize;

    this.setState({
      ...this.state,
      isCollapsed: newValues.isCollapsed,
      size: newSize,
    })
  }

  headerToolboxView = (): JSX.Element|boolean => {
    const className = 'card-header-toolbox';
    const isCollapsed = this.props.cardboardItem.isCollapsed;
    const iconName = isCollapsed ? 'toggle-on' : 'toggle-off';

    return (
      <div className={className}>
        <button className={'button'} onClick={this.toggleIsCollapsed}>
          <FontAwesome name={iconName} className={'project-explorer-tvi-icon'} />
        </button>
      </div>
    )
  }
  headerInputView = (): JSX.Element|boolean => {
    if (!this.props.pvState.isShowTypeReferences) {
      return false;
    }

    const className = 'card-header-input';
    const socketId = getCardSocketId(CardSocketType.Input, this.props.card.fullId);
    const cardboard = this.props.cardboard;
    const cardboardItem = this.props.cardboardItem;

    return (
      <div className={className}>
        <CardSocketView 
          socketId={socketId} 
          socketType={CardSocketType.Input}
          appState={this.props.appState}
          card={this.props.card}
          cardboard={cardboard}
          cardboardItem={cardboardItem}
          isSilentMode={this.props.isSilentMode}
        />
      </div>
    )
  }
  headerOutputView = (): JSX.Element|boolean => {
    if (!this.props.pvState.isShowTypeReferences) {
      return false;
    }

    const className = 'card-header-output';
    const socketId = getCardSocketId(CardSocketType.Input, this.props.card.fullId);
    const cardboard = this.props.cardboard;
    const cardboardItem = this.props.cardboardItem;

    return (
      <div className={className}>
        <CardSocketView 
          appState={this.props.appState}
          socketId={socketId} 
          socketType={CardSocketType.Output} 
          card={this.props.card} 
          cardboard={cardboard}
          cardboardItem={cardboardItem}
          isSilentMode={this.props.isSilentMode}
          />
      </div>
    )
  }
  headerValueView = (): JSX.Element|boolean => {
    const className = 'card-header-value container-vertical';
    return (
      <div className={className}>
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
    const cardboard = this.props.cardboard;
    const cardboardItem = this.props.cardboardItem;

    const card = this.props.card;
    switch (card.cardType) {
      case CardType.Primitive:
        
        break;
    
      default:
        break;
    }

    return (
      <div className={className}>
        <CardSocketView 
          appState={this.props.appState}
          socketId={socketId} 
          socketType={CardSocketType.Input} 
          card={this.props.card} 
          cardboard={cardboard}
          cardboardItem={cardboardItem}
          isSilentMode={this.props.isSilentMode}
          />
      </div>
    )
  }
  contentOutputView = (): JSX.Element|boolean => {
    if (!this.props.pvState.isShowValueReferences) {
      return false;
    }

    const className = 'card-content-output';
    const socketId = `output-value-socket-${this.props.card.fullId}`;
    const cardboard = this.props.cardboard;
    const cardboardItem = this.props.cardboardItem;
    const isSilentMode = this.props.isSilentMode || this.state.isResizing || this.state.isDragging;

    console.log('content output view');
    if (isSilentMode) {
      console.log('silent mode');
    }

    return (
      <div className={className}>
        <CardSocketView 
          appState={this.props.appState}
          socketId={socketId} 
          socketType={CardSocketType.Output} 
          card={this.props.card} 
          cardboard={cardboard}
          cardboardItem={cardboardItem}
          isSilentMode={isSilentMode}
          />
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
      <div className={className}>
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
      {this.headerToolboxView()}
      {this.headerInputView()}
      </div>
    )
  }
  contentView = (): JSX.Element|boolean => {
    if (this.props.cardboardItem.isCollapsed)
    {
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

  
  movableContainer = (children: any) => {
    const appState = this.props.appState;
    const callback = appState.resources.callback;
    const cardboardItem = this.props.cardboardItem;

    const defaultPos = {x: 0, y: 0}
    const defaultSize = {x: 200, y: 50}

    if (cardboardItem) {
      const pos = this.state.position || defaultPos;
      const size = this.state.size || defaultSize;
      
      const defaultValues: any = {
        x: pos.x,
        y: pos.y,
        width: size.x,
        height: size.y,
      }

      defaultValues.width = size.x;
      defaultValues.height = size.y;
      
      return (
        <Rnd 
          // default={defaultValues}
          position={{x: pos.x, y: pos.y}}
          size={{width: size.x, height: size.y}}
          onDragStart={this.onDragStart}
          onDragStop={this.onDragStop}
          onResizeStop={this.onResizeStop}
          onResize={this.onResize}
          onResizeStart={this.onResizeStart}
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
      ? this.movableContainer(cardContent)
      : cardContent;

    return resultView;
  }
}