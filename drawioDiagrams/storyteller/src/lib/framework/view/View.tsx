import * as React from 'react';
import { IViewData } from './IViewData';

export class View<TData> extends React.Component<IViewData<TData>> {

  renderCustom(viewData: IViewData<TData>, template: any) {

    const findTemplate = (viewData: IViewData<TData>) => {

      const templateNotFound = (data: any) => {
        return (<span className={'template-not-found'}>{(data || 'undefined').toString()}</span>);
      }
      
      if (!viewData) {
        return templateNotFound;
      }

      if (!template) {
          return templateNotFound;
      }
  
      //search in dataType template if any. If none of nothing found, then search in root template. 
      //when searching in template: check is there style for dataId. If none, check by style name  
      let style: any;
      let dataId: string = viewData.id || '';
      let styleName: string = viewData.styleName || '';

      if (viewData.data) {
        const dataTypeTemplate = template[viewData.data ? viewData.data.constructor.name : ''];
        if (dataTypeTemplate) {
          style = (dataTypeTemplate[dataId] || dataTypeTemplate[styleName])
        }
      }

      console.log('style is ', style);

      if (!style) {
          style = (template[dataId] || template[styleName]);
      }

      console.log('2. style is ', style, template);

      if (!style) {
        style = template[('default-template')];
      }

      console.log('3. style is ', style);

      if (!style) {
          return templateNotFound;
      }
  
      console.log('4. style is ', style);
      
      //search by displayMode
      return style[viewData.displayMode || 'default'] || style;
    }

    let internalData = viewData.data || viewData;

    const renderer = findTemplate(viewData);
    if (renderer)
    {
      return renderer(internalData, template);
    }
    else{
      return (<span className={'warn-renderer-not-found'}>Renderer not found</span>);  
    }
  }
}