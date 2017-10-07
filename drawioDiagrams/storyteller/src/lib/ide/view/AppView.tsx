import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import { IApp } from '../appData/IApp';
import { IdeView } from './IdeView';
import { IAppItem } from '../../framework/appData/IAppItem';

export class AppView extends View<IApp> {
  render() {
    return (this.renderContent(this.props));
  }
}
