import { useMutation, gql } from "@apollo/client";
import firebase from "firebase";
import { DocumentNode } from "graphql";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

interface PropsInterface {
	setFormState: Function;
	GET_VENUE: DocumentNode;
	formState: {
		name: string;
		description: string;
		image: string;
		bannerImage: string;
	};
}

export default function VenueCreate(props: PropsInterface) {
	// extract form props
	const { setFormState, GET_VENUE, formState } = props;

	// muation to create
	const [createVenue, { loading, error }] = useMutation(gql`
		mutation Mutation(
			$createVenueName: String!
			$createVenueImage: String!
			$createVenueDescription: String!
			$createVenueBannerImage: String!
		) {
			createPartner(
				name: $createVenueName
				image: $createVenueImage
				description: $createVenueDescription
				bannerImage: $createVenueBannerImage
			) {
				id
				name
				image
				description
			}
		}
	`);

	// upload an image
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
					setFormState({ ...formState, image: `/images/${imageFile.name}` });
				}
			);
		}
	};

	// upload an image
	const [bannerImageFile, setBannerImageFile] = useState<null | File>(null);
	const [uploadBannerProgress, setBannerUploadProgress] = useState("");
	const [uploadBannerError, setBannerUploadError] = useState("");
	const uploadBannerImage = (e: any) => {
		e.preventDefault();
		const imageStorageRef = firebase.storage().ref().child("images");

		// check for file
		if (bannerImageFile) {
			let uploadTask = imageStorageRef
				.child(bannerImageFile.name)
				.put(bannerImageFile);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// progress
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setBannerUploadProgress(`uploading: ${progress}%`);
				},
				(error) => {
					setBannerUploadError(`error: ${error.message}`);
				},
				() => {
					setFormState({
						...formState,
						bannerImage: `/images/${bannerImageFile.name}`,
					});
				}
			);
		}
	};

	return (
		<div className="w-3/4 rounded-xl shadow-lg p-4">
			<div className="my-3">
				<h1 className="font-bold text-primary text-2xl text-center">
					Create New Partner
				</h1>
			</div>
			<div className="my-3">
				<h1 className="text-red-500 text-center text-lg font-light">
					{error?.message}
				</h1>
			</div>
			<div className="mb-3">
				<label htmlFor="name" className="block font-light">
					name
				</label>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rounded-lg w-full"
					placeholder="Name"
					onChange={(e) => {
						e.preventDefault();
						setFormState({ ...formState, name: e.target.value });
					}}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="description" className="block font-light">
					description
				</label>
				<textarea
					className="bg-gray-300 px-3 py-3 rounded-lg w-full"
					rows={6}
					placeholder="Description"
					onChange={(e) => {
						e.preventDefault();
						setFormState({ ...formState, description: e.target.value });
					}}
				/>
			</div>
			<ImageUpload
				setImageFile={setImageFile}
				uploadError={uploadError}
				name="image"
				uploadImage={uploadImage}
				uploadProgress={uploadProgress}
				image={formState.image}
			/>
			<ImageUpload
				setImageFile={setBannerImageFile}
				uploadError={uploadBannerError}
				name="banner image"
				uploadImage={uploadBannerImage}
				uploadProgress={uploadBannerProgress}
				image={formState.bannerImage}
			/>
			<div className="w-full my-3 flex justify-center">
				<button
					className="bg-green-500 rounded-full font-bold text-white px-3 py-2 text-xl hover:bg-green-300"
					onClick={(e) => {
						e.preventDefault();
						createVenue({
							variables: {
								createVenueName: formState.name,
								createVenueImage: formState.image,
								createVenueDescription: formState.description,
								createVenueBannerImage: formState.bannerImage,
							},
							refetchQueries: [GET_VENUE],
						});
					}}
				>
					{loading ? "...loading" : "Create"}
				</button>
			</div>
		</div>
	);
}
