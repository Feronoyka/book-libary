import './BookList.css';
import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import {
  selectAuthorFilter,
  selectTitleFilter,
  selectIsFavouriteFilter,
} from '../../slices/filterSlice';
import { toggleBook, deleteBook, selectBooks } from '../../slices/BookSlice';

function BookList() {
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const favouriteFilter = useSelector(selectIsFavouriteFilter);

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavourite = (id) => {
    dispatch(toggleBook(id));
  };

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi');

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    // console.log({ title: book.title, matchesTitle });
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavourite = favouriteFilter ? book.isFavourite : true;
    return matchesTitle && matchesAuthor && matchesFavourite;
  });

  return (
    <div className="app-block book-list">
      <h1>BookList</h1>
      {books.length === 0 ? (
        <p>No books aviable</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div>
                {++i}. {highlightMatch(book.title, titleFilter)} by{' '}
                <b>{highlightMatch(book.author, authorFilter)}</b> (
                {book.source})
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavourite(book.id)}>
                  {book.isFavourite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button
                  className="book-actions"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
