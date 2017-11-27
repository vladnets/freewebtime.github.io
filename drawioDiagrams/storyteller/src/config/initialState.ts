import {
  IFunctionInterface,
  IInterface,
  InterfaceType,
  IPrimitiveInterface,
  IStructureInterface,
} from '../api/project/IInterface';
import { appConfig } from './appConfig';
import { IReference, ReferenceType } from '../api/project/IReference';
import { ISymbol, SymbolType } from '../api/project/ISymbol';
import { IHash } from '../api/IHash';
import { ISystemSourceCodeInterface, ItemType, SourceCodeType, IGraphSourceCodeInterface, IItem } from '../api/project/IItem';

// Interfaces

//system
const stringInterface: IPrimitiveInterface = {
  id: appConfig.PrimitiveTypes.String,
  name: appConfig.PrimitiveTypes.String,
  namespace: appConfig.InitialStateConfig.SystemNamespace,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${appConfig.PrimitiveTypes.String}`,
  symbolType: SymbolType.Interface,
  interfaceType: InterfaceType.Primitive,
  primitiveType: appConfig.PrimitiveTypes.String,
}

const numberInterface: IPrimitiveInterface = {
  id: appConfig.PrimitiveTypes.Number,
  name: appConfig.PrimitiveTypes.Number,
  namespace: appConfig.InitialStateConfig.SystemNamespace,
  symbolType: SymbolType.Interface,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${appConfig.PrimitiveTypes.Number}`,
  interfaceType: InterfaceType.Primitive,
  primitiveType: appConfig.PrimitiveTypes.Number,
}

const booleanInterface: IPrimitiveInterface = {
  id: appConfig.PrimitiveTypes.Boolean,
  name: appConfig.PrimitiveTypes.Boolean,
  namespace: appConfig.InitialStateConfig.SystemNamespace,
  symbolType: SymbolType.Interface,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${appConfig.PrimitiveTypes.Boolean}`,
  interfaceType: InterfaceType.Primitive,
  primitiveType: appConfig.PrimitiveTypes.Boolean,
}

const concatStringName = 'Concat_String';
const concatStringParamsName = 'Params';

const concatStringParamsInterface: IStructureInterface = {
  id: concatStringParamsName,
  name: concatStringParamsName,
  namespace: `${appConfig.InitialStateConfig.SystemNamespace}.${concatStringName}`,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${concatStringName}.${concatStringParamsName}`,
  symbolType: SymbolType.Interface,
  interfaceType: InterfaceType.Structure,
  subitems: {
    ['Prefix']: {
      referenceType: ReferenceType.Interface,
      targetId: stringInterface.fullId,
    },
    ['Separator']: {
      referenceType: ReferenceType.Interface,
      targetId: stringInterface.fullId,
    },
    ['Postfix']: {
      referenceType: ReferenceType.Interface,
      targetId: stringInterface.fullId,
    },
  }
}

