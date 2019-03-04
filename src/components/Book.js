import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Book extends Component {
  state = {
    thumbnailHeight: 0,
    thumbnailWidth: 0,
  };

  updateThumbnail = (url) => {
    const img = new Image();

    img.addEventListener('load', () => {
      // Calculate thumbnail size with proportions so it doesn't
      // exceed 200px when it's bigger
      const thumbnailHeight = Math.min(img.height, 200);
      const thumbnailWidth = img.width * thumbnailHeight / img.height;

      this.setState(() => ({
        thumbnailHeight,
        thumbnailWidth,
      }));
    });
    img.src = url;
  }

  getThumbnailStyles = () => {
    const {book} = this.props;

    if (book.imageLinks) {
      return {
        backgroundImage: book.imageLinks ? `url("${book.imageLinks.thumbnail}")` : null,
        height: this.state.thumbnailHeight,
        width: this.state.thumbnailWidth,
      };
    }
  }

  handleShelfChange = ({target}) => {
    const {book, onShelfChange} = this.props;

    if (onShelfChange) {
      onShelfChange(book, target.value);
    }
  }

  componentDidMount() {
    if (this.props.book.imageLinks) {
      this.updateThumbnail(this.props.book.imageLinks.thumbnail);
    }
  }

  render() {
    const {book} = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
          <div className="book-cover" style={this.getThumbnailStyles()}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf || 'none'} onChange={this.handleShelfChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Unknown author'}</div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func,
};

export default Book;
