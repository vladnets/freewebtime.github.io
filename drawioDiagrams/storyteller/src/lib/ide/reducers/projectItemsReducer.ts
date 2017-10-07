import { IProjectItem } from '../appData/IProjectItem';
import { CreateGuid } from '../../CreateGuid';

export default function(): IProjectItem[] {
  return [
    {
      Id: CreateGuid(),
      Items: [],
      Tags: ['hello-world'],
      ItemType: 'textItem',
      Value: 'hello',
      Name: 'Word 1'
    },
    {
      Id: CreateGuid(),
      Items: [],
      Tags: ['hello-world'],
      ItemType: 'textItem',
      Value: 'world',
      Name: 'Word 2'
    },
    {
      Id: CreateGuid(),
      Items: [],
      Tags: ['hello-world'],
      ItemType: 'textItem',
      Value: '!!!',
      Name: 'Word 3'
    },
  ]
}