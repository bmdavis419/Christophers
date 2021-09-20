import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	homepageCard: {
		id: string
		title: string
		date: string
		content: string
	};
}

export default function HomepageCard(props: PropsInterface) {
	const { homepageCard } = props;
	const [homepageCardState, setHomepageCardState] = useState(homepageCard);
	const [canUpdate, setCanUpdate] = useState(false);

	// create the mutations
	const [
		updateHomepageCard,
		{ loading, error },
	] = useMutation(gql`
    mutation UpdateHomepageCardMutation($updateHomepageCardId: String!, $updateHomepageCardTitle: String, $updateHomepageCardDate: String, $updateHomepageCardContent: String) {
		updateHomepageCard(id: $updateHomepageCardId, title: $updateHomepageCardTitle, date: $updateHomepageCardDate, content: $updateHomepageCardContent) {
		  title
		  date
		  content
		  id
		}
	  }
	`);
	const [
		removeHomepageCard
	] = useMutation(gql`
    mutation UpdateHomepageCardMutation($removeHomepageCardId: ID!) {
		removeHomepageCard(id: $removeHomepageCardId)
	  }
	`);


	return (
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageCardState.title}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageCardState({ ...homepageCardState, title: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageCardState.date}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageCardState({ ...homepageCardState, date: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageCardState.content}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageCardState({ ...homepageCardState, content: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateHomepageCard({
							variables: {
								updateHomepageCardId: homepageCardState.id,
								updateHomepageCardTitle: homepageCardState.title,
								updateHomepageCardDate: homepageCardState.date,
								updateHomepageCardContent: homepageCardState.content
							},
                        });
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
				<button
					className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						removeHomepageCard({
							variables: {
								removeHomepageCardId: homepageCardState.id
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
