import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';

export enum ObjectType {
  Unknown = 'Unknown',
  Primitive = 'Primitive',
  Structure = 'Structure',
  Function = 'Function',
}

export enum FunctionType {
  Unknown = 'Unknown',
  System = 'System',
  Graph = 'Graph',
}

export interface IObject extends IUniqueObject {
  namespace: string;
  fullId: string;
  objectType: ObjectType;

  typeId?: string;
  valueId?: string;
}

export interface IPrimitive extends IObject {
  primitiveType: string;
  value?: any;
}
export interface IStructure extends IObject {
  subitemsIdList: IHash<string>; //name: id
}
export interface IFunction extends IStructure
{
  functionType: FunctionType;
  paramsIdList: IHash<string>; //name: id
  resultId?: string; //result object id
  systemFunctionId?: string;
}
