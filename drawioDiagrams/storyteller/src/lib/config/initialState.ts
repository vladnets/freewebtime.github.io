import { themeReducer } from '../reducers/themeReducer';

export const initialState = {
  viewContext: {
    Theme: themeReducer,
    Name: 'default theme'
  },
  App: {
    Greetings: 'Hello world from app!!!',
    Status: 'work in progress'
  }
}