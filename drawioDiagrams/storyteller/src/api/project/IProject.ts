import { IUniqueObject } from '../IUniqueObject';
import { IInterface } from './IInterface';
import { IHash } from '../IHash';

export interface IProject extends IUniqueObject {
  interfaces: IHash<IInterface>;
}