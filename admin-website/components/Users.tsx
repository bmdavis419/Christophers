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

	// state for form to add user
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		password: "",
	});

	// mutation to remove a user
	const [removeUser, { loading: loadingRemove, error: errorRemove }] =
		useMutation(gql`
			mutation RemoveUserMutation($removeUserId: ID!) {
				removeUser(id: $removeUserId)
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

	return (
		<div className="w-full flex justify-center">
			<div className="md:w-3/4 p-5 mt-10 rounded-2xl shadow-lg md:h-1/2">
				<h1 className="font-bold text-center text-primary underline text-3xl mb-4">
					Manage Users
				</h1>
				<h3 className="font-bold text-center text-green-500 underline text-2xl mb-4">
					{loadingRemove && "Removing User..."}
					{loadingAdd && "Adding User..."}
				</h3>
				<h3 className="font-bold text-center text-red-500 underline text-2xl mb-4">
					{errorAdd && `Error Adding User: ${errorAdd.message}`}
					{errorRemove && `Error Removing User: ${errorRemove.message}`}
				</h3>

				{users.map((user) => {
					return (
						<div
							key={user.id}
							className="grid grid-cols-3 text-center bg-gray-200 rounded-lg py-3 mb-2"
						>
							<div>{user.name}</div>
							<div>{user.email}</div>
							<div>
								<button
									className="bg-red-500 hover:bg-red-300 text-white font-bold rounded-full px-3 py-2"
									onClick={() => {
										removeUser({
											variables: { removeUserId: user.id },
											refetchQueries: [GET_USERS],
										});
									}}
								>
									Remove User
								</button>
							</div>
						</div>
					);
				})}
				<div className="grid grid-cols-4 bg-gray-200 rounded-lg py-3">
					<div className="flex justify-center">
						<div>
							<label htmlFor="name" className="block font-light">
								name
							</label>
							<input
								type="text"
								value={formState.name}
								onChange={(e) => {
									e.preventDefault();
									setFormState({ ...formState, name: e.target.value });
								}}
								name="name"
								id="name"
								className="rounded-md px-3 py-2"
							/>
						</div>
					</div>
					<div className="flex justify-center">
						<div>
							<label htmlFor="email" className="block font-light">
								email
							</label>
							<input
								type="email"
								value={formState.email}
								onChange={(e) => {
									e.preventDefault();
									setFormState({ ...formState, email: e.target.value });
								}}
								name="email"
								id="email"
								className="rounded-md px-3 py-2"
							/>
						</div>
					</div>
					<div className="flex justify-center">
						<div>
							<label htmlFor="password" className="block font-light">
								password
							</label>
							<input
								type="password"
								value={formState.password}
								onChange={(e) => {
									e.preventDefault();
									setFormState({ ...formState, password: e.target.value });
								}}
								name="password"
								id="password"
								className="rounded-md px-3 py-2"
							/>
						</div>
					</div>
					<div className="flex justify-center align-middle">
						<button
							className="px-3 py-2 font-bold text-white bg-primary hover:bg-secondary rounded-full"
							onClick={(e) => {
								addUser({
									variables: {
										name: formState.name,
										email: formState.email,
										password: formState.password,
									},
									refetchQueries: [GET_USERS],
								});
							}}
						>
							Create User
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
