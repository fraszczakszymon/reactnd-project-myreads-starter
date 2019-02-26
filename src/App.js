import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import * as BooksAPI from './api/BooksAPI';
import Bookshelf from './components/Bookshelf';
import SearchBook from './components/SearchBook';
import './App.css'

class BooksApp extends React.Component {
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

  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  onShelfChange = (changedBook, newShelf) => {
    this.setState(() => ({
      books: this.state.books.map((book) => {
        if (changedBook.id === book.id) {
          book.shelf = newShelf
        }

        return book
      })
    }))
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
      <BrowserRouter>
        <div className="app">
          <Route
            path="/search"
            render={({ history }) => (
              <SearchBook onShelfChange={this.onShelfChange} history={history} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {BooksApp.shelfs.map((shelf) => (
                      <Bookshelf
                        key={shelf.key}
                        books={this.state.books.filter((book) => book.shelf === shelf.key)}
                        title={shelf.title}
                        onShelfChange={this.onShelfChange}
                      />
                    ))}
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search"><button>Add a book</button></Link>
                </div>
              </div>
            )}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
