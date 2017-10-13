import { IHash } from './IHash';
import { IAppResources } from './IAppResources';
import { IAction } from './IAction';

export type IViewTemplate = (data: any, resources: IAppResources) => JSX.Element;
export type ITheme = IHash<IViewTemplate>
export type ICallback = (action: IAction) => void;