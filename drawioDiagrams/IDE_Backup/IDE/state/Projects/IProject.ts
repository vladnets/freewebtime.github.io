import { IIDEItem } from '../IIdeItem';

export interface IProject extends IIDEItem {
    Name: string,
    Created?: Date,
}
