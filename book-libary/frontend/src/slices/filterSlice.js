import { createSlice } from '@reduxjs/toolkit'; //toolkit for creating slice to unit reducer and state, action

const initialState = {
  title: '',
  author: '',
  isFavourite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      //u can mutate the state cuz of immer libary
      //U can also use a new state
      state.title = action.payload;
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    setIsFavouriteFilter: (state) => {
      state.isFavourite = !state.isFavourite;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

// console.log(filterSlice.actions);
// console.log(filterSlice.actions.setTitleFilter());

export const {
  setTitleFilter,
  setAuthorFilter,
  setIsFavouriteFilter,
  resetFilters,
} = filterSlice.actions; //actions they're call functions of reducers with same type as its name
//payload is a type of call functions
//these all functions have current state to initial state (immer)

export const selectTitleFilter = (state) => state.filter.title; //selecters in slice look like that
export const selectAuthorFilter = (state) => state.filter.author;
export const selectIsFavouriteFilter = (state) => state.filter.isFavourite;

export default filterSlice.reducer; //it's filterSlice
