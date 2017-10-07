import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import { IApp } from '../appData/IApp';

export class AppView<IApp> extends View<IApp> {

  render(){
    return this.renderCustom(this.props, this.props.template);
  }
}