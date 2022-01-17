import { gql, useMutation, useQuery } from "@apollo/client";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import ImageUpload from "../venue/ImageUpload";
import HomepageFeature from "./HomepageFeature";
import HomepageFeatureTextbox from "./HomepageFeatureTextbox";

export default function CreateHomepageFeature() {
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

	const {
		loading: loadFeatures,
		error: errorFeatures,
		data: dataFeatures,
	} = useQuery(GET_FEATURES);

	const [createHomepageFeature, { loading: loadingCreateFeature }] =
		useMutation(gql`
			mutation Mutation(
				$createHomepageFeatureTitle: String!
				$createHomepageFeatureDescription: String!
				$createHomepageFeatureTopLinkText: String!
				$createHomepageFeatureTopLink: String!
				$createHomepageFeatureBottomLinkText: String!
				$createHomepageFeatureBottomLink: String!
				$createHomepageFeatureImage: String!
			) {
				createHomepageFeature(
					title: $createHomepageFeatureTitle
					description: $createHomepageFeatureDescription
					topLinkText: $createHomepageFeatureTopLinkText
					topLink: $createHomepageFeatureTopLink
					bottomLinkText: $createHomepageFeatureBottomLinkText
					bottomLink: $createHomepageFeatureBottomLink
					image: $createHomepageFeatureImage
				) {
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

	const [features, setFeatures] = useState<any>([]);

	const [newFeature, setNewFeature] = useState({
		title: "",
		description: "",
		topLinkText: "",
		topLink: "",
		bottomLinkText: "",
		bottomLink: "",
		image: "",
	});

	useEffect(() => {
		if (dataFeatures != undefined) {
			const temp = [...dataFeatures.homepageFeatures];
			setFeatures(temp);
		}
	}, [dataFeatures]);

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
					setNewFeature({ ...newFeature, image: `/images/${imageFile.name}` });
				}
			);
		}
	};

	return (
		<div>
			<div className="w-full mx-5 bg-white rounded-lg shadow-lg my-3 p-5">
				<h3 className="text-primary text-center text-3xl font-bold">
					Create a Homepage Feature
				</h3>
				<HomepageFeatureTextbox
					value={newFeature.title}
					dbName="title"
					displayName="Title"
					updateFunction={setNewFeature}
					updateFunctionData={newFeature}
				/>
				<HomepageFeatureTextbox
					value={newFeature.description}
					dbName="description"
					displayName="Description"
					updateFunction={setNewFeature}
					updateFunctionData={newFeature}
				/>
				<HomepageFeatureTextbox
					value={newFeature.topLinkText}
					dbName="topLinkText"
					displayName="Top Link Text"
					updateFunction={setNewFeature}
					updateFunctionData={newFeature}
				/>
				<HomepageFeatureTextbox
					value={newFeature.topLink}
					dbName="topLink"
					displayName="Top Link"
					updateFunction={setNewFeature}
					updateFunctionData={newFeature}
				/>
				<HomepageFeatureTextbox
					value={newFeature.bottomLinkText}
					dbName="bottomLinkText"
					displayName="Bottom Link Text"
					updateFunction={setNewFeature}
					updateFunctionData={newFeature}
				/>
				<HomepageFeatureTextbox
					value={newFeature.bottomLink}
					dbName="bottomLink"
					displayName="Bottom Link"
					updateFunction={setNewFeature}
					updateFunctionData={newFeature}
				/>
				<ImageUpload
					setImageFile={setImageFile}
					name="Image (1:1 ratio)"
					uploadError={uploadError}
					uploadProgress={uploadProgress}
					image={newFeature.image}
					uploadImage={uploadImage}
				/>
				<button
					className="col-start-1 col-end-2 ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						createHomepageFeature({
							variables: {
								createHomepageFeatureTitle: newFeature.title,
								createHomepageFeatureDescription: newFeature.description,
								createHomepageFeatureTopLinkText: newFeature.topLinkText,
								createHomepageFeatureTopLink: newFeature.topLink,
								createHomepageFeatureBottomLinkText: newFeature.bottomLinkText,
								createHomepageFeatureBottomLink: newFeature.bottomLink,
								createHomepageFeatureImage: newFeature.image,
							},
							refetchQueries: [GET_FEATURES],
						});
					}}
				>
					{loadingCreateFeature ? "...loading" : "Create"}
				</button>
			</div>
			<h3 className="text-primary text-center text-3xl font-bold">
				Update Current Features
			</h3>
			{features.map(
				(feature: {
					id: string;
					title: string;
					description: string;
					topLinkText: string;
					topLink: string;
					bottomLinkText: string;
					bottomLink: string;
					image: string;
				}) => {
					return <HomepageFeature homepageFeature={feature} key={feature.id} />;
				}
			)}
		</div>
	);
}
