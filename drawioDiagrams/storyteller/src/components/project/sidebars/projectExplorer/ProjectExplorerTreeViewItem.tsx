import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IProjectViewState } from '../../ProjectView';
import { IHash } from '../../../../api/IHash';
import { ISymbol } from '../../../../api/project/ISymbol';

export interface IPetviProps {
  id: string;
  name: string;
  icon: string;
  iconColor?: string;
  subitems: IHash<IPetviProps>;
  symbol?: ISymbol;
}

interface IPetviState {
  isMouseOver: boolean;
  lastTimeClick?: number;
}

export class ProjectExplorerTreeViewItem extends React.Component<{data: IPetviProps, level: number, pvState: IProjectViewState}, IPetviState> {
  mouseEnter = (self: React.Component) => {
    self.setState({...this.state, isMouseOver: true });
  }
  mouseLeave = (self: React.Component) => {
    self.setState({...this.state, isMouseOver: false });
  }
  handleClick = (pvState: IProjectViewState, itemId: string, e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const lastTimeClicked = this.state.lastTimeClick;
    const now = Date.now();
    const doubleClickInterval = 300;
    const delta = now - (lastTimeClicked ? lastTimeClicked : 0);
    const isDoubleClick = delta < doubleClickInterval;
    
    this.setState({
      ...this.state,
      lastTimeClick: now,
    })
    
    if (isDoubleClick) {
      pvState.openEditor(itemId);
    }
    else {
      pvState.handleItemClick(itemId);
    }
  }

  componentWillMount() {
    this.setState({
      ...this.state,
    });
  }

  render () {

    const subitemsView = () => {
      const subitems = Object.keys(this.props.data.subitems).map((key: string)=>{
        return this.props.data.subitems[key];
      });

      if (subitems && subitems.length > 0) {
        return (
          subitems.map((subitem: IPetviProps) => {
            return (<ProjectExplorerTreeViewItem data={subitem} key={subitem.id} level={this.props.level+1} pvState={this.props.pvState} />)
          })
        )
      }

      return false;
    }

    const className = 
      'project-explorer-treeview-item' + 
      (this.props.pvState.selectedItemId === this.props.data.id
        ? ' selected'
        : ''
      )

    const contentClassName = 'project-explorer-treeview-item-content container-horizontal' + 
      (this.props.level === 0
        ? ' project-explorer-subheader'
        : ''
      ) + 
      (this.props.pvState.selectedItemId === this.props.data.id
        ? ' selected'
        : ''
      )

    const buttonsView = () => {
      const isShowButtons = false;

      if (isShowButtons || this.state.isMouseOver) {
        return (
          <span className={'project-explorer-tvi-header-buttons-container'}>
            <button className={'button'}>
              <FontAwesome name={'plus'} className={'project-explorer-tvi-icon'} style={{color: '#227e2e'}} />
            </button>
            <button className={'button'}>
              <FontAwesome name={'edit'} className={'project-explorer-tvi-icon'} style={{color: '#a4ad27'}} />
            </button>
            <button className={'button'}>
              <FontAwesome name={'remove'} className={'project-explorer-tvi-icon'} style={{color: '#822'}} />
            </button>
          </span>
        )
      }

      return false;
    }

    const iconStyle = {}
    if (this.props.data.iconColor) {
      iconStyle['color'] = this.props.data.iconColor
    }

    return (
      <div className={className}>
        <div 
          className={contentClassName} 
          style={{paddingLeft: (0.5 + this.props.level) + 'em'}}
          onMouseEnter={() => this.mouseEnter(this)}
          onMouseLeave={() => this.mouseLeave(this)}
          onClick={(e: any) => this.handleClick(this.props.pvState, this.props.data.id, e)}
        >
          <FontAwesome name={this.props.data.icon} className={'project-explorer-tvi-icon'} style={iconStyle}/>
          <span className={'project-explorer-tvi-text'}>
          {this.props.data.name}
          </span>
          {buttonsView()}
        </div>
        <div className={'project-explorer-treeview-item-subitems-container'}>
        {subitemsView()}
        </div>
      </div>
    )
  }
}