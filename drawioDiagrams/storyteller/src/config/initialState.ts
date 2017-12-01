import { appConfig } from './appConfig';
import { ISymbol, SymbolType, IPrimitive, IStructure, IFunctionInterface, ISystemSourceCode, SourceCodeType, IGraphSourceCode, IObject, IFunctionCall } from '../api/project/ISymbol';
import { IHash } from '../api/IHash';
import { ICard } from '../api/project/ICard';
import { ICardboard } from '../api/project/ICardboard';
import { IProjectStructureItem } from '../api/project/IProjectStructureItem';
import { parseProjectStructure } from '../helpers/projectStructureHelper';
import { IProject } from '../api/project/IProject';
import { IProjectStructure } from '../api/project/IProjectStructure';
import { createCardboards } from './createCardboards';

// Interfaces

//system
const stringInterface: IPrimitive = {
  id: appConfig.PrimitiveTypes.String,
  name: appConfig.PrimitiveTypes.String,
  namespace: appConfig.InitialStateConfig.SystemNamespace,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${appConfig.PrimitiveTypes.String}`,
  symbolType: SymbolType.Primitive,
  primitiveType: appConfig.PrimitiveTypes.String,
}

const numberInterface: IPrimitive = {
  id: appConfig.PrimitiveTypes.Number,
  name: appConfig.PrimitiveTypes.Number,
  namespace: appConfig.InitialStateConfig.SystemNamespace,
  symbolType: SymbolType.Primitive,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${appConfig.PrimitiveTypes.Number}`,
  primitiveType: appConfig.PrimitiveTypes.Number,
}

const booleanInterface: IPrimitive = {
  id: appConfig.PrimitiveTypes.Boolean,
  name: appConfig.PrimitiveTypes.Boolean,
  namespace: appConfig.InitialStateConfig.SystemNamespace,
  symbolType: SymbolType.Primitive,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${appConfig.PrimitiveTypes.Boolean}`,
  primitiveType: appConfig.PrimitiveTypes.Boolean,
}

const concatStringName = 'Concat_String';
const concatStringParamsName = 'Params';
const prefixParamName = 'Prefix';
const separatorParamName = 'Separator';
const postfixParamName = 'Postfix';

const concatStringParamsInterface: IStructure = {
  id: concatStringParamsName,
  name: concatStringParamsName,
  namespace: `${appConfig.InitialStateConfig.SystemNamespace}.${concatStringName}`,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${concatStringName}.${concatStringParamsName}`,
  symbolType: SymbolType.Structure,
  subitems: {
    [prefixParamName]: stringInterface.fullId,
    [separatorParamName]: stringInterface.fullId,
    [postfixParamName]: stringInterface.fullId,
  }
}

const concatString: IFunctionInterface = {
  id: concatStringName,
  name: 'Concatenate string',
  namespace: appConfig.InitialStateConfig.SystemNamespace,
  fullId: `${appConfig.InitialStateConfig.SystemNamespace}.${concatStringName}`,
  symbolType: SymbolType.Function,
  paramsTypeId: concatStringParamsInterface.fullId,
  resultTypeId: stringInterface.fullId,
}

const characterInterfaceName = 'Character';

const characterInterface: IStructure = {
  id: characterInterfaceName,
  name: characterInterfaceName,
  namespace: appConfig.InitialStateConfig.ProjectName,
  fullId: `${appConfig.InitialStateConfig.ProjectName}.${characterInterfaceName}`,
  symbolType: SymbolType.Structure,
  subitems: {
    ['Name']: stringInterface.fullId,
    ['Age']: numberInterface.fullId,
    ['Sex']: booleanInterface.fullId,
    ['Backstory']: stringInterface.fullId,
  }
}

const storyInterfaceName = 'Story';
const storyInterface: IStructure = {
  id: storyInterfaceName,
  name: storyInterfaceName,
  namespace: appConfig.InitialStateConfig.ProjectName,
  fullId: `${appConfig.InitialStateConfig.ProjectName}.${storyInterfaceName}`,
  symbolType: SymbolType.Structure,
  subitems: {
    ['Name']: stringInterface.fullId,
    ['Duration']: numberInterface.fullId,
    ['Protagonist']: characterInterface.fullId,
    ['Antagonist']: characterInterface.fullId,
    ['Storyline']: stringInterface.fullId,
  }
}

