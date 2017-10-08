import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import { IAppItem } from '../../framework/appData/IAppItem';

export class ProjectView extends View<IAppItem> {

  render(){

    const subitems = this.props.data.Content;

    return (
      <div>
        <h1>{this.props.data.Name}</h1>
        <ul>
          {this.renderContent({data: this.props.data, viewData: this.props.viewData})}
        </ul>
      </div>
    );
  } 
}