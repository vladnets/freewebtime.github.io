import { createFunction, createPrimitive, createStructure } from '../helpers/projectHeler';
import { appConfig } from './appConfig';
import { FunctionType, IFunction, ICard, IPrimitive, IStructure } from '../api/project/ICard';
import { IHash } from '../api/IHash';
import { IProject } from '../api/project/IProject';

const addCard = (card: ICard, cards: IHash<ICard>) => {
  cards[card.fullId] = card;
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
protagonistName.subitemsIdList = {
  [prNamePrefix.fullId]: prNamePrefix.fullId,
  [prNameSeparator.fullId]: prNameSeparator.fullId,
  [prNamePostfix.fullId]: prNamePostfix.fullId,
}

character.subitemsIdList = {
  [charName.fullId]: charName.fullId,
}

projectRoot.subitemsIdList = {
  [character.fullId]: character.fullId,
  [protagonistName.fullId]: protagonistName.fullId,

  [prFirstName.fullId]: prFirstName.fullId,
  [prNameSeparator.fullId]: prNameSeparator.fullId,
  [prLastName.fullId]: prLastName.fullId,
} 

const cards: IHash<ICard> = {};
addCard(prFirstName, cards);
addCard(nameSeparator, cards);
addCard(prLastName, cards);

addCard(prNamePrefix, cards);
addCard(prNameSeparator, cards);
addCard(prNamePostfix, cards);
addCard(protagonistName, cards);

addCard(charName, cards);
addCard(character, cards);

addCard(projectRoot, cards);

export const initialCards = cards;

const proj: IProject = {
  id: projectId,
  name: projectName,
  cards: cards,
}

export const initialProject = proj;

