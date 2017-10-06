import { IGraphProject } from '../../state/Projects/GraphProject/IGraphProject';
import { IGraphItem } from '../../state/GraphEditor/IGraphItem';
import { CreateGuid } from '../../../CreateGuid.js';
import ItemTypes from '

const items = [
    <IGraphItem>{
        Id: CreateGuid(),
        Name: 'first node',
        ItemType: string,
        RenderMode: string
        Data: any,
    }
];

const graphItems = {};
items.map((item)=>{graphItems[item.Id] = item});

export default <IGraphProject>{
    Name: 'New Project',
    Data: {
        Graph: {
            Items: graphItems
        }
    },
    GraphItems: graphItems,
}