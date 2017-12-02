import { IProject } from '../../../../api/project/IProject';
import { ICard } from '../../../../api/project/ICard';
import { IAppState } from '../../../../api/IAppState';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IProjectViewState } from '../../ProjectView';
import { IHash } from '../../../../api/IHash';
import { getSubitems, getSubitemsIds, resolveReference, getIconForCard } from '../../../../helpers/projectHeler';

export interface IPetviProps {
  cardId: string;
  level: number;
  pvState: IProjectViewState;
  appState: IAppState;
}

interface IPetviState {
  isMouseOver?: boolean;
  lastTimeClick?: number;
}

export class ProjectExplorerTreeViewItem extends React.Component<IPetviProps, IPetviState> {
  mouseEnter = (self: React.Component) => {
    self.setState({...this.state, isMouseOver: true });
  }
  mouseLeave = (self: React.Component) => {
    self.setState({...this.state, isMouseOver: false });
  }
  handleClick = (pvState: IProjectViewState, itemId: string, e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const state: IPetviState = this.state || {}

    const lastTimeClicked = state.lastTimeClick;
    const now = Date.now();
    const doubleClickInterval = 300;
    const delta = now - (lastTimeClicked ? lastTimeClicked : 0);
    const isDoubleClick = delta < doubleClickInterval;
    
    this.setState({
      ...state,
      lastTimeClick: now,
    })
    
    if (isDoubleClick) {
      pvState.openEditor(itemId);
    }
    else {
      pvState.handleItemClick(itemId);
    }
  }

  subitemsView = (rootCard: ICard, project: IProject) => {
    
    const subitems = getSubitemsIds(rootCard, project);
    if (!subitems) {
      return false;
    }

    return Object.keys(subitems).map((subitemId: string) => {
      return (
        <ProjectExplorerTreeViewItem 
          key={subitemId} 
          level={this.props.level+1} 
          pvState={this.props.pvState} 
          appState={this.props.appState}
          cardId={subitemId}
        />
      )
  
    });

  }

  buttonsView = () => {
    const isShowButtons = false;
    const state = this.state || {};

    if (isShowButtons || state.isMouseOver) {
      return (
        <span className={'project-explorer-tvi-header-buttons-container'}>
          <button className={'button'}>
            <FontAwesome name={'plus'} className={'project-explorer-tvi-icon'} style={{color: '#227e2e'}} />
          </button>
          <button className={'button'}>
            <FontAwesome name={'edit'} className={'project-explorer-tvi-icon'} style={{color: '#a4ad27'}} />
          </button>
          <button className={'button'}>
            <FontAwesome name={'remove'} className={'project-explorer-tvi-icon'} style={{color: '#822'}} />
          </button>
        </span>
      )
    }

    return false;
  }



  render () {
    const appState = this.props.appState;
    const project = appState.project;
    const cardId = this.props.cardId;
    const card = resolveReference(cardId, project);
    
    if (!card) {
      return false;
    }

    const pvState = this.props.pvState;
    const isSelected = pvState.selectedItemId === cardId;

    const icon = getIconForCard(card.cardType);

    const className = 'project-explorer-treeview-item' + (isSelected ? ' selected' : '');

    const contentClassName = 'project-explorer-treeview-item-content container-horizontal' + 
      (this.props.level === 0
        ? ' project-explorer-subheader'
        : ''
      ) + 
      (isSelected
        ? ' selected'
        : ''
      )

    const iconStyle = {}

    return (
      <div className={className}>
        <div 
          className={contentClassName} 
          style={{paddingLeft: (0.5 + this.props.level) + 'em'}}
          onMouseEnter={() => this.mouseEnter(this)}
          onMouseLeave={() => this.mouseLeave(this)}
          onClick={(e: any) => this.handleClick(this.props.pvState, cardId, e)}
        >
          <FontAwesome name={icon} className={'project-explorer-tvi-icon'} style={iconStyle}/>
          <span className={'project-explorer-tvi-text'}>
          {card.name}
          </span>
          {this.buttonsView()}
        </div>
        <div className={'project-explorer-treeview-item-subitems-container'}>
        {
          this.subitemsView(card, project)
        }
        </div>
      </div>
    )
  }
}