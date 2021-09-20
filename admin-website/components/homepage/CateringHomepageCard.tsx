import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	cateringHomepageCard: {
		id: string
		title: string
		date: string
		content: string
	};
}

export default function CateringHomepageCard(props: PropsInterface) {
	const { cateringHomepageCard } = props;
	const [cateringHomepageCardState, setCateringHomepageCardState] = useState(cateringHomepageCard);
	const [canUpdate, setCanUpdate] = useState(false);

	// create the mutations
	const [
		updateCateringHomepageCard,
		{ loading, error },
	] = useMutation(gql`
    mutation UpdateCateringHomepageCardMutation($updateCateringHomepageCardId: String!, $updateCateringHomepageCardTitle: String, $updateCateringHomepageCardDate: String, $updateCateringHomepageCardContent: String) {
		updateCateringHomepageCard(id: $updateCateringHomepageCardId, title: $updateCateringHomepageCardTitle, date: $updateCateringHomepageCardDate, content: $updateCateringHomepageCardContent) {
		  title
		  date
		  content
		  id
		}
	  }
	`);
	const [
		removeCateringHomepageCard
	] = useMutation(gql`
    mutation UpdateCateringHomepageCardMutation($removeCateringHomepageCardId: ID!) {
		removeCateringHomepageCard(id: $removeCateringHomepageCardId)
	  }
	`);


	return (
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageCardState.title}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageCardState({ ...cateringHomepageCardState, title: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageCardState.date}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageCardState({ ...cateringHomepageCardState, date: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageCardState.content}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageCardState({ ...cateringHomepageCardState, content: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateCateringHomepageCard({
							variables: {
								updateCateringHomepageCardId: cateringHomepageCardState.id,
								updateCateringHomepageCardTitle: cateringHomepageCardState.title,
								updateCateringHomepageCardDate: cateringHomepageCardState.date,
								updateCateringHomepageCardContent: cateringHomepageCardState.content
							},
                        });
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
				<button
					className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						removeCateringHomepageCard({
							variables: {
								removeCateringHomepageCardId: cateringHomepageCardState.id
							},
						});
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
