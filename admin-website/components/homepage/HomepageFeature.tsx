import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	homepageFeature: {
		id: string
        title: string
        description: string
        topLinkText: string
        topLink: string
        bottomLinkText: string
        bottomLink: string
        image: string
	};
}

export default function HomepageFeature(props: PropsInterface) {
	const { homepageFeature } = props;
	const [homepageFeatureState, setHomepageFeatureState] = useState(homepageFeature);
	const [canUpdate, setCanUpdate] = useState(false);

	// create the mutations
	const [
		updateHomepageFeature,
		{ loading, error },
	] = useMutation(gql`
    mutation Mutation($updateHomepageFeatureId: String!, $updateHomepageFeatureTitle: String, $updateHomepageFeatureDescription: String, $updateHomepageFeatureTopLinkText: String, $updateHomepageFeatureTopLink: String, $updateHomepageFeatureBottomLinkText: String, $updateHomepageFeatureBottomLink: String, $updateHomepageFeatureImage: [String]) {
        updateHomepageFeature(id: $updateHomepageFeatureId, title: $updateHomepageFeatureTitle, description: $updateHomepageFeatureDescription, topLinkText: $updateHomepageFeatureTopLinkText, topLink: $updateHomepageFeatureTopLink, bottomLinkText: $updateHomepageFeatureBottomLinkText, bottomLink: $updateHomepageFeatureBottomLink, image: $updateHomepageFeatureImage) {
          id
          title
          description
          topLinkText
          topLink
          bottomLinkText
          bottomLink
          image
        }
      }
	`);
	const [
		removeHomepageFeature
	] = useMutation(gql`
    mutation Mutation($removeHomepageFeatureId: ID!) {
        removeHomepageFeature(id: $removeHomepageFeatureId)
      }
	`);


	return (
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageFeatureState.title}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageFeatureState({ ...homepageFeatureState, title: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageFeatureState.description}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageFeatureState({ ...homepageFeatureState, description: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageFeatureState.topLinkText}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageFeatureState({ ...homepageFeatureState, topLinkText: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageFeatureState.topLink}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageFeatureState({ ...homepageFeatureState, topLink: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageFeatureState.bottomLinkText}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageFeatureState({ ...homepageFeatureState, bottomLinkText: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageFeatureState.bottomLink}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageFeatureState({ ...homepageFeatureState, bottomLink: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={homepageFeatureState.image}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setHomepageFeatureState({ ...homepageFeatureState, image: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateHomepageFeature({
							variables: {
								updateHomepageFeatureId: homepageFeatureState.id,
								updateHomepageFeatureTitle: homepageFeatureState.title,
								$updateHomepageFeatureDescription: homepageFeatureState.description,
								updateHomepageFeatureTopLinkText: homepageFeatureState.topLinkText,
								updateHomepageFeatureTopLink: homepageFeatureState.topLink,
								updateHomepageFeatureBottomLinkText: homepageFeatureState.bottomLinkText,
								updateHomepageFeatureBottomLink: homepageFeatureState.bottomLink,
								updateHomepageFeatureImage: homepageFeatureState.image,
							},
                        });
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
				<button
					className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						removeHomepageFeature({
							variables: {
								removeHomepageFeatureId: homepageFeatureState.id
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
