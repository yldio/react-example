var React = require('react');
var Books = require('./views/index.jsx');

var books = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
React.render(<Books books={books} />, document.getElementById('container'));