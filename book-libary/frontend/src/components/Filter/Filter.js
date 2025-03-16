import { useDispatch } from 'react-redux';
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
  selectAuthorFilter,
  setAuthorFilter,
  selectIsFavouriteFilter,
  setIsFavouriteFilter,
} from '../../slices/filterSlice';
import { useSelector } from 'react-redux';
import './Filter.css';

function Filter() {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const favouriteFilter = useSelector(selectIsFavouriteFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleFavouriteFilter = () => {
    dispatch(setIsFavouriteFilter());
  };

  const handleResetFilter = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author"
            value={authorFilter}
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="checkbox"
            checked={favouriteFilter}
            onChange={handleFavouriteFilter}
          />
          Only Favourite
        </div>
        <button type="button" onClick={handleResetFilter}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
