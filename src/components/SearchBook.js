import React from 'react';
import { DebounceInput } from 'react-debounce-input';

const SearchBook = function ({ history, onShelfChange }) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={history.goBack}>Close</button>
        <div className="search-books-input-wrapper">
          <DebounceInput
            placeholder="Search by title or author"
            minLength={3}
            debounceTimeout={500}
            onChange={console.log}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">

        </ol>
      </div>
    </div>
  )
}

export default SearchBook
