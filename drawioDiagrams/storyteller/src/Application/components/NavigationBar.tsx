import * as React from 'react';
import * as Bootstrap from 'react-bootstrap/lib';

export enum NavbarItemTypes {
  Text,
  Divider,
  Dropdown,
  Link,
  Button,
}

export interface NavbarItem {
  type: NavbarItemTypes,
  text: string,
  itemId: string,
  href?: string,
  isEnabled?: boolean,
  children?: NavbarItem[],
  onClick: (e: NavbarItem) => {}
}

export interface NavbarData {
  headerUrl: string,
  headerText: string,
  items: NavbarItem[],
  onClick: (e: any) => void
}

export default class NavigationBar extends React.Component<NavbarData> {
  constructor(props: NavbarData) {
    super(props);
    this.state = {
      selected: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    this.props.onClick(e);
  }

  handleItemClick(item: NavbarItem) {
    if (!item) {
      return;
    }

    if (!item.onClick) {
      return;
    }

    item.onClick(item);
  }

  findMenuItemById(itemId: string, items: NavbarItem[]): NavbarItem | null {
    let result: NavbarItem | null = null;

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

  render() {
      return (

        <Bootstrap.Navbar>
          <Bootstrap.Nav>
            
            {this.props.items.map((navbarItem) => {
              switch (navbarItem.type) {
                case NavbarItemTypes.Button:
                  return (
                    <Bootstrap.Button onClick={() => this.handleItemClick(navbarItem)}>{navbarItem.text}</Bootstrap.Button>
                  );

                case NavbarItemTypes.Divider:
                  return (
                    <Bootstrap.MenuItem divider={true} />
                  );

                case NavbarItemTypes.Dropdown:
                  return (
                    <Bootstrap.Button onClick={() => this.handleItemClick(navbarItem)}>{navbarItem.text}</Bootstrap.Button>
                  );

                case NavbarItemTypes.Link:
                  return (
                    <Bootstrap.NavItem onClick={() => this.handleItemClick(navbarItem)} href={navbarItem.href ? navbarItem.href : '#'}>{navbarItem.text}</Bootstrap.NavItem>
                  );

                case NavbarItemTypes.Text:
                  return (
                    <Bootstrap.NavItem onClick={() => this.handleItemClick(navbarItem)}>{navbarItem.text}</Bootstrap.NavItem>
                  );

                default:
                  return ('');
              }
              
            })}

            {/* <Bootstrap.NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown">
              <Bootstrap.MenuItem eventKey={2.1} onClick={() => this.handleClick('Action 1')}>Action 1</Bootstrap.MenuItem>
              <Bootstrap.MenuItem eventKey={2.2} onClick={() => this.handleClick('Action 2')}>Action 2</Bootstrap.MenuItem>
              <Bootstrap.MenuItem eventKey={2.3} onClick={() => this.handleClick('Action 3')}>Action 3</Bootstrap.MenuItem>
            </Bootstrap.NavDropdown> */}
          
          </Bootstrap.Nav>
        </Bootstrap.Navbar>
      ); 
  }
}