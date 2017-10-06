import * as React from 'react';
import * as Bootstrap from 'react-bootstrap/lib';
import { NavbarItemTypes } from '../state/NavbarItemTypes';
import { INavbarData } from '../state/INavbarData';
import { INavbarItem } from '../state/INavbarItem';

export class NavigationBar extends React.Component<{data: INavbarData}> {
  
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

  renderNavbarItem(navbarItem: INavbarItem, root: NavigationBar){
    console.log('rendering...', navbarItem, root, navbarItem.type);
    
    switch (navbarItem.type) {
      case NavbarItemTypes.Divider:
        return (
          <Bootstrap.MenuItem key={navbarItem.itemId}  divider={true} />
        );

      case NavbarItemTypes.Dropdown:
        let childrenItems: any;
        if (navbarItem.children){
          childrenItems = navbarItem.children.map((item)=>{root.renderNavbarItem(item, root)});
        }
        return (
            <Bootstrap.NavDropdown key={navbarItem.itemId} id={navbarItem.itemId} title={navbarItem.text}>
              {childrenItems}
            </Bootstrap.NavDropdown>
          );

      case NavbarItemTypes.Link:
        return (
          <Bootstrap.NavItem key={navbarItem.itemId} onClick={() => root.handleItemClick(navbarItem)} href={navbarItem.href ? navbarItem.href : '#'}>{navbarItem.text}</Bootstrap.NavItem>
        );

      case NavbarItemTypes.Text:
        console.log('rendering text', navbarItem, root);

        let result = 
        (
          <Bootstrap.NavItem key={navbarItem.itemId} onClick={() => root.handleItemClick(navbarItem)}>{navbarItem.text}</Bootstrap.NavItem>
        );
        
        return result;

      default:
        return null;
    }
  }

  render() {

    return (
      <div>
        <Bootstrap.Navbar>
          <Bootstrap.Nav>
            {this.props.data.items.map((item)=>{
              return this.renderNavbarItem(item, this)
            })}
          </Bootstrap.Nav>
        </Bootstrap.Navbar>
      </div>
    ); 
  }
}