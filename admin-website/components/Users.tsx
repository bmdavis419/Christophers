import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

interface UserInterface {
	name: string;
	email: string;
	id: string;
}

interface DataInterface {
	users: UserInterface[];
}

export default function Users() {
	// get the users
	const GET_USERS = gql`
		{
			users {
				email
				id
				name
			}
		}
	`;

	// query the users
	const { data, loading, error } = useQuery<DataInterface>(GET_USERS);

	// mutation to add a user
	const [addUser, { loading: loadingAdd, error: errorAdd }] = useMutation(gql`
		mutation Mutation($name: String!, $email: String!, $password: String!) {
			addUser(name: $name, email: $email, password: $password) {
				name
				email
				id
			}
		}
	`);

	// state for all users
	const [users, setUsers] = useState<UserInterface[]>([]);

	// fill state when data is loaded
	useEffect(() => {
		if (data) {
			setUsers([...data.users]);
		}
	}, [data]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return <div>Manage Users</div>;
}
