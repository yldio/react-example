var React = require('react');

var BookForm = React.createClass({
  propTypes: {
    onBook: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      title: '',
      read: false
    };
  },
  changeTitle: function(ev) {
    this.setState({
      title: ev.target.value
    });
  },
  changeRead: function() {
    this.setState({
      read: !this.state.read
    });
  },
  addBook: function(ev) {
    ev.preventDefault();

    this.props.onBook({
      title: this.state.title,
      read: this.state.read
    });

    this.setState({
      title: '',
      read: false
    });
  },
  render: function() {
    return (
      <form onSubmit={this.addBook}>
        <div>
          <label htmlFor='title'>Title</label>
          <div><input type='text' id='title' value={this.state.title} onChange={this.changeTitle} placeholder='Title' /></div>
        </div>
        <div>
          <label htmlFor='title'>Read</label>
          <div><input type='checkbox' id='read' checked={this.state.read} onChange={this.changeRead} /></div>
        </div>
        <div>
          <button type='submit'>Add Book</button>
        </div>
      </form>
    );
  }
});

var Books = React.createClass({
  propTypes: {
    books: React.PropTypes.array
  },
  getInitialState: function() {
    return {
      books: (this.props.books || [])
    };
  },
  onBook: function(book) {
    this.state.books.push(book);

    this.setState({
      books: this.state.books
    });
  },
  render: function() {
    var books = this.state.books.map(function(book) {
      return <Book title={book.title} read={book.read}></Book>;
    });

    return (
      <div>
        <BookForm onBook={this.onBook}></BookForm>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Read</th>
            </tr>
          </thead>
          <tbody>{books}</tbody>
        </table>
      </div>
    );
  }
});

var Book = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    read: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      title: this.props.title,
      read: this.props.read
    };
  },
  handleChange: function(ev) {
    this.setState({
      read: !this.state.read
    });
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td><input type='checkbox' checked={this.state.read} onChange={this.handleChange} /></td>
      </tr>
    );
  }
});

module.exports = Books;