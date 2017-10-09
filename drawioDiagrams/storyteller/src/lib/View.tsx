import { IViewContext } from './IViewData';
import * as React from 'react';
import { IViewItem } from './IViewItem';

export class View extends React.Component<{data: any, viewContext: IViewContext, isContainer?: boolean}> {
  render(): any {
    if (!this.props.data) {
      return false;
    }

    if (Array.isArray(this.props.data)) {
      return (this.props.data.map((item, index)=>
        <View data={item} viewContext={this.props.viewContext} key={index} />
      ));
    }
    
    const viewItem: IViewItem = this.props.data;

    if (viewItem) {
      if (viewItem.Id) {
        const template = this.props.viewContext.theme['#'+viewItem.Id];
        if (template) {
          return template(this.props.data, this.props.viewContext);
        }
      }
  
      if (viewItem.ClassName) {
        const template = this.props.viewContext.theme['.'+viewItem.ClassName];
        if (template) {
          return template(this.props.data, this.props.viewContext);
        }
      }
  
      if (viewItem.ItemType) {
        const template = this.props.viewContext.theme[viewItem.ItemType];
        if (template) {
          return template(this.props.data, this.props.viewContext);
        }
      }

      if (viewItem.Content) {
        if (Array.isArray(viewItem.Content)) {
          return (viewItem.Content.map((item, index)=>
            <View data={item} viewContext={this.props.viewContext} key={index} />
          ));
        }
      }
    }

    return (<div className={'no-template itemtype:' + viewItem.ItemType + ' className:' + viewItem.ClassName + ' Id:' + viewItem.Id}>{this.props.data}</div>)
  }
}