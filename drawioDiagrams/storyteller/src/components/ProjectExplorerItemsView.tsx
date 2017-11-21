import * as React from 'react';
import { IProjectViewState } from './ProjectView';
import { IPetviProps, ProjectExplorerTreeViewItem } from './ProjectExplorerTreeViewItem';

export class ProjectExplorerItemsView extends React.Component<{appState: any, pvState: IProjectViewState}> {
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
