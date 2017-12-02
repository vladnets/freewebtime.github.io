import { appConfig } from './appConfig';
import { FunctionType, IFunction, IObject, IPrimitive, IStructure } from '../api/project/IObject';
import { IHash } from '../api/IHash';
import { createFunction, createStructure, createPrimitive } from '../helpers/objectsHeler';

const addObject = (object: IObject, objects: IHash<IObject>) => {
  objects[object.fullId] = object;
}

const projectId = appConfig.InitialStateConfig.ProjectId;
const projectName = appConfig.InitialStateConfig.ProjectName;
const protagonistNameId = 'Protagonist Name';
const characterId = 'Character';

const projectRoot: IStructure = createStructure({
  id: projectId,
  name: projectName,
  fullId: projectId,
});

const character: IStructure = createStructure({
  id: characterId,
  namespace: projectId,
});

const protagonistName: IFunction = createFunction({
  id: protagonistNameId,
  name: protagonistNameId,
  namespace: projectId,
  functionType: FunctionType.System,
  systemFunctionId: appConfig.SystemFunctionNames.Concat_String,
});

const prFirstName: IPrimitive = createPrimitive({
  id: 'Protagonist First Name',
  name: 'Protagonist First Name',
  namespace: projectId,
  primitiveType: appConfig.PrimitiveTypes.String,
  value: 'Jack',
});
const nameSeparator: IPrimitive = createPrimitive({
  id: 'Name separator',
  name: 'Name separator',
  namespace: projectId,
  primitiveType: appConfig.PrimitiveTypes.String,
  value: ' ',
});
const prLastName: IPrimitive = createPrimitive({
  id: 'Protagonist Last Name',
  name: 'Protagonist Last Name',
  namespace: projectId,
  primitiveType: appConfig.PrimitiveTypes.String,
  value: 'Dreamer',
});

const prNamePrefix: IPrimitive = createPrimitive({
  id: 'Prefix',
  name: 'Prefix',
  namespace: protagonistName.fullId,
  primitiveType: appConfig.PrimitiveTypes.String,
  valueId: prFirstName.fullId,
});
const prNameSeparator: IPrimitive = createPrimitive({
  id: 'Separator',
  name: 'Separator',
  namespace: protagonistName.fullId,
  primitiveType: appConfig.PrimitiveTypes.String,
  valueId: nameSeparator.fullId,
});
const prNamePostfix: IPrimitive = createPrimitive({
  id: 'Postfix',
  name: 'Postfix',
  namespace: protagonistName.fullId,
  primitiveType: appConfig.PrimitiveTypes.String,
  valueId: prLastName.fullId,
});

const charName: IPrimitive = createPrimitive({
  id: 'Name',
  name: 'Name',
  namespace: character.fullId,
  primitiveType: appConfig.PrimitiveTypes.String,
  valueId: protagonistName.fullId,
});

protagonistName.paramsIdList = {
  [prNamePrefix.fullId]: prNamePrefix.fullId,
  [prNameSeparator.fullId]: prNameSeparator.fullId,
  [prNamePostfix.fullId]: prNamePostfix.fullId,
};

character.subitemsIdList = {
  [charName.fullId]: charName.fullId,
}

projectRoot.subitemsIdList = {
  [character.fullId]: character.fullId,
  [protagonistName.fullId]: protagonistName.fullId,
} 










const objects: IHash<IObject> = {};
addObject(prFirstName, objects);
addObject(nameSeparator, objects);
addObject(prLastName, objects);

addObject(prNamePrefix, objects);
addObject(prNameSeparator, objects);
addObject(prNamePostfix, objects);
addObject(protagonistName, objects);

addObject(charName, objects);
addObject(character, objects);

addObject(projectRoot, objects);

export const initialObjects = objects;
