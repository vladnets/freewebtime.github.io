import { IAppResources } from '../../api/IAppResources';
import { IProject } from '../../api/IAppState';
import { ViewBase } from '../View';
import { Store } from 'redux';
import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import { IFunction, IModule } from '../../api/INode';
import { getModuleById } from '../../helpers/index';
import { IHash } from '../../api/IHash';
import { v4 } from 'node-uuid';
import { ICallback } from '../../api/index';
import { appConfig } from '../../config/appConfig';

export class ProjectExplorerView extends React.Component<{data: IProject, resources: IAppResources}, {isExpanded: boolean, selectedItem: string}> {
  state = {
    isExpanded: true,
    selectedItem: '',
  };

  handleItemClick = (itemId: string, callback: ICallback) => {
    //this.setState({...this.state, selectedItem: itemId });
    callback(appConfig.Actions.ProjectSelectModule(itemId));
  };

  render() {
    const className = 'fullheight project-explorer' + (this.state.isExpanded ? ' expanded' : ' collapsed');
    const activeItem = this.state.selectedItem;

    const modules = this.props.data.modules;
    const modulesSubitems = {}
    Object.keys(this.props.data.modules).map((key: string, index: number) => {
      const module = this.props.data.modules[key];
      modulesSubitems[key] = {
        caption: module.name,
        id: module.id,
        isExpanded: true,
        indent: 1,
      }
    });

    const handleItemClick = (itemId: string) => this.handleItemClick(itemId, this.props.resources.callback);
    const selectedModuleId = this.props.data.selectedModuleId || '';

    return (
      <div className={className}>
        <div className={'panel-header'}>
          Project items
        </div>

        <TreeViewItem caption={'imports'} id={'imports'} isExpanded={true} indent={1} selectedItemId={selectedModuleId} handleItemClick={handleItemClick}/>
        <TreeViewItem caption={'modules'} id={'modules'} isExpanded={true} indent={1} selectedItemId={selectedModuleId} subitems={modulesSubitems} handleItemClick={handleItemClick}/>
        </div>
    );
  }
}

declare type TviProps = {caption: string, id: string, isExpanded: boolean, indent: number, subitems?: IHash<TviProps>, selectedItemId: string, handleItemClick: (itemId: string)=>void};
export class TreeViewItem extends ViewBase<TviProps> {
  
  render () {
    const rootClassName = 'tree-view-item ' 
      + (this.props.isExpanded ? 'expanded' : 'collapsed')
    ;
    const foldIconClassName = 'tree-view-item-fold-icon ' + this.props.isExpanded ? 'expanded' : 'collapsed';
    const captionClassName = 'tree-view-item-caption' + (this.props.selectedItemId === this.props.id ? ' selected' : '');
    const subitemsClassName = 'tree-view-item-subitems';
    const style = {marginLeft: (this.props.indent * 0.4) + 'em'};
    const subitems = this.props.subitems;

    const subitemsView = subitems 
      ? (Object.keys(subitems).map((key: string, index: number) => (
          <TreeViewItem 
            key={subitems[key].id}
            caption={subitems[key].caption} 
            id={subitems[key].caption}
            isExpanded={subitems[key].isExpanded}
            indent={subitems[key].indent + 1}
            subitems={subitems[key].subitems}
            selectedItemId={this.props.selectedItemId}
            handleItemClick={this.props.handleItemClick}
          />
        )))
      : false;

    return (
      <div 
        className={rootClassName} 
        style={style} 
        key={this.props.id}
        onClick={(e)=>{
          e.stopPropagation();
          e.preventDefault();
          this.props.handleItemClick(this.props.id);
        }}
      >
        <div className={foldIconClassName} />
        <div className={captionClassName}>{this.props.caption}</div>
        {subitemsView}
      </div>
    )
  }
}
