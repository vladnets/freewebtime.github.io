import { IHash } from '../IHash';

export type ReferencePathItem = string|number;
export type ReferencePath = ReferencePathItem[];

export interface IReference {
  targets: IHash<ReferencePath>;
}