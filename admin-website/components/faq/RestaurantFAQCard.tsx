import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	restaurantFAQCard: {
		id: string;
		question: string;
		answer: string;
	};
}

export default function RestaurantFAQCard(props: PropsInterface) {
	const { restaurantFAQCard } = props;
	const [restaurantFAQState, setRestaurantFAQState] =
		useState(restaurantFAQCard);
	const [canUpdate, setCanUpdate] = useState(false);

	const GET_QNA = gql`
		{
			restaurantFAQ {
				id
				question
				answer
			}
		}
	`;

	// create the mutations
	const [updateRestaurantFAQ, { loading, error }] = useMutation(gql`
		mutation Mutation(
			$updateRestaurantFaqId: String!
			$updateRestaurantFaqQuestion: String
			$updateRestaurantFaqAnswer: String
		) {
			updateRestaurantFAQ(
				id: $updateRestaurantFaqId
				question: $updateRestaurantFaqQuestion
				answer: $updateRestaurantFaqAnswer
			) {
				id
				question
				answer
			}
		}
	`);
	const [removeRestaurantFAQ, { loading: loadingRemove }] = useMutation(gql`
		mutation Mutation($removeRestaurantFaqId: ID!) {
			removeRestaurantFAQ(id: $removeRestaurantFaqId)
		}
	`);

	return (
		<div className="mb-7 px-4 rouned-xl shadow-lg py-4">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="question"
					>
						question
					</label>
					<textarea
						name="question"
						id="question"
						rows={5}
						className="block w-full bg-gray-300 px-3 py-3 rouned-lg mb-5"
						placeholder="Question"
						value={restaurantFAQState.question}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setRestaurantFAQState({
								...restaurantFAQState,
								question: e.target.value,
							});
						}}
					></textarea>
				</div>

				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="answer"
					>
						answer
					</label>
					<textarea
						name="answer"
						id="answer"
						rows={5}
						className="block w-full bg-gray-300 px-3 py-3 rouned-lg mb-5"
						placeholder="Answer"
						value={restaurantFAQState.answer}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setRestaurantFAQState({
								...restaurantFAQState,
								answer: e.target.value,
							});
						}}
					></textarea>
				</div>

				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateRestaurantFAQ({
							variables: {
								updateRestaurantFaqId: restaurantFAQState.id,
								updateRestaurantFaqQuestion: restaurantFAQState.question,
								updateRestaurantFaqAnswer: restaurantFAQState.answer,
							},
						});
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
				<button
					className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						removeRestaurantFAQ({
							variables: {
								removeRestaurantFaqId: restaurantFAQState.id,
							},
							refetchQueries: [GET_QNA],
						});
					}}
				>
					{loadingRemove ? "...deleting" : "Remove"}
				</button>
			</div>
		</div>
	);
}
