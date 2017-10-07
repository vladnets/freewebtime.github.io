import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import { IAppItem } from '../../framework/appData/IAppItem';

export class IdeView extends View<IAppItem> {

  render() {

    return (
      <div className={'IdeView'}>
        {
          this.renderContent(this.props)
        }
      </div>
    );
  }
}
