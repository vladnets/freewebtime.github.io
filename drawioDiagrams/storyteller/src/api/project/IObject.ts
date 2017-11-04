import { IHash } from '../IHash';
import { IReference } from './IReference';
import { IUniqueObject } from '../IUniqueObject';

export enum ObjectType {
  Primitive,
  Function,
  Object,
  Array,
  FunctionCall,
}

export interface IObject extends IUniqueObject {
  objectType: ObjectType;
  typeReference: IReference;

  value?: any; //for primitives
  params?: IHash<IReference>; //for function call
  targetFunction?: IReference; //for function call
}