import React from 'react'
import { Router, Route } from 'react-router-dom';

import * as BooksAPI from './api/BooksAPI';
import BookshelfsWall from './components/BookshelfsWall';
import SearchBook from './components/SearchBook';
import history from './browser/history';

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  onShelfChange = (changedBook, newShelf) => {
    let found = false

    const books = this.state.books.map((book) => {
      if (changedBook.id === book.id) {
        book.shelf = newShelf
        found = true
      }

      return book
    })

    if (!found) {
      books.push(changedBook)
    }

    this.setState(() => ({
      books
    }))

    BooksAPI.update(changedBook, newShelf)
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <Route
            path="/search"
            render={() => (
              <SearchBook books={this.state.books} onShelfChange={this.onShelfChange} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <BookshelfsWall books={this.state.books} onShelfChange={this.onShelfChange} />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default BooksApp
