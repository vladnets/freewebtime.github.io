import * as React from 'react';
import { IViewData } from './IViewData';
import { Dispatch } from 'redux';

export class View<TData> extends React.Component<{data: TData, viewData: IViewData}> {

  renderCustom(data: any, viewData: IViewData) {

    const findTemplate = (viewData: IViewData) => {

      const themeNotFound = (data: any) => {
        return (<span className={'theme-not-found'}>{(data || 'undefined').toString()}</span>);
      }
      
      if (!viewData) {
        return themeNotFound;
      }

      const theme = viewData.theme;
      if (!theme) {
          return themeNotFound;
      }
  
      //search in dataType theme if any. If none of nothing found, then search in root theme. 
      //when searching in theme: check is there style for dataId. If none, check by style name  
      let style: any;
      let dataId: string = viewData.id || '';
      let styleName: string = viewData.styleName || '';

      const dataTypeTemplate = theme[viewData.itemType || ''];
      if (dataTypeTemplate) {
        style = (dataTypeTemplate[dataId] || dataTypeTemplate[styleName] || dataTypeTemplate[('default')])
      }

      if (!style) { 
          style = (theme[dataId] || theme[styleName] || dataTypeTemplate[('default')]);
      }

      if (!style) {
        style = theme[('default-style')];
      }

      if (!style) {
          return themeNotFound;
      }
  
      //search by displayMode
      return style[viewData.displayMode || 'default'] || style;
    }

    const renderer = findTemplate(viewData);
    if (renderer)
    {
      return renderer(data, viewData);
    }
    else{
      return (<span className={'warn-renderer-not-found'}>Renderer not found</span>);  
    }
  }

  render() {
    if (this.props.data) {
      return this.renderCustom(this.props.data, this.props.viewData); 
    }
  }
}