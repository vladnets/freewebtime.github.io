import { IAppItem } from '../../framework/appData/IAppItem';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IApp } from '../appData/IApp';
import { AppView } from '../view/AppView';
import { IViewData } from '../../framework/view/IViewData';
import { ProjectView } from './ProjectView';
import { ProjectItemView } from './ProjectItemView';
import Theme from '../../framework/view/Theme';
import ItemTypes from '../appData/ItemTypes';
import { ITheme } from '../../framework/view/Theme';

const fillTemplate = (theme: ITheme) => {

  theme.addTemplate(undefined, undefined, (data: any = '') => {
    return (
      <div className={'default-renderer'}>{data.toString()}</div>
    )
  });

  theme.addTemplate(ItemTypes.ITEM_TYPE_APP, undefined, (data: IApp, viewData: IViewData) => {
      return (<AppView data={data} viewData={viewData} key={data.Id} />);
    });
      
  theme.addTemplate(undefined, undefined, (data: IAppItem, viewData: IViewData) => {
      return (<ProjectView data={data} viewData={viewData} key={data.Id} />);
    });
        
  theme.addTemplate(undefined, undefined, (data: IAppItem, viewData: IViewData) => {
      return (<ProjectItemView data={data} viewData={viewData} key={data.Id} />);
    });

  return theme;
}

const theme = {
  ...Theme,
  styles: {
    ...Theme.styles,
  }
}

export default (fillTemplate(theme));
