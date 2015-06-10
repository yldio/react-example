var Hapi = require('hapi');
var browserify = require('browserify');
var map = require('through2-map');
var fs = require('fs');
var React = require('react');
var jsx = require('node-jsx');

jsx.install();

var Books = require('./views/index.jsx');

var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: (process.argv[2] || 3333)
});


server.route({
  method: 'GET',
  path:'/bundle.js',
  handler: function (request, reply) {
    reply(null, browserify('./app.js')
    .transform('reactify')
    .bundle().pipe(map({
      objectMode: false
    }, function(chunk) {
      return chunk;
    })));
  }
});

server.route({
  method: 'GET',
  path:'/',
  handler: function (request, reply) {
    var books = [{
      title: 'Professional Node.js',
      read: false
    }, {
      title: 'Node.js Patterns',
      read: false
    }];

    reply(null, React.renderToStaticMarkup(
      React.DOM.body(
        null,
        React.DOM.div({
          id: 'container',
          dangerouslySetInnerHTML: {
            __html: React.renderToString(React.createElement(Books, {
              books: books
            }))
          }
        }),
        React.DOM.script({
          'id': 'initial-data',
          'type': 'text/plain',
          'data-json': JSON.stringify(books)
        }),
        React.DOM.script({
          src: '/bundle.js'
        })
      )
    )).header('Content-Type', 'text/html');
  }
});

server.start(function () {
  console.info("Listening @", server.info.uri);
});