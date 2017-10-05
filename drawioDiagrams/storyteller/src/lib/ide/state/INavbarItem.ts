import { NavbarItemTypes } from './NavbarItemTypes';

export interface INavbarItem {
    type: NavbarItemTypes,
    text: string,
    itemId: string,
    href?: string,
    isEnabled?: boolean,
    children?: INavbarItem[],
    onClick(e: INavbarItem): void;
  }
  