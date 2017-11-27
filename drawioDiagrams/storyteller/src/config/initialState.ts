import {
  IFunctionInterface,
  IInterface,
  InterfaceType,
  IPrimitiveInterface,
  IStructureInterface,
} from '../api/project/IInterface';
import { appConfig } from './appConfig';
import { ReferenceType } from '../api/project/IReference';
import { ISymbol, SymbolType } from '../api/project/ISymbol';
import { IHash } from '../api/IHash';

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
  namespace: appConfig.InitialStateConfig.ProjectNamespace,
  fullId: `${appConfig.InitialStateConfig.ProjectNamespace}.${characterInterfaceName}`,
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
  namespace: appConfig.InitialStateConfig.ProjectNamespace,
  fullId: `${appConfig.InitialStateConfig.ProjectNamespace}.${storyInterfaceName}`,
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


export const interfaces: IHash<IInterface> = {
  [stringInterface.fullId]: stringInterface,
  [numberInterface.fullId]: numberInterface,
  [booleanInterface.fullId]: booleanInterface,
  [concatStringParamsInterface.fullId]: concatStringParamsInterface,
  [concatString.fullId]: concatString,

  [characterInterface.fullId]: characterInterface,
  [storyInterface.fullId]: storyInterface,
}

export const initialSymbols: IHash<ISymbol> = {
  // Types
  [stringInterface.fullId]: stringInterface,
  [numberInterface.fullId]: numberInterface,
  [booleanInterface.fullId]: booleanInterface,
  [concatStringParamsInterface.fullId]: concatStringParamsInterface,
  [concatString.fullId]: concatString,

  [characterInterface.fullId]: characterInterface,
  [storyInterface.fullId]: storyInterface,
  
  //Items
}

export const initialInterfaces: IHash<string> = {
  [stringInterface.fullId]: stringInterface.fullId,
  [numberInterface.fullId]: numberInterface.fullId,
  [booleanInterface.fullId]: booleanInterface.fullId,
  [concatStringParamsInterface.fullId]: concatStringParamsInterface.fullId,
  [concatString.fullId]: concatString.fullId,

  [characterInterface.fullId]: characterInterface.fullId,
  [storyInterface.fullId]: storyInterface.fullId,
}

export const initialItems: IHash<string> = {
  
}
