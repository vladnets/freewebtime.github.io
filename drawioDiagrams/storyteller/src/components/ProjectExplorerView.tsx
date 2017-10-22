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
  handleItemClick = (e, { name }) => this.setState({...this.state, selectedItem: name });

  render() {
    const className = 'fullheight project-explorer' + (this.state.isExpanded ? ' expanded' : ' collapsed');
    const activeItem = this.state.selectedItem;
    const items = this.props.data.projectItems;

    return (
      <div className={className}>
        <div className={'panel-header'}>
          Project items
        </div>
      
        <List inverted divided selection verticalAlign={'middle'}>
        {
          Object.keys(items).map((key: string, index: number) => (
            <PiTreeViewItem data={items[key]} key={key} handleItemClick={this.handleItemClick} selectedItemId={this.state.selectedItem}/>
          ))
        }
        </List>

        <Button.Group >
          <Button>Add</Button>
          <Button>Remove</Button>
        </Button.Group>

      </div>
    );
  }
}

export class PiTreeViewItem extends ViewBase<{data: IProjectItem, selectedItemId: string, handleItemClick: (e: any, { name }: { name: any; }) => void}> {
  state = {
    isExpanded: true,
    selectedItem: '',
  };
  handleItemClick = (e, { name }) => this.setState({...this.state, selectedItem: name });

  render() {
    const item = this.props.data;
    const items = item.subitems;
    let subitemsCount = 0;
    let subitemsView = (
      <List.Content>
        <List inverted divided selection verticalAlign={'middle'}>
        {
          Object.keys(items).map((key: string, index: number) => {
            subitemsCount++;
            return (<PiTreeViewItem data={items[key]} key={key} handleItemClick={this.handleItemClick} selectedItemId={this.state.selectedItem}/>)
          })
        }
        </List>
      </List.Content>
    );
    if (subitemsCount <= 0) {
      subitemsView = false;
    }

    return (
      <List.Item size={'small'} key={item.id} className={'project-explorer-item'} name={item.id} active={this.props.selectedItemId === item.id} onClick={this.props.handleItemClick} >
        <List.Icon name={item.type === ProjectItemType.File ? 'file' : 'folder'} /> 
        <List.Content>
          <List.Header>{item.name}</List.Header>
        </List.Content>
        {subitemsView}
      </List.Item>
    )
  }
}