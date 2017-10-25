import { IProject, IProjectItem, ProjectItemType } from '../../api/IAppState';
import { ViewBase } from '../View';
import { Store } from 'redux';
import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import { IFunction, IModule } from '../../api/INode';
import { getModuleById } from '../../helpers/index';

export class ProjectExplorerView extends React.Component<{data: IProject}, {isExpanded: boolean, selectedItem: string}> {
  state = {
    isExpanded: true,
    selectedItem: '',
  };
  handleItemClick = (itemId: string) => {
    this.setState({...this.state, selectedItem: itemId });
  };

  render() {
    const className = 'fullheight project-explorer' + (this.state.isExpanded ? ' expanded' : ' collapsed');
    const activeItem = this.state.selectedItem;
    const rootModule = getModuleById(this.props.data.rootModuleId, this.props.data);
    const items = rootModule ? rootModule.functions : {};

    return (
      <div className={className}>
        <div className={'panel-header'}>
          Project items
        </div>

        <ul>
        {
          Object.keys(items).map((key: string, index: number) => (
            <PiTreeViewItem data={items[key]} key={key} handleItemClick={this.handleItemClick} selectedItemId={this.state.selectedItem}/>
          ))
        }
        </ul>
      </div>
    );
  }
}

export class PiTreeViewItem extends ViewBase<{data: IFunction, selectedItemId: string, handleItemClick: (itemId: string) => void}> {
  render() {
    const item = this.props.data;

    const className = this.props.data.id === this.props.selectedItemId ? 'hightlighted' : '';
    const handleItemClick = (e: any)=>{
      e.preventDefault();
      e.stopPropagation();
      this.props.handleItemClick(this.props.data.id)
    };

    return (
      <li className={className} onClick={handleItemClick}>
        {item.name}
      </li>
    )
  }
}