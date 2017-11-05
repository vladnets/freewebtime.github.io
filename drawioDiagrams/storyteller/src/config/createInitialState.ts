import { IProject } from '../api/project/IProject';
import { v4 } from 'node-uuid';
import { GraphNodeType, IGraphNode, IReference, ReferencePath, ReferenceType } from '../api/graph/IGraph';
import { appConfig } from './appConfig';

export const createInitialState = (): IProject => {
  
  const createNode = (params: {}): IGraphNode => {
    const id: string = params[('id')] as string || v4();
    const result = {
      fullId: id,
      nodeType: GraphNodeType.Primitive,
      viewData: {
        position: {x: 0, y: 0},
        size: {x: 120, y: 80},
        isCollapsed: false,
      },
      ...params,
      id: id,
      name: id,
    }

    return result;
  }

  const createPrimitiveNode = (params: {}): IGraphNode => {
    return createNode({...params, nodeType: GraphNodeType.Primitive});
  }

  const createConstructionNode = (params: {}): IGraphNode => {
    return createNode({...params, nodeType: GraphNodeType.Construction});
  }

  const nodeSetParent = (node: IGraphNode, parent: IGraphNode) => {
    node.fullId = parent.fullId + '.' + node.id;
    if (!parent.subnodes) {
      parent.subnodes = {}
    }
    parent.subnodes[node.id] = node;
  }

  const createSystemNode = (): IGraphNode => {
    
    const systemNode: IGraphNode = createConstructionNode({id: 'System'});

    //create primitives
    const primitiveTypes = ['string', 'number', 'boolean'];
    primitiveTypes.map((primitiveName: string, index: number)=>{
      const nodeSize = {x: 130, y: 70}
      const nodePos = {x: 120, y: 50 + index*nodeSize.y*1.4}
      const viewData = {
        position: nodePos,
        size: nodeSize,
      }
      const nodeValues = {
        id: primitiveName,
        viewData: viewData,
      }
      const primitiveNode = createPrimitiveNode(nodeValues);
      nodeSetParent(primitiveNode, systemNode);
    });

    //create construction
    const characterNode = createConstructionNode({
      id: 'Character',
    })
    nodeSetParent(characterNode, systemNode);

    const charNameNode = createPrimitiveNode({
      id: 'Name', 
      typeReference: {
        referenceType: ReferenceType.Global,
        referencePath: ['System', 'string'],
      }
    });
    const charAgeNode = createPrimitiveNode({
      id: 'Age',
      typeReference: {
        referenceType: ReferenceType.Global,
        referencePath: ['System', 'number'],
      }
    });
    nodeSetParent(charNameNode, characterNode);
    nodeSetParent(charAgeNode, characterNode);

    return systemNode;
  }

  const selectedNode: IReference = {
    referencePath: ['System'],
    referenceType: ReferenceType.Global,
    targetFullId: 'NewProject.System',
  }

  const result: IProject = createConstructionNode({
    id: 'NewProject',
    selectedNode: selectedNode,
  })

  const systemNode = createSystemNode();
  nodeSetParent(systemNode, result);
  
  return result;
}