import * as React from 'react';
import * as Bootstrap from 'react-bootstrap/lib';

export enum NavbarItemTypes {
  Divider
}

export interface NavbarItem {
  type: NavbarItemTypes,
  text: string,
  itemId: string,
  isEnabled: boolean,
  onClick: (itemId: string) => {}
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

  render() {
      return (
        <Bootstrap.Navbar>
            <Bootstrap.Button onClick={() => {this.handleClick('hello')}} >Some button text</Bootstrap.Button>
            <Bootstrap.Nav>
              <Bootstrap.NavItem eventKey={1} href="#">Link1</Bootstrap.NavItem>
              <Bootstrap.NavItem eventKey={3}>Yet one item</Bootstrap.NavItem>
              <Bootstrap.NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown">
                <Bootstrap.MenuItem eventKey={2.1} onClick={() => this.handleClick('Action 1')}>Action 1</Bootstrap.MenuItem>
                <Bootstrap.MenuItem eventKey={2.2} onClick={() => this.handleClick('Action 2')}>Action 2</Bootstrap.MenuItem>
                <Bootstrap.MenuItem eventKey={2.3} onClick={() => this.handleClick('Action 3')}>Action 3</Bootstrap.MenuItem>
              </Bootstrap.NavDropdown>
            </Bootstrap.Nav>
        </Bootstrap.Navbar>
      ); 

      // return (
      //   <Bootstrap.Navbar inverse collapseOnSelect>
      //     <Bootstrap.NavbarHeader>
      //       <Bootstrap.NavbarBrand>
      //         <a href={this.props.headerUrl}>{this.props.headerText}</a>
      //       </Bootstrap.NavbarBrand>
      //       <Bootstrap.NavbarToggle />
      //     </Bootstrap.NavbarHeader>
      //     <Bootstrap.Collapse>
      //       <Bootstrap.Nav>
      //         <Bootstrap.NavItem eventKey={1} href="#">Link</Bootstrap.NavItem>
      //         <Bootstrap.NavItem eventKey={2} href="#">Link</Bootstrap.NavItem>
      //         <Bootstrap.NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
      //           <Bootstrap.MenuItem eventKey={3.1}>Action</Bootstrap.MenuItem>
      //           <Bootstrap.MenuItem eventKey={3.2}>Another action</Bootstrap.MenuItem>
      //           <Bootstrap.MenuItem eventKey={3.3}>Something else here</Bootstrap.MenuItem>
      //           <Bootstrap.MenuItem divider />
      //           <Bootstrap.MenuItem eventKey={3.3}>Separated link</Bootstrap.MenuItem>
      //         </Bootstrap.NavDropdown>
      //       </Bootstrap.Nav>
      //       <Bootstrap.Nav pullRight>
      //         <Bootstrap.NavItem eventKey={1} href="#">Link Right</Bootstrap.NavItem>
      //         <Bootstrap.NavItem eventKey={2} href="#">Link Right</Bootstrap.NavItem>
      //       </Bootstrap.Nav>
      //     </Bootstrap.Collapse>
      //   </Bootstrap.Navbar>
      // );      
  }
}