import { ObjectType } from '../api/project/IObject';
import { MemberType } from '../api/project/MemberType';
import { IFunction } from '../api/project/IFunction';
import { IProject } from '../api/project/IProject';
import { v4 } from 'node-uuid';

export const createInitialState = (): IProject => {
  
  const createSystemModule = (): IFunction => {
    
    const result = {
      id: 'System',
      name: 'System',
      objectType: ObjectType.Function,
      typeReference: {targets: {}}
    }

    return result;
  }

  const systemModule = createSystemModule();

  const result: IProject = {
    id: v4(),
    name: 'New project',
    modules: {
      [systemModule.id]: systemModule
    },
    imports: {},
  };
  return result;
}