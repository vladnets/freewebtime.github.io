import { IReference } from './IReference';
import { IMember } from './IMember';
import { IHash } from '../IHash';
import { IFunctionArgument } from './IFunctionArgument';
import { IFunctionCall } from './IFunctionCall';

export interface IFunction extends IMember {
  args: IHash<IFunctionArgument>;
  result: IFunctionCall;
  locals: IHash<IMember>;
  imports: IHash<IReference>;
}