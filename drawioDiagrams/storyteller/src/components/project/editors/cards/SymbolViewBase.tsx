import { ISymbol, SymbolType } from '../../../../api/project/ISymbol';
import { IAppState } from '../../../../api/IAppState';
import { getCard, resolveReference } from '../../../../helpers';
import { CardView, CardType } from './CardView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { ICardViewBaseProps } from './CardViewBase';
import { IProjectViewState } from '../../ProjectView';
import { CardSocketView, CardSocketType } from './CardSocketView';
import { ISymbolViewState } from './SymbolView';

export interface ISymbolViewBaseState {
  isCollapsed: boolean;
}

export class SymbolViewBase extends React.Component<ISymbolViewState, ISymbolViewBaseState> {

  state = {
    isCollapsed: false,
  }

  headerInputView = (): any => {
    if (!this.props.pvState.isShowTypeReferences) {
      return false;
    }

    return (
      <div className="input-container">
        <CardSocketView socketType={CardSocketType.Input} symbol={this.props.symbol} cardboardId={this.props.cardboardId} />
      </div>
    )
  }

  headerOutputView = (): any => {
    if (!this.props.pvState.isShowTypeReferences) {
      return false;
    }
    
    return (
      <div className="output-container">
        <CardSocketView socketType={CardSocketType.Output} symbol={this.props.symbol} cardboardId={this.props.cardboardId} />
      </div>
    )
  }

  headerValueView = (): any => {
    return (
      <div className={'content-container container-horizontal header-content'}>
        <div className={'value'}>
        {this.props.memberName
          ? `${this.props.memberName} (${this.props.symbol.name})`
          : this.props.symbol.name 
        }
        </div>
        <div className={'toolbox'}>
          <button onClick={this.toggleIsCollapsed}>
            toggle
          </button>
        </div>
      </div>
    )
  }
  contentInputView = (): any => {
    return false;
  }
  contentOutputView = (): any => {
    return false;
  }
  contentValueView = (): any => {
    return (
      <div className="content-container">
        {this.props.symbol.fullId}
      </div>
    )
  }

  toggleIsCollapsed = () => {
    const isCollapsed = this.state && this.state.isCollapsed === true;

    this.setState({
      ...this.state,
      isCollapsed: !isCollapsed,
    })
  }

  handleHeaderClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    this.toggleIsCollapsed();
  }

  headerView = (symbol: ISymbol) => {
    return (
      <div className="card-header container-horizontal card-drag-handler">
      {this.headerInputView()}
      {this.headerValueView()}
      {this.headerOutputView()}
      </div>
    )
  }

  contentView = (symbol: ISymbol) => {
    if (this.state && this.state.isCollapsed) {
      return false;
    }
    
    return (
      <div className="card-content container-horizontal">
      {this.contentInputView()}
      {this.contentValueView()}
      {this.contentOutputView()}
      </div>
    )
  }

  render () {
    const symbol = this.props.symbol;
    
    if (!symbol) {
      return false;
    }

    return (
      <div className={'symbol-view container-vertical'}>
      {this.headerView(symbol)}
      {this.contentView(symbol)}
      </div>
    )
  }
}