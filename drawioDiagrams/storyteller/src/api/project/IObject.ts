import { IHash } from '../IHash';
import { IMember } from './IMember';
import { IReference } from './IReference';

export interface IObject {
  id: string;
  name: string;
  type: IReference;
  members?: IHash<IObject>;
  value: any;
}