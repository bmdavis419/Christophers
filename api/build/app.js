"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var types_1 = require("./types");
var resolvers_1 = require("./resolvers");
// create the server object
var server = new apollo_server_1.ApolloServer({ typeDefs: types_1.typeDefs, resolvers: resolvers_1.resolvers, cors: true });
// The `listen` method launches a web server.
var port = process.env.PORT || 4000;
server.listen({ port: port }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready -> ".concat(url));
});
