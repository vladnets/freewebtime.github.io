import Theme from './Theme';
import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import { IApp } from '../appData/IApp';
import { IdeView } from './IdeView';

export class AppView extends View<IApp> {

  render(){
    if (this.props.data) {
      return (
        <div className={'AppView'}>
          <View data={this.props.data.Ide} viewData={this.props.viewData} />
        </div>
      );
    }

    return (<div>template not found</div>);
  }
}
