import './Template.css';
import { IAppState } from '../api/IAppState';
import * as React from 'react';
import { IHash } from '../api/IHash';
import FontAwesome from 'react-fontawesome';

export class TemplateView extends React.Component<{data: IAppState}> {
  render() {
    return (
      <div className={'app-content'}>
        <div className={'project-view'}>
          <div className={'project-content container-vertical'}>
            <div className={'container-horizontal main-menu-container app-panel'}>
              Main menu
            </div>
            <div className={'container-horizontal middle-content-container'}>
              <LeftSidebarView appState={this.props.data} />
              <div className={'editor-container'}>
                Editor
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
      </div>
    );
  }
} 

export class LeftSidebarView extends React.Component<{appState: IAppState}> {
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
            <FontAwesome name="folder-open" />
          </div>
        </div>
        <div className={'left-sidebar-content container-vertical'}>
          <ProjectExplorerView appState={this.props.appState}/>
        </div>
      </div>
    )
  }
}

export class ProjectExplorerView extends React.Component<{appState: IAppState}> {
  render() {
    return (
      <div className={'project-explorer container-vertical'}>
        <div className={'project-explorer-header'}>
          EXPLORER
        </div>
        <div className={'project-explorer-content'}>
          <ProjectExplorerItemsView appState={this.props.appState} />
        </div>  
      </div>      
    );
  }
}

export class ProjectExplorerItemsView extends React.Component<{appState: IAppState}> {
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
        <ProjectExplorerTreeViewItem data={rootItem} level={0} selectedId={'character'}/>
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
export class ProjectExplorerTreeViewItem extends React.Component<{data: IPetviProps, level: number, selectedId: string}> {
  render () {

    const subitemsView = () => {
      const subitems = this.props.data.subitems;
      if (subitems && subitems.length > 0) {
        return (
          subitems.map((subitem: IPetviProps) => {
            return (<ProjectExplorerTreeViewItem data={subitem} key={subitem.id} level={this.props.level+1} selectedId={this.props.selectedId} />)
          })
        )
      }

      return false;
    }

    const className = 
      'project-explorer-treeview-item' + 
      (this.props.selectedId === this.props.data.id
        ? ' selected'
        : ''
      )

    const contentClassName = 'project-explorer-treeview-item-content container-horizontal' + 
      (this.props.level === 0
        ? ' project-explorer-subheader'
        : ''
      )

    return (
      <div className={className}>
        <div className={contentClassName} style={{paddingLeft: (0.5 + this.props.level) + 'em'}}>
          <FontAwesome name={this.props.data.icon} className={'project-explorer-tvi-icon'}/>
          <span className={'project-explorer-tvi-text'}>
          {this.props.data.name}
          </span>
          <span className={'project-explorer-tvi-header-buttons-container'}>
            <button className={'button'}>
              <FontAwesome name={'edit'} className={'project-explorer-tvi-icon'}/>
            </button>
          </span>
        </div>
        <div className={'project-explorer-treeview-item-subitems-container'}>
        {subitemsView()}
        </div>
      </div>
    )
  }
}