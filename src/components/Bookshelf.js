import PropTypes from 'prop-types';
import React from 'react';

import Book from './Book';

const Bookshelf = function ({books = [], title = '', ...props}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <Book key={book.id} book={book} {...props} />
        ))}
      </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.array,
  onShelfChange: PropTypes.func,
  title: PropTypes.string,
};

export default Bookshelf;
