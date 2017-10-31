import { MemberType } from './MemberType';
import { IUniqueObject } from '../IUniqueObject';

export interface IMember extends IUniqueObject {
  memberType: MemberType;
}