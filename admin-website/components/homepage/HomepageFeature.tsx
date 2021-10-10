import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	homepageFeature: {
		id: string;
		title: string;
		description: string;
		topLinkText: string;
		topLink: string;
		bottomLinkText: string;
		bottomLink: string;
		image: string;
	};
}

export default function HomepageFeature(props: PropsInterface) {
	const { homepageFeature } = props;
	const [homepageFeatureState, setHomepageFeatureState] =
		useState(homepageFeature);
	const [canUpdate, setCanUpdate] = useState(false);

	const GET_FEATURES = gql`
		{
			homepageFeatures {
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
	`;

	// create the mutations
	const [updateHomepageFeature, { loading, error }] = useMutation(gql`
		mutation Mutation(
			$updateHomepageFeatureId: String!
			$updateHomepageFeatureTitle: String
			$updateHomepageFeatureDescription: String
			$updateHomepageFeatureTopLinkText: String
			$updateHomepageFeatureTopLink: String
			$updateHomepageFeatureBottomLinkText: String
			$updateHomepageFeatureBottomLink: String
			$updateHomepageFeatureImage: String
		) {
			updateHomepageFeature(
				id: $updateHomepageFeatureId
				title: $updateHomepageFeatureTitle
				description: $updateHomepageFeatureDescription
				topLinkText: $updateHomepageFeatureTopLinkText
				topLink: $updateHomepageFeatureTopLink
				bottomLinkText: $updateHomepageFeatureBottomLinkText
				bottomLink: $updateHomepageFeatureBottomLink
				image: $updateHomepageFeatureImage
			) {
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
	const [removeHomepageFeature, { loading: loadingDelete }] = useMutation(gql`
		mutation Mutation($removeHomepageFeatureId: ID!) {
			removeHomepageFeature(id: $removeHomepageFeatureId)
		}
	`);

	return (
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div className="grid grid-cols-4 gap-4">
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="title"
					>
						title
					</label>
					<input
						id="title"
						type="text"
						placeholder="title "
						className="bg-gray-300 px-3 py-3 rouned-lg"
						value={homepageFeatureState.title}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageFeatureState({
								...homepageFeatureState,
								title: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="description"
					>
						description
					</label>
					<input
						id="description"
						type="text"
						placeholder="description "
						className="bg-gray-300 px-3 py-3 rouned-lg"
						value={homepageFeatureState.description}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageFeatureState({
								...homepageFeatureState,
								description: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="topLinkText"
					>
						topLinkText
					</label>
					<input
						id="topLinkText"
						type="text"
						placeholder="topLinkText "
						className="bg-gray-300 px-3 py-3 rouned-lg"
						value={homepageFeatureState.topLinkText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageFeatureState({
								...homepageFeatureState,
								topLinkText: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="topLink"
					>
						topLink
					</label>
					<input
						id="topLink"
						type="text"
						placeholder="topLink "
						className="bg-gray-300 px-3 py-3 rouned-lg"
						value={homepageFeatureState.topLink}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageFeatureState({
								...homepageFeatureState,
								topLink: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="bottomLinkText"
					>
						bottomLinkText
					</label>
					<input
						id="bottomLinkText"
						type="text"
						placeholder="bottomLinkText "
						className="bg-gray-300 px-3 py-3 rouned-lg"
						value={homepageFeatureState.bottomLinkText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageFeatureState({
								...homepageFeatureState,
								bottomLinkText: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="bottomLink"
					>
						bottomLink
					</label>
					<input
						id="bottomLink"
						type="text"
						placeholder="bottomLink"
						className="bg-gray-300 px-3 py-3 rouned-lg"
						value={homepageFeatureState.bottomLink}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageFeatureState({
								...homepageFeatureState,
								bottomLink: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="image"
					>
						image
					</label>
					<input
						id="image"
						type="text"
						placeholder="image"
						className="bg-gray-300 px-3 py-3 rouned-lg"
						value={homepageFeatureState.image}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageFeatureState({
								...homepageFeatureState,
								image: e.target.value,
							});
						}}
					/>
				</div>

				<button
					className="col-start-1 col-end-2 ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateHomepageFeature({
							variables: {
								updateHomepageFeatureId: homepageFeatureState.id,
								updateHomepageFeatureTitle: homepageFeatureState.title,
								$updateHomepageFeatureDescription:
									homepageFeatureState.description,
								updateHomepageFeatureTopLinkText:
									homepageFeatureState.topLinkText,
								updateHomepageFeatureTopLink: homepageFeatureState.topLink,
								updateHomepageFeatureBottomLinkText:
									homepageFeatureState.bottomLinkText,
								updateHomepageFeatureBottomLink:
									homepageFeatureState.bottomLink,
								updateHomepageFeatureImage: homepageFeatureState.image,
							},
							refetchQueries: [GET_FEATURES],
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
								removeHomepageFeatureId: homepageFeatureState.id,
							},
							refetchQueries: [GET_FEATURES],
						});
					}}
				>
					{loadingDelete ? "...loading" : "Delete"}
				</button>
			</div>
		</div>
	);
}
