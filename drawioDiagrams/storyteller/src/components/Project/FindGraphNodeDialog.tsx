import * as React from 'react';
import { IProject } from '../../api/project/IProject';
import { GraphNodeTreeViewItem } from './GraphNodeTreeViewItem';
import { IReference } from '../../api/graph/IGraph';
import { IAppResources } from '../../api/IAppResources';
import { appConfig } from '../../config/appConfig';

export class FindGraphNodeDialog extends React.Component<{project: IProject, resources: IAppResources, isVisible?: boolean}> {
  
  render () {

    const className = 'modal-dialog';
    const project = this.props.project;
    const referencePath = [];

    if (this.props.isVisible) {
      return (
        <div className={'modal-dialog-background'}>
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
        </div>
      );
    }

    return false;
  }
}