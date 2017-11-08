import { IProject } from '../api/project/IProject';
import { v4 } from 'node-uuid';
import { GraphNodeType, IGraphNode, IReference, ReferencePath, ReferenceType, IGraphNodeViewData, IGraphNodeSockets, SocketType } from '../api/graph/IGraph';
import { appConfig } from './appConfig';
import { parseNodePath, createReference } from '../helpers/index';

export const createInitialState = (): IProject => {
  
  const createNode = (params: {}): IGraphNode => {
    const id: string = params[('id')] as string || v4();
    const uViewData: IGraphNodeViewData = params['viewData'];
    const viewData: IGraphNodeViewData = {...uViewData};
    if (uViewData) {
      const uPos = uViewData.position;
      const uSize = uViewData.size;
      viewData.position = {...{x: 10, y: 10}, ...uPos},
      viewData.size = {...{x: 160, y: 60}, ...uSize}
    }

    const inputSocketId = 'input-' + id;
    const outputSocketId = 'output-' + id;
    const sockets: IGraphNodeSockets = {
      input: {
        socketType: SocketType.input,
        id: inputSocketId,
        name: 'In',
        nodeId: id,
        nodeFullId: id,
        position: {x: 0, y: 0}
      },
      output: {
        socketType: SocketType.output,
        id: outputSocketId,
        name: 'Out',
        nodeId: id,
        nodeFullId: id,
        position: {x: 0, y: 0}
      },
    }

    const result = {
      fullId: id,
      nodeType: GraphNodeType.Primitive,
      ...params,
      viewData: viewData,
      sockets: sockets,
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

  const createFunctionNode = (params: {}): IGraphNode => {
    return createNode({...params, nodeType: GraphNodeType.Function});
  }

  const nodeSetParent = (node: IGraphNode, parent: IGraphNode) => {
    node.fullId = parent.fullId + '.' + node.id;
    node.sockets.input.nodeFullId = node.fullId;
    node.sockets.input.id = 'input-' + node.fullId;
    node.sockets.output.nodeFullId = node.fullId;
    node.sockets.output.id = 'output-' + node.fullId;
    
    if (!parent.subnodes) {
      parent.subnodes = {}
    }
    parent.subnodes[node.id] = node;
  }

  const createSystemNode = (projectNode: IProject): IGraphNode => {
    
    const systemNode: IGraphNode = createConstructionNode({id: 'System'});
    nodeSetParent(systemNode, projectNode);
    
    const stringNode = createPrimitiveNode({id: 'string', viewData: {position: {y: 200}}});
    nodeSetParent(stringNode, systemNode);

    const numberNode = createPrimitiveNode({id: 'number', viewData: {position: {y: 300}}});
    nodeSetParent(numberNode, systemNode);

    const booleanNode = createPrimitiveNode({id: 'boolean', viewData: {position: {y: 400}}});
    nodeSetParent(booleanNode, systemNode);

    //combine string
    const concatNode = createFunctionNode({
      id: 'Combine string',
      systemFunctionId: 'string_concat',
      input: {
        'Prefix': 'Prefix',
        'Separator': 'Separator',
        'Postfix': 'Postfix',
      },
      locals: {},
      output: {
        'Result': 'Result'
      }
    })
    concatNode.viewData.size = {x: 500, y: 204}
    concatNode.viewData.position = {x: 200, y: 400}
    nodeSetParent(concatNode, systemNode);

    const concatNodePrefix = createPrimitiveNode({
      id: 'Prefix', 
      typeReference: createReference(stringNode),
      inputReference: createReference(stringNode),
    })
    nodeSetParent(concatNodePrefix, concatNode);
    const concatNodeSeparator = createPrimitiveNode({
      id: 'Separator', 
      typeReference: createReference(stringNode),
      inputReference: createReference(stringNode),
    })
    nodeSetParent(concatNodeSeparator, concatNode);
    const concatNodePostfix = createPrimitiveNode({
      id: 'Postfix', 
      typeReference: createReference(stringNode),
      inputReference: createReference(stringNode),
    })
    nodeSetParent(concatNodePostfix, concatNode);

    const concatNodeResult = createPrimitiveNode({
      id: 'Result', 
      typeReference: createReference(stringNode),
      inputReference: createReference(concatNodePostfix),
    })
    nodeSetParent(concatNodeResult, concatNode);

    //create construction
    const characterNode = createConstructionNode({
      id: 'Character',
      viewData: {
        position: {x: 800, y: 400},
        size: {x: 180, y: 150}
      }
    })
    nodeSetParent(characterNode, systemNode);

    const charNameNode = createPrimitiveNode({
      id: 'Name', 
      typeReference: createReference(stringNode),
      inputReference: createReference(concatNodeResult),
    });
    const charAgeNode = createPrimitiveNode({
      id: 'Age',
      typeReference: createReference(numberNode),
      inputReference: createReference(numberNode),
    });
    nodeSetParent(charNameNode, characterNode);
    nodeSetParent(charAgeNode, characterNode);

    return systemNode;
  }

  const result: IProject = createConstructionNode({
    id: 'NewProject',
  })

  const systemNode = createSystemNode(result);

  result.selectedNode = createReference(systemNode);
  
  return result;
}