import * as React from 'react';
import * as Bootstrap from 'react-bootstrap/lib';
import { NavbarItemTypes } from '../state/NavbarItemTypes';
import { INavbarData } from '../state/INavbarData';
import { INavbarItem } from '../state/INavbarItem';

export class NavigationBar extends React.Component<INavbarData> {
  constructor(props: INavbarData) {
    super(props);

    this.renderNavbarItem = this.renderNavbarItem.bind(this);
  }
  
  handleItemClick(item: INavbarItem) {
    if (!item) {
      return;
    }

    if (!item.onClick) {
      return;
    }

    item.onClick(item);
  }

  findMenuItemById(itemId: string, items: INavbarItem[]): INavbarItem | null {
    let result: INavbarItem | null = null;

    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      
      if (item.itemId === itemId) {
        result = item;
      } else if (item.children && item.children.length > 0) {
        result = this.findMenuItemById(itemId, item.children);
      }
      
      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  renderNavbarItem(navbarItem: INavbarItem){
    switch (navbarItem.type) {
      case NavbarItemTypes.Divider:
        return (
          <Bootstrap.MenuItem key={navbarItem.itemId}  divider={true} />
        );

      case NavbarItemTypes.Dropdown:
        let childrenItems: any;
        if (navbarItem.children){
          childrenItems = navbarItem.children.map(this.renderNavbarItem);
        }
        return (
            <Bootstrap.NavDropdown key={navbarItem.itemId} id={navbarItem.itemId} title={navbarItem.text}>
              {childrenItems}
            </Bootstrap.NavDropdown>
          );

      case NavbarItemTypes.Link:
        return (
          <Bootstrap.NavItem key={navbarItem.itemId} onClick={() => this.handleItemClick(navbarItem)} href={navbarItem.href ? navbarItem.href : '#'}>{navbarItem.text}</Bootstrap.NavItem>
        );

      case NavbarItemTypes.Text:
        return (
          <Bootstrap.NavItem key={navbarItem.itemId} onClick={() => this.handleItemClick(navbarItem)}>{navbarItem.text}</Bootstrap.NavItem>
        );

      default:
        return null;
    }
  }

  render() {
    return (
      <Bootstrap.Navbar>
      <Bootstrap.Nav>
        {this.props.items.map(this.renderNavbarItem)}
      </Bootstrap.Nav>
    </Bootstrap.Navbar>
    ); 
  }
}