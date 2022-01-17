import { gql, useMutation } from "@apollo/client";
import firebase from "firebase";
import React, { useState } from "react";
import ImageUpload from "../venue/ImageUpload";
import HomepageFeatureTextbox from "./HomepageFeatureTextbox";

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

	const [imageFile, setImageFile] = useState<null | File>(null);
	const [uploadProgress, setUploadProgress] = useState("");
	const [uploadError, setUploadError] = useState("");
	const uploadImage = (e: any) => {
		e.preventDefault();
		const imageStorageRef = firebase.storage().ref().child("images");

		// check for file
		if (imageFile) {
			let uploadTask = imageStorageRef.child(imageFile.name).put(imageFile);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// progress
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setUploadProgress(`uploading: ${progress}%`);
				},
				(error) => {
					setUploadError(`error: ${error.message}`);
				},
				() => {
					setHomepageFeatureState({
						...homepageFeatureState,
						image: `/images/${imageFile.name}`,
					});
				}
			);
		}
	};

	return (
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div className="grid grid-cols-4 gap-4">
				<HomepageFeatureTextbox
					value={homepageFeatureState.title}
					dbName="title"
					displayName="Title"
					updateFunction={setHomepageFeatureState}
					updateFunctionData={homepageFeatureState}
				/>
				<HomepageFeatureTextbox
					value={homepageFeatureState.description}
					dbName="description"
					displayName="Description"
					updateFunction={setHomepageFeatureState}
					updateFunctionData={homepageFeatureState}
				/>
				<HomepageFeatureTextbox
					value={homepageFeatureState.topLinkText}
					dbName="topLinkText"
					displayName="Top Link Text"
					updateFunction={setHomepageFeatureState}
					updateFunctionData={homepageFeatureState}
				/>
				<HomepageFeatureTextbox
					value={homepageFeatureState.topLink}
					dbName="topLink"
					displayName="Top Link"
					updateFunction={setHomepageFeatureState}
					updateFunctionData={homepageFeatureState}
				/>
				<HomepageFeatureTextbox
					value={homepageFeatureState.bottomLinkText}
					dbName="bottomLinkText"
					displayName="Bottom Link Text"
					updateFunction={setHomepageFeatureState}
					updateFunctionData={homepageFeatureState}
				/>
				<HomepageFeatureTextbox
					value={homepageFeatureState.bottomLink}
					dbName="bottomLinkText"
					displayName="Bottom Link"
					updateFunction={setHomepageFeatureState}
					updateFunctionData={homepageFeatureState}
				/>
				<ImageUpload
					setImageFile={setImageFile}
					name="Image (1:1 ratio)"
					uploadError={uploadError}
					uploadProgress={uploadProgress}
					image={homepageFeatureState.image}
					uploadImage={uploadImage}
				/>

				<button
					className="col-start-1 col-end-2 ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
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
