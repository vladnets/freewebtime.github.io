import { IAppResources } from '../../api/IAppResources';
import { ViewBase } from '../View';
import { Store } from 'redux';
import * as React from 'react';
import { IHash } from '../../api/IHash';
import { v4 } from 'node-uuid';
import { ICallback } from '../../api/index';
import { appConfig } from '../../config/appConfig';
import { IProject } from '../../api/project/IProject';
import { IGraphNode, IReference, ReferenceType, ReferencePath } from '../../api/graph/IGraph';

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
          <ProjectItemView project={project} graphNode={project} resources={this.props.resources} indent={0} referencePath={referencePath} />
        </div>
    );
  }
}

export class ProjectItemView extends React.Component<{project: IProject, graphNode: IGraphNode, resources: IAppResources, indent: number, referencePath: ReferencePath}> {
  render () {
    const graphNode = this.props.graphNode;
    const project = this.props.project;
    const isExpanded = !graphNode.viewData.isCollapsed;
    const isSelected = project.selectedNode && project.selectedNode.targetFullId === graphNode.fullId;
    const indent = this.props.indent;

    const rootClassName = 'tree-view-item ' 
      + (isExpanded ? 'expanded' : 'collapsed')
    ;
    const foldIconClassName = 'tree-view-item-fold-icon ' + isExpanded ? 'expanded' : 'collapsed';
    const captionClassName = 'tree-view-item-caption' + (isSelected ? ' selected' : '');
    const subitemsClassName = 'tree-view-item-subitems';

    const captionStyle = {paddingLeft: (indent * 10) + 'px'};
    const subnodes = graphNode.subnodes;
    const subitemsCount = subnodes ? Object.keys(subnodes).length : 0;

    const subitemsView = () => {
      if (!subnodes) {
        return false;
      }

      return (
        Object.keys(subnodes).map((key: string, index: number)=> {
          const subnode = subnodes[key];
          const subRefPath = this.props.referencePath.concat([key]);

          return (
            <ProjectItemView key={key} project={project} graphNode={subnode} resources={this.props.resources} indent={indent+1} referencePath={subRefPath}/>
          )
        })
      )
    }

    const handleClick = (self: ProjectItemView) => {
      const reference: IReference = {
        referenceType: ReferenceType.Global,
        referencePath: this.props.referencePath,
        targetFullId: self.props.graphNode.fullId
      }
      self.props.resources.callback(appConfig.Actions.ProjectSelectModule(reference))
    }

    const caption = ' ⤷ ' + graphNode.name;
    const subItems = subitemsView();


    return (
      <div 
        className={rootClassName} 
        key={graphNode.id}
        onClick={(e)=>{
          e.stopPropagation();
          e.preventDefault();
          handleClick(this);
        }}
      >
        <div className={foldIconClassName} />
        <div className={captionClassName} style={captionStyle}>{caption}</div>
        {subitemsView()}
      </div>
    )
  }
}
