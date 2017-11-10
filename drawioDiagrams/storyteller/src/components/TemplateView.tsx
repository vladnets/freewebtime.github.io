import './Template.css';
import { IAppState } from '../api/IAppState';
import * as React from 'react';
import { IHash } from '../api/IHash';
import FontAwesome from 'react-fontawesome';
import { GraphView } from './Graph/GraphView';
import { EditorsPaneView } from './Project/EditorsPaneView';

export class TemplateView extends React.Component<{data: IAppState}> {
  render() {
    return (
      <div className={'app-content'}>
        <ProjectView appState={this.props.data} />
      </div>
    );
  }
} 

export interface IProjectViewState {
  selectedItemId: string;
  handleItemClick: (itemId: string) => void;
}

export class ProjectView extends React.Component<{appState: IAppState}, IProjectViewState> {
  state: IProjectViewState = {
    selectedItemId: 'basic types', 
    handleItemClick: (itemId: string) => {
      this.selectItem(this, itemId);
    }
  }
  
  selectItem(self: ProjectView, itemId: string) {
    self.setState({
      ...self.state,
      selectedItemId: itemId,
    });
  }
  
  render () {
    return (
      <div className={'project-view'}>
        <div className={'project-content container-vertical'}>
          <div className={'container-horizontal main-menu-container app-panel'}>
            Main menu
          </div>
          <div className={'container-horizontal middle-content-container'}>
            <LeftSidebarView appState={this.props.appState} pvState={this.state} />
            <div className={'editor-container'} >
              <EditorsPaneView data={this.props.appState.project} resources={this.props.appState.resources} />
            </div>
            <div className={'container-vertical right-sidebar-container app-panel'}>
              Properties
            </div>
          </div>
          <div className={'container-horizontal footer-container'}>
            Footer content
          </div>
        </div>
      </div>
    )
  }
}

export class LeftSidebarView extends React.Component<{appState: IAppState, pvState: IProjectViewState}> {
  render() {
    return (
      <div className={'container-horizontal left-sidebar-container app-panel'}>
        <div className={'container-vertical left-sidebar-icons-container'}>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="file-text" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="tag" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="sticky-note" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="navicon" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="code-fork" />
          </div>
        </div>
        <div className={'left-sidebar-content container-vertical'}>
          <ProjectExplorerView appState={this.props.appState} pvState={this.props.pvState} />
        </div>
      </div>
    )
  }
}

export class ProjectExplorerView extends React.Component<{appState: IAppState, pvState: IProjectViewState}> {
  render() {
    return (
      <div className={'project-explorer container-vertical'}>
        <div className={'project-explorer-header'}>
          EXPLORER
        </div>
        <div className={'project-explorer-content'}>
          <ProjectExplorerItemsView appState={this.props.appState} pvState={this.props.pvState} />
        </div>  
      </div>      
    );
  }
}

export class ProjectExplorerItemsView extends React.Component<{appState: IAppState, pvState: IProjectViewState}> {
  render () {
  
    const rootItem: IPetviProps = {
      id: 'new story',
      name: 'New story',
      icon: 'caret-down',
      subitems: [
        {
          id: 'lib',
          icon: 'caret-down',
          name: 'lib',
          subitems: [
            {
              id: 'system',
              icon: 'file',
              name: 'system',
              subitems: []
            },
            {
              id: 'markup',
              icon: 'file',
              name: 'markup',
              subitems: []
            },
          ]
        },
        {
          id: 'src',
          icon: 'caret-down',
          name: 'src',
          subitems: [
            {
              id: 'basic types',
              icon: 'caret-right',
              name: 'basic types',
              subitems: []
            },
            {
              id: 'character',
              icon: 'file',
              name: 'character',
              subitems: []
            },
            {
              id: 'storypoint',
              icon: 'file',
              name: 'storypoint',
              subitems: []
            },
            {
              id: 'location',
              icon: 'file',
              name: 'location',
              subitems: []
            }
          ]
        },
        {
          id: 'story',
          icon: 'file',
          name: 'story',
          subitems: []
        }
      ]
    }

    const className = 'project-explorer-items'; 
    return (
      <div className={className}>
        <ProjectExplorerTreeViewItem data={rootItem} level={0} pvState={this.props.pvState} />
      </div>
    );
  }
}

export interface IPetviProps {
  id: string;
  name: string;
  icon: string;
  subitems: IPetviProps[];
}
export class ProjectExplorerTreeViewItem extends React.Component<{data: IPetviProps, level: number, pvState: IProjectViewState}> {
  state = {
    isMouseOver: false
  }

  mouseEnter = (self: React.Component) => {
    self.setState({...this.state, isMouseOver: true });
  }
  mouseLeave = (self: React.Component) => {
    self.setState({...this.state, isMouseOver: false });
  }
  handleClick = (pvState: IProjectViewState, itemId: string, e: any) => {
    pvState.handleItemClick(itemId);
    e.preventDefault();
    e.stopPropagation();
  }

  render () {

    const subitemsView = () => {
      const subitems = this.props.data.subitems;
      if (subitems && subitems.length > 0) {
        return (
          subitems.map((subitem: IPetviProps) => {
            return (<ProjectExplorerTreeViewItem data={subitem} key={subitem.id} level={this.props.level+1} pvState={this.props.pvState} />)
          })
        )
      }

      return false;
    }

    const className = 
      'project-explorer-treeview-item' + 
      (this.props.pvState.selectedItemId === this.props.data.id
        ? ' selected'
        : ''
      )

    const contentClassName = 'project-explorer-treeview-item-content container-horizontal' + 
      (this.props.level === 0
        ? ' project-explorer-subheader'
        : ''
      ) + 
      (this.props.pvState.selectedItemId === this.props.data.id
        ? ' selected'
        : ''
      )

    const buttonsView = () => {
      const isShowButtons = false;
      
      if (isShowButtons || this.state.isMouseOver) {
        return (
          <span className={'project-explorer-tvi-header-buttons-container'}>
            <button className={'button'}>
              <FontAwesome name={'edit'} className={'project-explorer-tvi-icon'} style={{color: '#227e2e'}} />
            </button>
            <button className={'button'}>
              <FontAwesome name={'remove'} className={'project-explorer-tvi-icon'} style={{color: '#822'}} />
            </button>
          </span>
        )
      }

      return false;
    }

    return (
      <div className={className}>
        <div 
          className={contentClassName} 
          style={{paddingLeft: (0.5 + this.props.level) + 'em'}}
          onMouseEnter={() => this.mouseEnter(this)}
          onMouseLeave={() => this.mouseLeave(this)}
          onClick={(e: any) => this.handleClick(this.props.pvState, this.props.data.id, e)}
        >
          <FontAwesome name={this.props.data.icon} className={'project-explorer-tvi-icon'}/>
          <span className={'project-explorer-tvi-text'}>
          {this.props.data.name}
          </span>
          {buttonsView()}
        </div>
        <div className={'project-explorer-treeview-item-subitems-container'}>
        {subitemsView()}
        </div>
      </div>
    )
  }
}