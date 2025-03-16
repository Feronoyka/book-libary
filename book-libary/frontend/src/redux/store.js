import { configureStore } from '@reduxjs/toolkit'; //tool for creating dtore
import booksReducer from '../slices/BookSlice';
import filterReducer from '../slices/filterSlice';
import errorSlice from '../slices/errorSLice';

const store = configureStore({
  reducer: {
    //store of states
    books: booksReducer,
    filter: filterReducer,
    error: errorSlice,
  },
});

export default store;
