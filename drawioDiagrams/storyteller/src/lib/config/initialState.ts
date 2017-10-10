import { reference, ref } from '../reducers/reference';
import { themeReducer } from '../reducers/themeReducer';

export const initialState = {
  viewContext: {
    Theme: themeReducer,
    Name: 'default theme',
  },
  App: {
    Greetings: 'Hello world from app!!!',
    Status: 'work in progress',
    Values: [
      'first value',
      'second value',
      'third value',
      (5 + 2),
    ],
    Ide: {
      Graph1: {
        Name: 'Graph 1',
        Value: 'Graph1 value',
      },
      Graph2: {
        Name: 'Graph 2',
        Value: 'Graph2 value',
      },
      Reference: ref(['Graph2', 'Value'])
    }
  }
}