import { IItem } from '../appData/IItem';
import { IAction } from '../actions/IAction';
import * as React from 'react';
import { IViewData } from './IViewData';
import { Dispatch } from 'redux';

export class View<TData extends IItem> extends React.Component<{data: TData, viewData: IViewData}> {

  renderCustom(data: IItem, viewData: IViewData) {

    const findTemplate = (viewData: IViewData) => {

      const styleNotFound = (data: IItem) => {
        return (<span className={'style-not-found'}>{(data || 'undefined').toString()}</span>);
      }
      
      if (!data || !viewData || !viewData.theme) {
        return styleNotFound;
      }
  
      const style: any = viewData.theme.getStyle(data.Id, data.ItemType, viewData.styleName, viewData.displayMode);
      return style || styleNotFound;
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

  dispatchAction(action: IAction) {
    if (this.props.viewData && this.props.viewData.callback) {
      this.props.viewData.callback(action);
    }
  }
}