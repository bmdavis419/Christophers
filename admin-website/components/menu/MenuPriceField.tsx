import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

interface PropsInterface {
	formState: { price: string; id: string };
	setFormState: Function;
}

export default function MenuPriceField(props: PropsInterface) {
	const { formState, setFormState } = props;
	const [originalPrice, setOriginalPrice] = useState(formState.price);

	// create the mutation to send to db
	const [updatePrice, { loading, error }] = useMutation(gql`
		mutation Mutation($updateMenuItemId: ID!, $updateMenuItemPrice: String) {
			updateMenuItem(id: $updateMenuItemId, price: $updateMenuItemPrice) {
				price
			}
		}
	`);

	// state to keep track of if an edit has been made
	const [hasEdit, setHasEdit] = useState(false);

	return (
		<div className="inline">
			<input
				type="text"
				className={`bg-gray-300 px-2 py-2 rounded-md mr-4 ${
					hasEdit && "ring-4 ring-red-500 ring-opacity-50 outline-none"
				}`}
				value={formState.price}
				onChange={(e) => {
					e.preventDefault();
					setFormState({ ...formState, price: e.target.value });
					e.target.value == originalPrice
						? setHasEdit(false)
						: setHasEdit(true);
				}}
			/>
			<button
				className="bg-green-500 rounded-full px-2 py-2 hover:bg-green-300 text-white hover:shadow-inner"
				onClick={(e) => {
					e.preventDefault();
					updatePrice({
						variables: {
							updateMenuItemId: formState.id,
							updateMenuItemPrice: formState.price,
						},
					});
					setOriginalPrice(formState.price);
					setHasEdit(false);
				}}
			>
				<svg
					className="w-6 h-6 inline mr-2"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
					<path
						fillRule="evenodd"
						d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
						clipRule="evenodd"
					/>
				</svg>
				{loading ? "...changing" : "change"}
			</button>
			<div className="inline-block text-red-400 font-light ml-4">
				{error?.message}
			</div>
		</div>
	);
}
