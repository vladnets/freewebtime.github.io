import { IUniqueObject } from '../IUniqueObject';
import { IFunction } from './IFunction';
import { IHash } from '../IHash';

export interface IProject extends IUniqueObject {
  modules: IHash<IFunction>;
  imports: IHash<IFunction>;

  selectedModuleId?: string;
}
