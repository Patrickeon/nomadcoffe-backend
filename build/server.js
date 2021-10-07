"use strict";

var _apolloServer = require("apollo-server");

var _schema = require("./schema");

require("dotenv").config();

var server = new _apolloServer.ApolloServer({
  typeDefs: _schema.typeDefs,
  resolvers: _schema.resolvers
});
var PORT = process.env.PORT;
server.listen(PORT).then(function (_ref) {
  var url = _ref.url;
  return console.log("\uD83D\uDE80 Server is running on ".concat(url, " \u2705"));
});