const concatString: IFunctionInterface = {
  id: concatStringName,
  name: 'Concatenate string',
  namespace: appConfig.InitialStateConfig.SystemNamespace,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${concatStringName}`,
  symbolType: SymbolType.Interface,
  interfaceType: InterfaceType.Function,
  params: {
    referenceType: ReferenceType.Interface,
    targetId: concatStringParamsInterface.fullId,
  },
  returns: {
    referenceType: ReferenceType.Interface,
    targetId: stringInterface.fullId,
  },
}

const characterInterfaceName = 'Character';

const characterInterface: IStructureInterface = {
  id: characterInterfaceName,
  name: characterInterfaceName,
  namespace: appConfig.InitialStateConfig.ProjectName,
  fullId: `${appConfig.InitialStateConfig.ProjectName}.${characterInterfaceName}`,
  symbolType: SymbolType.Interface,
  interfaceType: InterfaceType.Structure,
  subitems: {
    ['Name']: {
      referenceType: ReferenceType.Interface,
      targetId: stringInterface.fullId,
    },
    ['Age']: {
      referenceType: ReferenceType.Interface,
      targetId: numberInterface.fullId,
    },
    ['Sex']: {
      referenceType: ReferenceType.Interface,
      targetId: booleanInterface.fullId,
    },
    ['Backstory']: {
      referenceType: ReferenceType.Interface,
      targetId: stringInterface.fullId,
    },
  }
}

const storyInterfaceName = 'Story';
const storyInterface: IStructureInterface = {
  id: storyInterfaceName,
  name: storyInterfaceName,
  namespace: appConfig.InitialStateConfig.ProjectName,
  fullId: `${appConfig.InitialStateConfig.ProjectName}.${storyInterfaceName}`,
  symbolType: SymbolType.Interface,
  interfaceType: InterfaceType.Structure,
  subitems: {
    ['Name']: {
      referenceType: ReferenceType.Interface,
      targetId: stringInterface.fullId,
    },
    ['Duration']: {
      referenceType: ReferenceType.Interface,
      targetId: numberInterface.fullId,
    },
    ['Protagonist']: {
      referenceType: ReferenceType.Interface,
      targetId: characterInterface.fullId,
    },
    ['Antagonist']: {
      referenceType: ReferenceType.Interface,
      targetId: characterInterface.fullId,
    },
    ['Storyline']: {
      referenceType: ReferenceType.Interface,
      targetId: stringInterface.fullId,
    },
  }
}

//project root
const projectRootName = appConfig.InitialStateConfig.ProjectRootName;
const projectRootId = appConfig.InitialStateConfig.ProjectRootName;
const projectRootFullId = projectRootName;
const projectRootParamsName = 'Params';
const projectRootResultName = 'Result';
const projectRootParamsInterface: IStructureInterface = {
  id: projectRootParamsName,
  name: projectRootParamsName,
  namespace: projectRootFullId,
  fullId: `${projectRootFullId}.${projectRootParamsName}`,
  symbolType: SymbolType.Interface,
  interfaceType: InterfaceType.Structure,
  subitems: {},
}
const projectRootResultInterface: IStructureInterface = {
  id: projectRootResultName,
  name: projectRootResultName,
  namespace: projectRootFullId,
  fullId: `${projectRootFullId}.${projectRootResultName}`,
  symbolType: SymbolType.Interface,
  interfaceType: InterfaceType.Structure,
  subitems: {
    [storyInterface.name]: {
      referenceType: ReferenceType.Interface,
      targetId: storyInterface.fullId,
    }
  },
}
const projectRootInterface: IFunctionInterface = {
  id: projectRootId,
  name: projectRootName,
  fullId: projectRootName,
  symbolType: SymbolType.Interface,
  interfaceType: InterfaceType.Function,
  params: {
    referenceType: ReferenceType.Interface,
    targetId: projectRootParamsInterface.fullId,
  },
  returns: {
    referenceType: ReferenceType.Interface,
    targetId: projectRootResultInterface.fullId,
  }
}

//function bodies

//concat string
const concatStringSourceCodeName = 'Body';
const concatStringSourceCode: ISystemSourceCodeInterface = {
  id: concatStringSourceCodeName,
  name: concatStringSourceCodeName,
  namespace: concatString.fullId,
  fullId: `${concatString.fullId}.${concatStringSourceCodeName}`,
  functionId: appConfig.SystemFunctionNames.Concat_String,
  interface: {
    referenceType: ReferenceType.Interface,
    targetId: concatString.fullId,
  },
  sourceCodeType: SourceCodeType.System,
  itemType: ItemType.SourceCode,
  symbolType: SymbolType.Item,
}

//project root
const projectRootSourceCodeName = 'Body';
const projectRootSourceCode: IGraphSourceCodeInterface = {
  id: projectRootSourceCodeName,
  name: projectRootSourceCodeName,
  namespace: projectRootInterface.fullId,
  fullId: `${projectRootInterface.fullId}.${projectRootSourceCodeName}`,
  sourceCodeType: SourceCodeType.Graph,
  itemType: ItemType.SourceCode,
  symbolType: SymbolType.Item,
  interface: {
    referenceType: ReferenceType.Interface,
    targetId: projectRootInterface.fullId,
  },
  locals: {

  },
  connections: {

  },
}


//all interfaces together
const interfaces: IHash<IInterface> = {
  [stringInterface.fullId]: stringInterface,
  [numberInterface.fullId]: numberInterface,
  [booleanInterface.fullId]: booleanInterface,
  [concatStringParamsInterface.fullId]: concatStringParamsInterface,
  [concatString.fullId]: concatString,

  [characterInterface.fullId]: characterInterface,
  [storyInterface.fullId]: storyInterface,

  [projectRootParamsInterface.fullId]: projectRootParamsInterface,
  [projectRootResultInterface.fullId]: projectRootResultInterface,
  [projectRootInterface.fullId]: projectRootInterface,
}


const items: IHash<IItem> = {
  [concatStringSourceCode.fullId]: concatStringSourceCode,
  [projectRootSourceCode.fullId]: projectRootSourceCode,
}

//final result
export const initialSymbols: IHash<ISymbol> = {
  // Interfaces
  ...interfaces,
  
  //Items
  ...items,
}

const interfacesKeys: IHash<string> = {}
Object.keys(interfaces).map((interfaceId: string)=>{
  interfacesKeys[interfaceId] = interfaceId;
});
export const initialInterfaces = interfacesKeys;

const itemsKeys: IHash<string> = {
}
Object.keys(items).map((itemId: string)=>{
  itemsKeys[itemId] = itemId;
});
export const initialItems = itemsKeys;