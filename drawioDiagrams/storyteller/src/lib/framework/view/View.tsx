import { IAppItem } from '../appData/IAppItem';
import { IAction } from '../actions/IAction';
import * as React from 'react';
import { IViewData } from './IViewData';
import { Dispatch } from 'redux';

export class View<TData extends IAppItem> extends React.Component<{data: TData, viewData: IViewData}> {

  renderCustom(data: IAppItem, viewData: IViewData) {

    const findTemplate = (viewData: IViewData) => {

      const styleNotFound = (data: IAppItem) => {
        return (<span className={'style-not-found ' + JSON.stringify(data)}>{(data || 'undefined').toString()}</span>);
      }
      
      if (!data || !viewData || !viewData.theme) {
        return styleNotFound;
      }
  
      const style: any = viewData.theme.getTemplate(data.Id, data.ItemType, viewData.styleName, viewData.displayMode);
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

  renderContent(context: {data: IAppItem, viewData: IViewData}) {
    const result = (content: any, context: {data: IAppItem, viewData: IViewData}) => {
      return (<div className={context.data.ItemType}>{content}</div>)
    }

    const content = context.data.Content;
    if (!content) {
      return result('', context);  
    }

    return result (
      content.map((child: IAppItem) => 
        <View data={child} viewData={{...context.viewData, styleName: undefined}} key={child.Id} />,
      ),
      context
    )
  }

  dispatchAction(action: IAction) {
    if (this.props.viewData && this.props.viewData.callback) {
      this.props.viewData.callback(action);
    }
  }
}