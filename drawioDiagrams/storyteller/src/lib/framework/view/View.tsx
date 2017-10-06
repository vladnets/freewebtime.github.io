import * as React from 'react';

export class View<TData extends any> extends React.Component<TData> {

  renderCustom(data: TData, template: any) {

    const findTemplate = (dataTypeName: string, styleName: string, dataId: string, displayMode: string, template: any) => {

      const templateNotFound = (data: any) => {
        return (<span className={'template-not-found'}>{data}</span>);
      }
      
      if (!template) {
          return templateNotFound;
      }
  
      //search in dataType template if any. If none of nothing found, then search in root template. 
      //when searching in template: check is there style for dataId. If none, check by style name  
      let style: any;
  
      const dataTypeTemplate = template[dataTypeName];
      if (dataTypeTemplate) {
          style = (dataTypeTemplate[dataId] || dataTypeTemplate[styleName])
      }
  
      if (!style) {
          style = (template[dataId] || template[styleName]);
      }
  
      if (!style) {
          return templateNotFound;
      }
  
      //search by displayMode
      return style[displayMode] || style;
    }

    let dataTypeName: string = data.constructor.name;
    let styleName: string = data[('styleName')] 
    let dataId: string = data[('id')];
    let displayMode: string = data[('displayMode')]; 

    let internalData = data[('data')] || data;

    const renderer = findTemplate(dataTypeName, styleName, dataId, displayMode, template);
    if (renderer)
    {
      return renderer(data, template);
    }
    else{
      return (<span className={'warn-renderer-not-found'}>Renderer not found</span>);  
    }
  }
}