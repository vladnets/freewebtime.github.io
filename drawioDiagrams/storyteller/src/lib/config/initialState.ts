import { IAction } from '../api/IAction';
import { nodeReducer, getNodeValue } from '../reducers/nodeReducer';
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
              },
              duration: {
                id: 'duration',
                name: 'Duration',
                value: 1.5,
              },
              doubleDuration: {
                id: 'doubleDuration',
                name: 'Double duration',
                function: (state: any, action: IAction, context: any) => getNodeValue('duration')(action, context) * 2,
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
                reference: 'duration',
              },
              doubleDuration: {
                id: 'doubleDuration',
                name: 'Double Duration',
                reference: 'doubleDuration',
              }
            },
          }
        }
      }   
    }
  }
}