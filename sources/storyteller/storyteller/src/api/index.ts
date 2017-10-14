import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IAction } from './IAction';
import { View } from '../view/View';

export type ITheme = IHash<(data: any, appResources: IAppResources) => JSX.Element>
export type ICallback = (action: IAction) => void;