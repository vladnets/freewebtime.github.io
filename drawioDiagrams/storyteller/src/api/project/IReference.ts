export enum ReferenceType {
  Interface,
  Item,
}

export interface IReference {
  targetId: string;
  referenceType: ReferenceType;
}