import { IHash } from './IHash';
export interface IGraphNode {
  type: string,
  name: string,
  value?: any,
  intput: IHash<IGraphNode>,
  locals: IHash<IGraphNode>,
  output: IHash<IGraphNode>,
}