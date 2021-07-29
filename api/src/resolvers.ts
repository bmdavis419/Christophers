export const resolvers = {
	Query: {
		tests() {
			return [
				{
					name: "one",
					email: "email",
					id: "asdf",
				},
				{
					name: "two",
					email: "email2",
					id: "fdsa",
				},
				{
					name: "three",
					email: "email3",
					id: "jadfsjasdfj",
				},
			];
		},
	},
};
