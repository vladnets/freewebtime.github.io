import { IProjectOld } from '../../api/project/IProject';
import { IGraphNode, IReferenceOld, ReferencePath, ReferenceType } from '../../api/graph/IGraph';
import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';
import { parsePathItem, parseNodePath, createReference } from '../../helpers/index';

export interface IGniviProps {
  project: IProjectOld, 
  graphNode: IGraphNode, 
  resources: IAppResources, 
  indent: number, 
  referencePath: ReferencePath,
  handleClick: (reference: IReferenceOld)=> void
}

export class GraphNodeTreeViewItem extends React.Component<IGniviProps>{
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
            <GraphNodeTreeViewItem 
              key={key} 
              project={project} 
              graphNode={subnode} 
              resources={this.props.resources} 
              indent={indent+1} 
              referencePath={subRefPath} 
              handleClick={this.props.handleClick}
            />
          )
        })
      )
    }

    const handleClick = (self: GraphNodeTreeViewItem) => {
      const reference: IReferenceOld = createReference(self.props.graphNode);
      console.log('create reference', reference, this.props.graphNode);
      self.props.handleClick(reference);
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