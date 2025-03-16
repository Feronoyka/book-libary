import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBook,
  fetchBook,
  selectIsLoadingBiaAPI,
} from '../../slices/BookSlice';
import { FaSpinner } from 'react-icons/fa';
import randomBookWithID from '../../utils/randomBookWithID';
import booksData from '../../data/books.json';
import './BookForm.css';
import { setError } from '../../slices/errorSLice';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const isLoadingViaAPI = useSelector(selectIsLoadingBiaAPI);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    dispatch(addBook(randomBookWithID(randomBook, 'Random'))); //that dispatch return object
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      setTitle('');
      setAuthor('');
      dispatch(addBook(randomBookWithID({ title, author }, 'Manual')));
    } else {
      dispatch(setError('You must feel')); //that dispatch return object
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed')); //delayed is "entpoint"
  }; //that dispatch return promise cuz of this we can use async await

  return (
    <div className="app-block book-form">
      <h1>BookForm</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleAddRandomBook}>
          Random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI} //turn off isLoading
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading ...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add random via API'
          )}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