//project root
const projectRootName = appConfig.InitialStateConfig.ProjectRootName;
const projectRootId = appConfig.InitialStateConfig.ProjectRootName;
const projectRootFullId = projectRootName;
const projectRootParamsName = 'Params';
const projectRootResultName = 'Result';
const projectRootParamsInterface: IStructure = {
  id: projectRootParamsName,
  name: projectRootParamsName,
  namespace: projectRootFullId,
  fullId: `${projectRootFullId}.${projectRootParamsName}`,
  symbolType: SymbolType.Structure,
  subitems: {},
}
const projectRootResultInterface: IStructure = {
  id: projectRootResultName,
  name: projectRootResultName,
  namespace: projectRootFullId,
  fullId: `${projectRootFullId}.${projectRootResultName}`,
  symbolType: SymbolType.Structure,
  subitems: {
    [storyInterface.name]: storyInterface.fullId,
  },
}
const projectRootInterface: IFunctionInterface = {
  id: projectRootId,
  name: projectRootName,
  fullId: projectRootName,
  symbolType: SymbolType.Function,
  paramsTypeId: projectRootParamsInterface.fullId,
  resultTypeId: projectRootResultInterface.fullId,
}
//function bodies

//concat string
const concatStringSourceCodeId = 'SourceCode';
const concatStringSourceCodeName = 'Source Code';
const concatStringSourceCode: ISystemSourceCode = {
  id: concatStringSourceCodeId,
  name: concatStringSourceCodeName,
  namespace: concatString.fullId,
  fullId: `${concatString.fullId}.${concatStringSourceCodeId}`,
  functionId: appConfig.SystemFunctionNames.Concat_String,
  sourceCodeType: SourceCodeType.System,
  symbolType: SymbolType.SourceCode,
}

//project root
const projectRootSourceCodeId = 'SourceCode';
const projectRootSourceCodeName = 'Source Code';
const projectRootSourceCode: IGraphSourceCode = {
  id: projectRootSourceCodeId,
  name: projectRootSourceCodeName,
  namespace: projectRootInterface.fullId,
  fullId: `${projectRootInterface.fullId}.${projectRootSourceCodeId}`,
  sourceCodeType: SourceCodeType.Graph,
  symbolType: SymbolType.SourceCode,
  locals: {
  },
  connections: {
  },
}

const firstNameItemName = 'First Name';
const firstNameItem: IObject = {
  id: firstNameItemName,
  name: firstNameItemName,
  namespace: projectRootInterface.fullId,
  fullId: `${projectRootInterface.fullId}.${firstNameItemName}`,
  symbolType: SymbolType.Object,
  objectTypeId: stringInterface.fullId,
  connections: {},
  value: 'Jack',
}

const lastNameItemName = 'Last Name';
const lastNameItem: IObject = {
  id: lastNameItemName,
  name: lastNameItemName,
  namespace: projectRootInterface.fullId,
  fullId: `${projectRootInterface.fullId}.${lastNameItemName}`,
  symbolType: SymbolType.Object,
  objectTypeId: stringInterface.fullId,
  connections: {},
  value: 'Dreamer',
}

const separatorItemName = 'Separator';
const separatorItem: IObject = {
  id: separatorItemName,
  name: separatorItemName,
  namespace: projectRootInterface.fullId,
  fullId: `${projectRootInterface.fullId}.${separatorItemName}`,
  symbolType: SymbolType.Object,
  objectTypeId: stringInterface.fullId,
  connections: {},
  value: ' ',
}

//function calls
const combineNameFunctionCallName = 'Full Name';
const combineNameFunctionCall: IFunctionCall = {
  id: combineNameFunctionCallName,
  name: combineNameFunctionCallName,
  namespace: projectRootInterface.fullId,
  fullId: `${projectRootInterface.fullId}.${combineNameFunctionCallName}`,
  symbolType: SymbolType.FunctionCall,
  objectTypeId: concatStringSourceCode.fullId,
  connections: {
    [`${prefixParamName}`]: firstNameItem.fullId,
    [`${separatorParamName}`]: separatorItem.fullId,
    [`${postfixParamName}`]: lastNameItem.fullId,
  },
}


//all interfaces together
//final result
export const initialSymbols: IHash<ISymbol> = {
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

  [concatStringSourceCode.fullId]: concatStringSourceCode,
  [projectRootSourceCode.fullId]: projectRootSourceCode,

  [firstNameItem.fullId]: firstNameItem,
  [lastNameItem.fullId]: lastNameItem,
  [separatorItem.fullId]: separatorItem,
  
  [combineNameFunctionCall.fullId]: combineNameFunctionCall,
}

export const initialCardboards: IHash<ICardboard> = {};

export const initialStructure: IProjectStructure = parseProjectStructure(initialSymbols, projectRootFullId);

const emptyProject: IProject = {
  id: appConfig.InitialStateConfig.ProjectId,
  name: appConfig.InitialStateConfig.ProjectName,
  symbols: initialSymbols,
  cardboards: initialCardboards,
  structure: initialStructure,
}
emptyProject.cardboards = createCardboards(emptyProject);

export const initialProject: IProject = emptyProject;