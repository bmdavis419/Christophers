import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	cateringFAQCard: {
		id: string;
		question: string;
		answer: string;
	};
}

export default function CateringFAQCard(props: PropsInterface) {
	const { cateringFAQCard } = props;
	const [cateringFAQState, setCateringFAQState] = useState(cateringFAQCard);
	const [canUpdate, setCanUpdate] = useState(false);

	// query
	const GET_QNA = gql`
		{
			cateringFAQ {
				id
				question
				answer
			}
		}
	`;

	// create the mutations
	const [updateCateringFAQ, { loading, error }] = useMutation(gql`
		mutation Mutation(
			$updateCateringFaqId: String!
			$updateCateringFaqQuestion: String
			$updateCateringFaqAnswer: String
		) {
			updateCateringFAQ(
				id: $updateCateringFaqId
				question: $updateCateringFaqQuestion
				answer: $updateCateringFaqAnswer
			) {
				id
				question
				answer
			}
		}
	`);
	const [removeCateringFAQ, { loading: loadingRemove, error: errorRemove }] =
		useMutation(gql`
			mutation Mutation($removeCateringFaqId: ID!) {
				removeCateringFAQ(id: $removeCateringFaqId)
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
						value={cateringFAQState.question}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setCateringFAQState({
								...cateringFAQState,
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
						value={cateringFAQState.answer}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setCateringFAQState({
								...cateringFAQState,
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

						updateCateringFAQ({
							variables: {
								updateCateringFaqId: cateringFAQState.id,
								updateCateringFaqQuestion: cateringFAQState.question,
								updateCateringFaqAnswer: cateringFAQState.answer,
							},
						});
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
				<button
					className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						removeCateringFAQ({
							variables: {
								removeCateringFaqId: cateringFAQState.id,
							},
							refetchQueries: [GET_QNA],
						});
					}}
				>
					{loadingRemove ? "...removing" : "Delete"}
				</button>
			</div>
		</div>
	);
}
