import { wrap } from '../reducers/wrap';
import { ref } from '../reducers/reference';
import { themeReducer } from '../reducers/themeReducer';
import { sum } from '../reducers/sum';
import { constructor } from '../reducers/constructor';

export const initialState = {
  // viewContext: {
  //   Theme: themeReducer,
  // },
  App: {
    Title: 'Storyeditor',
    Link: ref('Title'),
    Link2: ref('Link'),
  }
}