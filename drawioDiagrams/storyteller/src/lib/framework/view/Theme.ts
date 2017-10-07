import { IItem } from '../appData/IItem';
import styles from '../../ide/view/Theme';
const defaultStyle: string = 'default';

export class Theme {
  styles: any = {};

  public addTemplate(styleId: string|undefined = defaultStyle, displayMode: string|undefined = defaultStyle, template: any) {
    if (!styleId) {
      return;
    }
    
    const style = this.styles[styleId] || {};
    style[displayMode] = template;
  }

  public getStyle(dataId: string, itemType: string = '', styleName: string = '', displayMode: string = defaultStyle) {
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