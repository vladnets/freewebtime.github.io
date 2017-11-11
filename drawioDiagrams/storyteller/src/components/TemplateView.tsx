import './Template.css';
import { IAppState } from '../api/IAppState';
import * as React from 'react';
import { IHash } from '../api/IHash';
import FontAwesome from 'react-fontawesome';
import { GraphView } from './Graph/GraphView';
import { EditorsPaneView } from './Project/EditorsPaneView';
import { CardboardView } from './CarboardView';

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

export class EditorsContainerView extends React.Component<{appState: IAppState}> {
  render () {
    return (
      <div className={'editors-container container-vertical'} >
        <div className={'editors-tabs-container container-horizontal'}>
          <div className={'editor-tab-header container-horizontal'}>
            <FontAwesome name={'file'} className={'editor-tab-header-item icon'} />
            <div className={'editor-tab-header-item text'}>
              character
            </div>
            <FontAwesome name={'remove'} className={'editor-tab-header-item close-button'} />
          </div>
          <div className={'editor-tab-header selected container-horizontal'}>
            <FontAwesome name={'file'} className={'editor-tab-header-item icon'} />
            <div className={'editor-tab-header-item text'}>
              storypoint
            </div>
            <FontAwesome name={'remove'} className={'editor-tab-header-item close-button'} />
          </div>
          <div className={'editor-tab-header container-horizontal'}>
            <FontAwesome name={'file'} className={'editor-tab-header-item icon'} />
            <div className={'editor-tab-header-item text'}>
              location
            </div>
            <FontAwesome name={'remove'} className={'editor-tab-header-item close-button'} />
          </div>
          <div className={'editor-tab-header container-horizontal'}>
            <FontAwesome name={'file'} className={'editor-tab-header-item icon'} />
            <div className={'editor-tab-header-item text'}>
              system
            </div>
            <FontAwesome name={'remove'} className={'editor-tab-header-item close-button'} />
          </div>
        </div>

        <div className={'editor-root container-vertical'}>
          <CardboardView appState={this.props.appState}/>
        </div>
      </div>
    )
  }
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
            <EditorsContainerView appState={this.props.appState} />
            <RightSidebarView appState={this.props.appState} pvState={this.state} />
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

export class ObjectPropertiesView extends React.Component<{appState: IAppState, pvState: IProjectViewState}> {
  render() {
    return (
      <div className={'object-properties-container container-vertical'}>
        <div className={'object-properties-header'}>
          PROPERTIES
        </div>
        <div className={'object-properties-content'}>
          Object properties
        </div>  
      </div>      
    );
  }
}

export class RightSidebarView extends React.Component<{appState: IAppState, pvState: IProjectViewState}> {
  render() {
    return (
      <div className={'container-horizontal right-sidebar-container app-panel'}>
        <div className={'right-sidebar-content container-vertical'}>
          <ObjectPropertiesView appState={this.props.appState} pvState={this.props.pvState} />
        </div>
        <div className={'container-vertical left-sidebar-icons-container'}>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="wrench" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="tag" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="navicon" />
          </div>
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

    const fileColor = 'var(--explorer-item-color-file)';
    const folderColor = 'var(--explorer-item-color-folder)';
    
    const rootItem: IPetviProps = {
      id: 'new story',
      name: 'New story',
      icon: 'caret-down',
      iconColor: folderColor,
      subitems: [
        {
          id: 'lib',
          icon: 'caret-down',
          name: 'lib',
          iconColor: folderColor,
          subitems: [
            {
              id: 'system',
              icon: 'file',
              name: 'system',
              iconColor: fileColor,
              subitems: []
            },
            {
              id: 'markup',
              icon: 'file',
              name: 'markup',
              iconColor: fileColor,
              subitems: []
            },
          ]
        },
        {
          id: 'src',
          icon: 'caret-down',
          name: 'src',
          iconColor: folderColor,
          subitems: [
            {
              id: 'basic types',
              icon: 'caret-right',
              name: 'basic types',
              iconColor: folderColor,
              subitems: []
            },
            {
              id: 'character',
              icon: 'file',
              name: 'character',
              iconColor: fileColor,
              subitems: []
            },
            {
              id: 'storypoint',
              icon: 'file',
              name: 'storypoint',
              iconColor: fileColor,
              subitems: []
            },
            {
              id: 'location',
              icon: 'file',
              name: 'location',
              iconColor: fileColor,
              subitems: []
            }
          ]
        },
        {
          id: 'story',
          icon: 'file',
          name: 'story',
          iconColor: fileColor,
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
  iconColor?: string;
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

    const iconStyle = {}
    if (this.props.data.iconColor) {
      iconStyle['color'] = this.props.data.iconColor
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
          <FontAwesome name={this.props.data.icon} className={'project-explorer-tvi-icon'} style={iconStyle}/>
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