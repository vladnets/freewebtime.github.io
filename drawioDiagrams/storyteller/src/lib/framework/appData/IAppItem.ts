export interface IAppItem {
  Id: string;
  ItemType?: string;
  Content?: any;
  Name?: string;
  Position?: {x: number, y: number};
  Size?: {x: number, y: number};
  IsRequired?: boolean;
}
