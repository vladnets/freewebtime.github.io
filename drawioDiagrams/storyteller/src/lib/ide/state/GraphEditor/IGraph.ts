import { IGraphItem } from './IGraphItem';

export interface IGraph {
    Renderers: Map<string, any>,
    GraphItems: Map<string, IGraphItem>,
}