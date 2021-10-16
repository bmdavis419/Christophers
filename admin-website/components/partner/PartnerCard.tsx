import { DocumentNode, gql, useMutation } from "@apollo/client";
import firebase from "firebase";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

interface PropsInterface {
	venueCard: {
		id: string;
		name: string;
		image: string;
		description: string;
		bannerImage: string;
	};
	GET_VENUE: DocumentNode;
}

export default function CateringFAQCard(props: PropsInterface) {
	const { venueCard, GET_VENUE } = props;
	const [canUpdate, setCanUpdate] = useState(false);

	// form state
	const [formState, setFormState] = useState({ ...venueCard });
	console.log(formState);

	// create the mutations
	const [updateVenue, { loading, error }] = useMutation(gql`
		mutation (
			$updateVenueId: String!
			$name: String
			$image: String
			$description: String
			$bannerImage: String
		) {
			updatePartner(
				id: $updateVenueId
				name: $name
				image: $image
				description: $description
				bannerImage: $bannerImage
			) {
				name
				description
				image
				bannerImage
			}
		}
	`);
	const [removeVenue] = useMutation(gql`
		mutation UpdateVenueMutation($removeVenueId: ID!) {
			removePartner(id: $removeVenueId)
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
					setCanUpdate(true);
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
					setCanUpdate(true);
				}
			);
		}
	};

	return (
		<div className="w-3/4 rounded-xl shadow-lg p-4">
			<div className="my-3">
				<h1 className="font-bold text-primary text-2xl text-center">
					Update Partner
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
					value={formState.name}
					onChange={(e) => {
						e.preventDefault();
						setFormState({ ...formState, name: e.target.value });
						setCanUpdate(true);
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
					value={formState.description}
					onChange={(e) => {
						e.preventDefault();
						setFormState({ ...formState, description: e.target.value });
						setCanUpdate(true);
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
					className="bg-green-500 rounded-full font-bold text-white px-3 py-2 text-xl hover:bg-green-300 disabled:opacity-50"
					disabled={!canUpdate}
					onClick={(e) => {
						e.preventDefault();
						updateVenue({
							variables: {
								updateVenueId: formState.id,
								name: formState.name,
								image: formState.image,
								description: formState.description,
								bannerImage: formState.bannerImage,
							},
							refetchQueries: [GET_VENUE],
						});
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
			</div>
			<div className="w-full my-3 flex justify-center">
				<button
					className="bg-red-500 rounded-full font-bold text-white px-3 py-2 text-xl hover:bg-red-300 disabled:opacity-50"
					onClick={(e) => {
						e.preventDefault();
						removeVenue({
							variables: {
								removeVenueId: formState.id,
							},
							refetchQueries: [GET_VENUE],
						});
					}}
				>
					{loading ? "...loading" : "Delete"}
				</button>
			</div>
		</div>
	);
}
