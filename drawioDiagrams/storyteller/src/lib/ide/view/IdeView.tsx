import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';

export class IdeView<TData> extends View<TData> {

  render(){
    return (<h1>hello world</h1>);
  }
}