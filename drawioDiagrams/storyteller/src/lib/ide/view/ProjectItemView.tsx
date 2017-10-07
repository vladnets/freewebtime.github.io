import { IAppItem } from '../../framework/appData/IAppItem';
import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import Actions from '../actions';

export class ProjectItemView extends View<IAppItem> {

  render(){
    return (
      <div>
        <h3 onClick={() => {this.dispatchAction(Actions.project.projectSelectItem(this.props.data.Id))}}>
          {this.props.data.Content}
        </h3>
      </div> 
    );
  } 
}