import { gql } from "apollo-server";
export const typeDefs = gql`
	type Test {
		email: String
		name: String
		id: ID
	}
	type Query {
		tests: [Test]
	}
`;
