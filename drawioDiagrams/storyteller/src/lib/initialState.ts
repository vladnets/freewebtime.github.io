import theme from './theme';

export default {
  viewContext: {
    theme: theme,
  },
  appContext: {

  },
  appRoot: {
    Id: 'appRoot',
    ItemType: 'appRoot',

    Content: {
      Id: 'ideRoot',
      ItemType: 'ideRoot',
      Content: {
        Id: 'arrayRoot',
        ItemType: 'arrayRoot',
        Content: [
          'hello',
          'world'
        ]
      }
    }
  }
}