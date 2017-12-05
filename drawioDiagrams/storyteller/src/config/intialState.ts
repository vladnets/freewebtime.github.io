import { createFunction, createPrimitive, createStructure } from '../helpers/projectHeler';
import { appConfig } from './appConfig';
import { FunctionType, IFunction, ICard, IPrimitive, IStructure } from '../api/project/ICard';
import { IHash } from '../api/IHash';
import { IProject } from '../api/project/IProject';
import { ICardboard } from '../api/project/ICardboard';
import { createCardboards, getRootItems, getRootItemsIds } from './createCardboards';

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
  size: {x: 300, y: 150},
  position: {x: -5, y: 200},
});

const protagonistName: IFunction = createFunction({
  id: protagonistNameId,
  name: protagonistNameId,
  namespace: projectId,
  functionType: FunctionType.System,
  systemFunctionId: appConfig.SystemFunctionNames.Concat_String,
  size: {x: 450, y: 220},
  position: {x: 450, y: 200},
});

const prFirstName: IPrimitive = createPrimitive({
  id: 'Protagonist First Name',
  name: 'Protagonist First Name',
  namespace: projectId,
  primitiveType: appConfig.PrimitiveTypes.String,
  value: 'Jack',
  size: {x: 300, y: 50},
  position: {x: 1100, y: 200},
});
const nameSeparator: IPrimitive = createPrimitive({
  id: 'Name separator',
  name: 'Name separator',
  namespace: projectId,
  primitiveType: appConfig.PrimitiveTypes.String,
  value: '" "',
  size: {x: 300, y: 50},
  position: {x: 1100, y: 300},
});
const prLastName: IPrimitive = createPrimitive({
  id: 'Protagonist Last Name',
  name: 'Protagonist Last Name',
  namespace: projectId,
  primitiveType: appConfig.PrimitiveTypes.String,
  value: 'Dreamer',
  size: {x: 300, y: 50},
  position: {x: 1100, y: 400},
});

const prNameParams: IStructure = createStructure({
  id: 'Params',
  name: 'Params',
  namespace: protagonistName.fullId,
});
const prNamePrefix: IPrimitive = createPrimitive({
  id: 'Prefix',
  name: 'Prefix',
  namespace: prNameParams.fullId,
  primitiveType: appConfig.PrimitiveTypes.String,
  valueId: prFirstName.fullId,
  value: 'Jack',
});
const prNameSeparator: IPrimitive = createPrimitive({
  id: 'Separator',
  name: 'Separator',
  namespace: prNameParams.fullId,
  primitiveType: appConfig.PrimitiveTypes.String,
  valueId: nameSeparator.fullId,
  value: '" "',
});
const prNamePostfix: IPrimitive = createPrimitive({
  id: 'Postfix',
  name: 'Postfix',
  namespace: prNameParams.fullId,
  primitiveType: appConfig.PrimitiveTypes.String,
  valueId: prLastName.fullId,
  value: 'Dreamer',
});

const prNameResult: IPrimitive = createPrimitive({
  id: 'Result',
  name: 'Result',
  namespace: protagonistName.fullId,
  primitiveType: appConfig.PrimitiveTypes.String,
  value: 'Jack Dreamer',
});

const charName: IPrimitive = createPrimitive({
  id: 'Name',
  name: 'Name',
  namespace: character.fullId,
  primitiveType: appConfig.PrimitiveTypes.String,
  valueId: prNameResult.fullId,
  value: 'Jack Dreamer',
});

prNameParams.subitemsIdList = {
  [prNamePrefix.fullId]: prNamePrefix.fullId,
  [prNameSeparator.fullId]: prNameSeparator.fullId,
  [prNamePostfix.fullId]: prNamePostfix.fullId,
}

protagonistName.paramsId = prNameParams.fullId;
protagonistName.resultId = prNameResult.fullId;
protagonistName.subitemsIdList = {
  [prNameParams.fullId]: prNameParams.fullId,
  [prNameResult.fullId]: prNameResult.fullId,
}

character.subitemsIdList = {
  [charName.fullId]: charName.fullId,
}

projectRoot.subitemsIdList = {
  [character.fullId]: character.fullId,
  [protagonistName.fullId]: protagonistName.fullId,

  [prFirstName.fullId]: prFirstName.fullId,
  [nameSeparator.fullId]: nameSeparator.fullId,
  [prLastName.fullId]: prLastName.fullId,
} 

const cards: IHash<ICard> = {};
addCard(prFirstName, cards);
addCard(nameSeparator, cards);
addCard(prLastName, cards);

addCard(prNameParams, cards);
addCard(prNamePrefix, cards);
addCard(prNameSeparator, cards);
addCard(prNamePostfix, cards);
addCard(prNameResult, cards);
addCard(protagonistName, cards);

addCard(charName, cards);
addCard(character, cards);

addCard(projectRoot, cards);

const proj: IProject = {
  id: projectId,
  name: projectName,
  cards: cards,
  cardboards: createCardboards(cards),
  rootItems: getRootItemsIds(cards),
}

export const initialCards = cards;
export const initialProject = proj;

