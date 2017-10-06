import { IIdeItem } from './IIdeItem';

export interface IProject extends IIdeItem {
    Name: string,
    Created?: Date,
}
