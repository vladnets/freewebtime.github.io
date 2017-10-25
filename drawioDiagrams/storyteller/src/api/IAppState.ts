import { IFunction, IModule, IModuleReference, INode, IType, IUniqueObject } from './INode';
import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IViewItem } from './IViewItem';

export interface IAppState {
  project: IProject;
  resources: IAppResources;
}

export interface IModuleImportReference extends IUniqueObject {
  moduleId: string;
  url: string;
}

export interface IProject extends IUniqueObject {
  modules: IHash<IModule>;
  imports: IHash<IModuleImportReference>;
  exports: IHash<IModuleReference>;
  rootModuleId: string;
  selectedModuleId?: string;
}
