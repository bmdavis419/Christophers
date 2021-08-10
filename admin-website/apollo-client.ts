import { ApolloClient, InMemoryCache } from "@apollo/client";

let dbString = "";
if (process.env.NODE_ENV == "development") {
	dbString = "http://localhost:4000/";
} else {
	dbString = "https://api-7t3fyyjnca-uc.a.run.app/";
}

const client = new ApolloClient({
	uri: dbString,
	cache: new InMemoryCache(),
});

export default client;
