import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Bookshelf from './Bookshelf';

class BookshelfsWall extends Component {
  static shelfs = [
    {
      key: 'currentlyReading',
      title: 'Currently Reading'
    },
    {
      key: 'wantToRead',
      title: 'Want to Read'
    },
    {
      key: 'read',
      title: 'Read'
    }
  ];

  render() {
    const { books, onShelfChange } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {BookshelfsWall.shelfs.map((shelf) => (
              <Bookshelf
                key={shelf.key}
                books={books.filter((book) => book.shelf === shelf.key)}
                title={shelf.title}
                onShelfChange={onShelfChange}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"><button>Add a book</button></Link>
        </div>
      </div>
    )
  }
}

BookshelfsWall.propTypes = {
  books: PropTypes.array,
  onShelfChange: PropTypes.func
}

export default BookshelfsWall
