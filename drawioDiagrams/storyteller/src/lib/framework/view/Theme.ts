import { IAppItem } from '../appData/IAppItem';
const defaultStyle: string = 'default';

export interface ITheme {
  styles: any;

  addTemplate(styleId: string|undefined, displayMode: string|undefined, template: any): void;
  getTemplate(dataId: string|undefined, itemType: string|undefined, styleName: string|undefined, displayMode: string|undefined): void;
}

const Theme: ITheme = {
  styles: {},

  addTemplate(styleId: string|undefined = defaultStyle, displayMode: string|undefined = defaultStyle, template: any) {
    if (!styleId) {
      return;
    }
    
    const style = this.styles[styleId] || {};
    style[displayMode] = template;
    this.styles[styleId] = style;
  },

  getTemplate(dataId: string, itemType: string = '', styleName: string = '', displayMode: string = defaultStyle) {
    let style: any;

    if (dataId) {
      style = this.styles[('#'+dataId)];
    }

    if (!style) {
      style = this.styles[('.' + styleName)];
    }

    if (!style) {
      style = this.styles[itemType];
    }

    if (!style) {
      return null;
    }

    return style[displayMode] || style;
  }
}

export default Theme;