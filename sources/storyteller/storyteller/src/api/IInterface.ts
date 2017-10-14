import { IHash } from './IHash';

export interface IType {
  id: string;
  name: string;
  baseTypeId: string;
  fields: IHash<ITypeReference>;
}

export interface ITypeReference {
  targetTypeId: string;
  targetType?: IType; 
}

export interface IFunction extends IType {
  args: IHash<ITypeReference>;
}

export interface IObject {
  id: string;
  name: string;
  type: IType,
  value?: any|undefined;
}

export interface IReference {
  targetPath: string|string[];
}


export interface IPointer extends IType {
  target: string;
}

export interface IField {

}