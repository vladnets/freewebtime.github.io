export interface IProjectItem {
  Id: string,
  ItemType: string,
  Tags: string[],
  Items: any[],
  Name?: string,
  Value?: any,
}