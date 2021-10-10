import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";
import RestaurantFAQCard from "./faq/RestaurantFAQCard";

export default function RestaurantFAQ() {
	const GET_QNA = gql`
		{
			restaurantFAQ {
				id
				question
				answer
			}
		}
	`;

	const [createRestaurantFAQ] = useMutation(gql`
		mutation Mutation(
			$createRestaurantFAQQuestion: String!
			$createRestaurantFAQAnswer: String!
		) {
			createRestaurantFAQ(
				question: $createRestaurantFAQQuestion
				answer: $createRestaurantFAQAnswer
			) {
				id
				question
				answer
			}
		}
	`);

	const { loading, error, data } = useQuery(GET_QNA);
	const [cards, setCards] = useState<any>([]);
	const [newCard, setNewCard] = useState({
		question: "",
		answer: "",
	});
	const [canCreate, setCanCreate] = useState({
		question: false,
		answer: false,
	});

	useEffect(() => {
		if (data != undefined) {
			const temp = [...data.restaurantFAQ];
			setCards(temp);
		}
	}, [data]);

	// make sure there is data before render
	if (loading) return <Loading />;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="w-full">
			<h1 className="text-primary font-bold text-4xl text-center underline mb-5">
				Restaurant FAQ
			</h1>
			<div className="flex justify-center">
				<div className="mb-7 px-4 shadow-lg py-4 w-1/2 rounded-xl">
					<h4 className="text-center text-primary font-bold text-2xl">
						Create New FAQ Card
					</h4>
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
							onChange={(e) => {
								setCanCreate({ ...canCreate, question: true });
								e.preventDefault();
								setNewCard({ ...newCard, question: e.target.value });
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
							onChange={(e) => {
								setCanCreate({ ...canCreate, answer: true });
								e.preventDefault();
								setNewCard({ ...newCard, answer: e.target.value });
							}}
						></textarea>
					</div>

					<div className="w-full flex justify-center">
						<button
							className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block text-xl"
							disabled={!canCreate}
							onClick={(e) => {
								setCanCreate({
									question: false,
									answer: false,
								});

								createRestaurantFAQ({
									variables: {
										createRestaurantFAQQuestion: newCard.question,
										createRestaurantFAQAnswer: newCard.answer,
									},
									refetchQueries: [GET_QNA],
								});
							}}
						>
							Create new restaurant FAQ
						</button>
					</div>
				</div>
			</div>
			{cards.map((card: { id: string; question: string; answer: string }) => {
				return <RestaurantFAQCard restaurantFAQCard={card} key={card.id} />;
			})}
		</div>
	);
}
