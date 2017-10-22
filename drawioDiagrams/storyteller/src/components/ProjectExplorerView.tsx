import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IProject, ProjectItemType, IProjectItem } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { List, Segment, Icon, Card, Menu, Button } from 'semantic-ui-react';
import { foreachFields } from '../helpers/index';

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
    const items = this.props.data.projectItems;

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

export class PiTreeViewItem extends ViewBase<{data: IProjectItem, selectedItemId: string, handleItemClick: (itemId: string) => void}> {
  render() {
    const item = this.props.data;
    const items = item.subitems;
    let subitemsCount = 0;
    let subitemsView = (
      <ul>
      {
        Object.keys(items).map((key: string, index: number) => {
          subitemsCount++;
          return (<PiTreeViewItem data={items[key]} key={key} handleItemClick={this.props.handleItemClick} selectedItemId={this.props.selectedItemId}/>)
        })
      }
      </ul>
    );
    if (subitemsCount <= 0) {
      subitemsView = false;
    }

    const className = this.props.data.id === this.props.selectedItemId ? 'hightlighted' : '';
    const handleItemClick = (e: any)=>{
      e.preventDefault();
      e.stopPropagation();
      this.props.handleItemClick(this.props.data.id)
    };

    return (
      <li className={className} onClick={handleItemClick}>
        <Icon name={item.type === ProjectItemType.File ? 'file' : 'folder'} /> 
        {item.name}
        {subitemsView}
      </li>
    )
  }
}