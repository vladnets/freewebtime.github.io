import { IUniqueObject } from '../IUniqueObject';
import { IVector2 } from '../IVector2';

export enum GraphItemType {
  Unknown = 'Unknown',
  Primitive = 'Primitive',
  Structure = 'Structure',
  Function = 'Function',
}

export interface IGraph {

}

export interface IGraphItem extends IUniqueObject {
  position: IVector2;
  size: IVector2;
  namespace: string;
  fullId: string;
}