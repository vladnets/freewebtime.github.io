import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../../api/IAppState';
import { IProjectViewState } from '../../ProjectView';
import { CardType, ICard } from '../../../../api/project/ICard';
import { CardSocketView, CardSocketType } from './CardSocketView';
import { ICardViewProps } from './CardView';

interface ICardViewState {
  isShowContent: boolean;
}

export class CardViewBase extends React.Component<ICardViewProps, ICardViewState> {
  state = {
    isShowContent: true,
  }

  toggleShowContent = () => {
    this.setState({
      ...this.state,
      isShowContent: !this.state.isShowContent,
    })
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
      <div className={className} onClick={this.toggleShowContent}>
        <div>
        {this.props.card.name}
        </div>
      </div>
    )
  }

  contentInputView = (): JSX.Element|boolean => {
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



  headerView = (): JSX.Element|boolean => {
    const className = 'card-header container-horizontal';
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

  render() {
    
    const className = `card container-vertical card-${this.props.card.cardType} ${this.props.drawType}`;

    return (
      <div className={className}>
      {this.headerView()}
      {this.contentView()}
      </div>
    )
  }
}