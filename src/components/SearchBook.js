import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../api/BooksAPI';
import Book from './Book';
import history from '../browser/history';

class SearchBook extends Component {
  unlisten = null

  state = {
    books: [],
    message: '',
    queryValue: ''
  }

  getBooksWithSyncedStatuses = (foundBooks) => {
    return foundBooks.map((book) => {
      this.props.books.forEach((savedBook) => {
        if (book.id === savedBook.id) {
          book.shelf = savedBook.shelf
        }
      })

      return book
    })
  }

  search = (value) => {
    const isQueryLongEnough = value.length > 2

    this.setState(() => ({
      books: [],
      message: isQueryLongEnough ? 'Searching...' : ''
    }))

    if (isQueryLongEnough) {
      BooksAPI.search(value)
        .then((books) => {
          this.setState({
            books: !books.error ? this.getBooksWithSyncedStatuses(books) : [],
            message: books.error ? 'Could not find any book' : ''
          })
        })
    }
  }

  handleQueryUrlChange = (location) => {
    const params = new URLSearchParams(location.search)
    const queryValue = params.get('query') || '';

    this.setState(() => ({
      queryValue
    }))

    if (queryValue) {
      this.search(queryValue)
    } else {
      this.setState({
        books: []
      })
    }
  }

  handleSearchInput = ({ target }) => {
    const { value } = target
    const newQueryString = value ? `?query=${value}` : ''

    history.push(`/search${newQueryString}`)
  }

  handleShelfChange = (changedBook, newShelf) => {
    const { onShelfChange } = this.props

    this.setState((currentState) => ({
      books: currentState.books.map((book) => {
        if (changedBook.id === book.id) {
          book.shelf = newShelf
        }

        return book
      })
    }))

    if (onShelfChange) {
      onShelfChange(changedBook, newShelf)
    }
  }

  componentDidMount = () => {
    this.handleQueryUrlChange(window.location)
    this.unlisten = history.listen((location) => {
      this.handleQueryUrlChange(location)
    })
  }

  componentWillUnmount = () => {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              autoFocus
              placeholder="Search by title or author"
              debounceTimeout={500}
              onChange={this.handleSearchInput}
              value={this.state.queryValue}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.books.length > 0 && (
            <ol className="books-grid">
              {this.state.books.map((book) => (
                <Book key={book.id} book={book} onShelfChange={this.handleShelfChange} />
              ))}
            </ol>
          )}
          {this.state.message && this.state.queryValue && (
            <p className='search-message'>{this.state.message}</p>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBook
