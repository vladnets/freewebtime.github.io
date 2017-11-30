import { resolveReferenceFast } from '../../../../helpers';
import { getStructureItem, getStructureRoot } from '../../../../helpers/projectStructureHelper';
import { IAppState } from '../../../../api/IAppState';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IProjectViewState } from '../../ProjectView';
import { IHash } from '../../../../api/IHash';
import { ISymbol, SymbolType } from '../../../../api/project/ISymbol';
import { IInterface } from '../../../../api/project/IInterface';
import { getIconForSymbol } from '../../../../helpers/index';
import { IProjectStructureItem } from '../../../../api/project/IProjectStructureItem';

export interface IPetviProps {
  structureItemId: string;
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

  subitemsView = (structureItem: IProjectStructureItem) => {
    const subitems = Object.keys(structureItem.subitems).map((key: string)=>{
      return structureItem.subitems[key];
    });

    if (subitems && subitems.length > 0) {
      return (
        subitems.map((subitemId: string) => {
          return (
            <ProjectExplorerTreeViewItem 
              key={subitemId} 
              level={this.props.level+1} 
              pvState={this.props.pvState} 
              appState={this.props.appState}
              structureItemId={subitemId}
            />
          )
        })
      )
    }

    return false;
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
    const structItemId = this.props.structureItemId;
    const structureItem = getStructureItem(structItemId, project);
    if (!structureItem) {
      return false;
    }
    
    const pvState = this.props.pvState;
    const isSelected = pvState.selectedItemId === structItemId;

    const symbol = resolveReferenceFast(structItemId, project);
    const icon = getIconForSymbol(symbol);
    const symbolName = symbol ? symbol.name : structureItem.name;

    const className = 'project-explorer-treeview-item' + (isSelected ? ' selected' : '');

    const contentClassName = 'project-explorer-treeview-item-content container-horizontal' + 
      (this.props.level === 0
        ? ' project-explorer-subheader'
        : ''
      ) + 
      (this.props.pvState.selectedItemId === this.props.structureItemId
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
          onClick={(e: any) => this.handleClick(this.props.pvState, structItemId, e)}
        >
          <FontAwesome name={icon} className={'project-explorer-tvi-icon'} style={iconStyle}/>
          <span className={'project-explorer-tvi-text'}>
          {symbolName}
          </span>
          {this.buttonsView()}
        </div>
        <div className={'project-explorer-treeview-item-subitems-container'}>
        {
          this.subitemsView(structureItem)
        }
        </div>
      </div>
    )
  }
}