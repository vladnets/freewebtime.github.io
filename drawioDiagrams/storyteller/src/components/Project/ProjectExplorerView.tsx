import { IReference } from '../../api/graph/IGraph';
import { appConfig } from '../../config/appConfig';
import { IProject } from '../../api/project/IProject';
import { IAppResources } from '../../api/IAppResources';
import { GraphNodeTreeViewItem } from './GraphNodeTreeViewItem';
import * as React from 'react';

export class ProjectExplorerView extends React.Component<{data: IProject, resources: IAppResources}> {
  render() {
    const className = 'fullheight project-explorer expanded';
    const callback = this.props.resources.callback;
    const project = this.props.data;
    const referencePath = [];

    return (
      <div className={className}>
        <div className={'panel-header'}>
          Project items
        </div>
          <GraphNodeTreeViewItem 
            project={project} 
            graphNode={project} 
            resources={this.props.resources} 
            indent={0} 
            referencePath={referencePath} 
            handleClick={(reference: IReference) => {
              this.props.resources.callback(appConfig.Actions.ProjectSelectModule(reference));
            }} 
            />
        </div>
    );
  }
}
