import { ApolloServer } from "apollo-server";
import { typeDefs } from "./types";
import { resolvers } from "./resolvers";

// create the server object
const server = new ApolloServer({ typeDefs, resolvers, cors: true });

// The `listen` method launches a web server.
const port = process.env.PORT || 4000;
server.listen({ port: port }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
