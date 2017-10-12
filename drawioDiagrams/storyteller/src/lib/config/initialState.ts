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
              'input.protagonist': {
                id: 'input.protagoinst',
                name: 'Protagonist',
                value: 'Jack Dreamer',
              },
              'input.villan': {
                id: 'input.villan',
                name: 'Villan',
                value: 'Emily Blunt',
              },
            },
            locals: {
              'locals.duration': {
                id: 'locals.duration',
                name: 'Duration',
                value: 1.5,
              }
            },
            value: {
              winner: {
                id: 'winner',
                name: 'Winner',
                reference: 'input.protagonist',
              },
              looser: {
                id: 'looser',
                name: 'Looser',
                reference: 'input.villan'
              },
              duration: {
                id: 'duration',
                name: 'Duration',
                reference: 'locals.duration',
              },
            },
          }
        }
      }   
    }
  }
}