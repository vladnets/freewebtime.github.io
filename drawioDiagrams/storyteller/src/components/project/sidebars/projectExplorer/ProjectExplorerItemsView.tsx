import { ISymbol, SymbolType } from '../../../../api/project/ISymbol';
import { IAppState } from '../../../../api/IAppState';
import * as React from 'react';
import { IPetviProps, ProjectExplorerTreeViewItem } from './ProjectExplorerTreeViewItem';
import { IProjectViewState } from '../../ProjectView';
import { IInterface, InterfaceType } from '../../../../api/project/IInterface';
import { IItem, ItemType } from '../../../../api/project/IItem';

interface IPeivState {
  rootItem: IPetviProps;
}

export class ProjectExplorerItemsView extends React.Component<{appState: IAppState, pvState: IProjectViewState}, IPeivState> {
  
  itemColor = 'var(--explorer-item-color-file)';
  interfaceColor = 'var(--explorer-item-color-folder)';

  parsePath = (path: string): string[] => {
    return path.split('.');
  }

  resolvePathFast = (path: string[], root: IPetviProps): IPetviProps|undefined => {
    if (path.length === 0) {
      return root;
    }

    const nextItem = root.subitems[path[0]];
    if (!nextItem) {
      return undefined;
    }

    if (path.length === 1) {
      return nextItem;
    }

    const subpath = path.slice(1);
    return this.resolvePathFast(subpath, nextItem);
  }

  resolvePath = (path: string, root: IPetviProps): IPetviProps|undefined => {
    return this.resolvePathFast(this.parsePath(path), root);
  }

  addNamespaceFast = (path: string[], root: IPetviProps) => {
    if (path.length === 0) {
      return;
    }

    const nextItemName = path[0];
    let subitem = root.subitems[nextItemName];
    if (!subitem) {
      subitem = {
        id: nextItemName,
        name: nextItemName,
        icon: 'caret-down',
        iconColor: this.interfaceColor,
        subitems: {},
      }

      root.subitems[subitem.id] = subitem;
    }

    if (path.length > 1) {
      const newPath = path.slice(1);
      this.addNamespaceFast(newPath, subitem);
    }
  }

  addNamespace = (namespace: string, root: IPetviProps) => {
    var path = this.parsePath(namespace);
    this.addNamespaceFast(path, root);
  }

  collectTree = (): IPetviProps => {
    const root = {
      id: 'Project items',
      name: 'Project items',
      icon: 'caret-down',
      iconColor: this.interfaceColor,
      subitems: {},
    }

    const project = this.props.appState.project;
    const symbols = project.symbols;
    Object.keys(symbols).map((symbolId: string) => {
      const symbol: ISymbol = symbols[symbolId];
      this.addNamespace(symbol.fullId, root);
      const namespace = this.resolvePath(symbol.fullId, root);
      if (namespace) {
        namespace.symbol = symbol;
        namespace.id = symbol.fullId;
        if (symbol.symbolType === SymbolType.Interface) {
          namespace.iconColor = this.interfaceColor;
        }
        else {
          namespace.iconColor = this.itemColor;
        }
        
        switch (symbol.symbolType) {
          case SymbolType.Interface:
          {
            const intrface = symbol as IInterface;
            if (intrface) {
              switch (intrface.interfaceType) {
                case InterfaceType.Function:
                {
                  namespace.icon = 'share-square';
                } break;
                
                case InterfaceType.Primitive:
                {
                  namespace.icon = 'window-minimize';
                } break;
                
                case InterfaceType.Structure:
                {
                  namespace.icon = 'reorder';
                } break;
              
                default: break;
              }
            }
          } break;
          
          case SymbolType.Item:
          {
            const item = symbol as IItem;
            if (item) {
              switch (item.itemType) {
                case ItemType.FunctionCall:
                {
                  namespace.icon = 'microchip';
                } break;
                
                case ItemType.Object:
                {
                  namespace.icon = 'dot-circle-o';
                } break;
                
                case ItemType.SourceCode:
                {
                  namespace.icon = 'sitemap';
                } break;
              
                default: break;
              }
            }
          } break;        
          default: break;
        }
      }
    });

    return root;
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      rootItem: this.collectTree()
    })
  }
  
  render () {
    const folderColor = this.interfaceColor;
    const fileColor = this.itemColor;

    const className = 'project-explorer-items'; 
    return (
      <div className={className}>
        <ProjectExplorerTreeViewItem data={this.state.rootItem} level={0} pvState={this.props.pvState} />
      </div>
    );
  }
}
