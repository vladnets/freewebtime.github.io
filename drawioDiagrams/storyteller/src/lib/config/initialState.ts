import { IAction } from '../api/IAction';
import { nodeReducer } from '../reducers/nodeReducer';
export const initialState = {
  app: {
    name: 'Storyteller 0.01a',
    ide: {
      project: {
        name: 'Example story',
        nodes: {

          timeMachine: {
            id: 'timeMachine',
            name: 'Time machine',
            input: {

            },
            locals: {
              protagonist: {
                id: 'protagoinst',
                name: 'Protagonist',
                value: 'Jack Dreamer',
              },
              villan: {
                id: 'villan',
                name: 'Villan',
                value: 'Emily Blunt',
                age: 25,
              },
              duration: {
                id: 'duration',
                name: 'Duration',
                value: 1.5,
              },
              subduration: {
                id: 'subduration',
                name: 'subduration',
                reference: 'duration',
              }
            },
            output: {
              winner: {
                id: 'winner',
                name: 'Winner',
                reference: 'protagonist',
              },
              looser: {
                id: 'looser',
                name: 'Looser',
                reference: 'villan'
              },
              duration: {
                id: 'duration',
                name: 'Duration',
                reference: 'subduration',
              },
            },
          }
        }
      }   
    }
  }
}