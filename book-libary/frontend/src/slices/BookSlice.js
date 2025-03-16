import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import randomBookWithID from '../utils/randomBookWithID';
import { setError } from './errorSLice';

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  //async function in redux
  'books/fetchBook', //fetchBook is name and auto would create when req is fulfilled or rejected and also pending in middle btw them
  async (url, thunkAPI) => {
    //thunkAPI has own dispatch that we can catch errors
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      //OPTION 1
      return thunkAPI.rejectWithValue(error);
      //OPTION 2
      // throw error;
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    toggleBook: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavourite = !book.isFavourite;
        }
      });

      // return state.map((book) =>
      //   book.id === action.payload
      //     ? { ...book, isFavourite: !book.isFavourite }
      //     : book
      // );
    },
    deleteBook: (state, action) => {
      //OPTION 1 to delete only one
      // const index = state.findIndex((book) => book.id === action.payload)
      // if(index !== -1) {
      //   state.splice(index, 1)
      // }

      //OPTION 2 simply
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
  },
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaAPI = false;
      if (action?.payload?.title && action?.payload?.author) {
        state.books.push(randomBookWithID(action.payload, 'API'));
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaAPI = false;
    },
  }, // we haven't used and can't use here catch error if req is rejected,
  // extraReducers is reducer for async functions
  //cuz fulfilled will call despite an catch error and cuz of that will brake the web interface
});

//OPTION 1 to create state for fulfilled but without builder

//OPTION 2 with builder
// extraReducers: (builder) => {
//   builder.addCase(fetchBook.pending, (state) => {
//   state.isLoadingViaAPI = false
//  })
//   builder.addCase(fetchBook.fulfilled, (state, action) => {
//     state.isLoadingViaAPI = true
//     if (action.payload.title && action.payload.author) {
//       state.books.push(randomBookWithID(action.payload, 'API'));
//     }
//   builder.addCase(fetchBook.rejected, (state) => {
//     state.isLoadingViaAPI = false
//   })
//   });

// export const thunkFunction = async (dispatch, getState) => {
//   try {
//     const res = await axios.get('http://localhost:4000/random-book');
//     if (res?.data?.title && res?.data?.author) {
//       dispatch(addBook(randomBookWithID(res.data)));
//     }
//   } catch (error) {
//     console.log('error with fetch API', error);
//   }
// };

export const { addBook, deleteBook, toggleBook } = bookSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingBiaAPI = (state) => state.books.isLoadingViaAPI;

export default bookSlice.reducer;
