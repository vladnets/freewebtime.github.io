export enum ReferenceType {
  Interface,
  Object,
}

export interface IReference {
  targetId: string;
  referenceType: ReferenceType;
}