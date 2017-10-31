export type ReferencePathItem = string|number;
export type ReferencePath = ReferencePathItem[];

export interface IReference {
  path: ReferencePath;
}