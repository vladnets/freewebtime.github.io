import { IReference } from './IReference';
import { IHash } from '../IHash';
import { IUniqueObject } from '../IUniqueObject';

export enum TypeCategory {
  Primitive,
  Object,
  Function,
  Array,
}

export enum ExpressionType {
  FunctionCall,
  
}

export interface IExpression {
  expressionType: ExpressionType;
}

export interface IType extends IUniqueObject {
  typeCategory: TypeCategory;
  fields?: IHash<ITypeField>;
  args?: IHash<ITypeField>;
  returns?: IHash<ITypeField>;
  functionBody?: IHash<IExpression>;
}

export interface ITypeField extends IUniqueObject {
  fieldType: IReference;
  isRequired: boolean;
}