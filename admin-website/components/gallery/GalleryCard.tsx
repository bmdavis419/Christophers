import { gql, useMutation } from "@apollo/client";
import firebase from "firebase";
import React, { useState } from "react";
import Image from "next/image";

interface PropsInterface {
	image: string;
	description: string;
	id: string;
}

interface UpdateInterface {
	description: string;
	imageFile: File | null;
	image: string;
	uploadProgress: string;
	uploadError: string;
	id: string;
}

export default function GalleryCard(props: PropsInterface) {
	// get from props
	const { image, description, id } = props;

	// get all of the current gallery items
	const GET_GALLERY_IMAGES = gql`
		query Query {
			galleryImages {
				image
				description
				id
			}
		}
	`;

	// state for updating
	const [updateState, setUpdateState] = useState<UpdateInterface>({
		description: description,
		imageFile: null,
		image: image,
		uploadProgress: "",
		uploadError: "",
		id: id,
	});

	// upload an image
	const uploadImage = (e: any) => {
		e.preventDefault();
		const imageStorageRef = firebase.storage().ref().child("images");

		// check for file
		if (updateState.imageFile) {
			let uploadTask = imageStorageRef
				.child(updateState.imageFile.name)
				.put(updateState.imageFile);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// progress
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setUpdateState({
						...updateState,
						uploadProgress: `uploading: ${progress}%`,
					});
				},
				(error) => {
					setUpdateState({
						...updateState,
						uploadError: `error: ${error.message}`,
					});
				},
				() => {
					if (updateState.imageFile) {
						setUpdateState({
							...updateState,
							image: `/images/${updateState.imageFile.name}`,
							uploadProgress: "complete",
						});
					}
				}
			);
		} else {
			setUpdateState({ ...updateState, uploadError: "Please Select a File!" });
		}
	};

	// mutation to update
	const [updateGalleryImage, { error, loading }] = useMutation(gql`
		mutation UpdateGalleryImageMutation(
			$updateGalleryImageId: ID!
			$updateGalleryImageDescription: String
			$updateGalleryImageImage: String
		) {
			updateGalleryImage(
				id: $updateGalleryImageId
				description: $updateGalleryImageDescription
				image: $updateGalleryImageImage
			) {
				image
				description
				id
			}
		}
	`);

	// mutation to delete
	const [deleteGalleryImage, { error: errorDelete, loading: loadingDelete }] =
		useMutation(gql`
			mutation DeleteGalleryImageMutation($deleteGalleryImageId: ID!) {
				deleteGalleryImage(id: $deleteGalleryImageId)
			}
		`);

	return (
		<div className="bg-white rounded-3xl shadow-lg px-5 py-5 mb-3">
			<div className="ring-2 ring-primary rounded-xl px-5 py-5">
				<div className="text-center font-bold text-primary text-2xl">
					Update
				</div>
				<div className="text-green-500 text-center font-light text-lg">
					{updateState.uploadProgress}
				</div>
				<div className="text-red-500 text-center font-light text-lg">
					{updateState.uploadError}
					{error?.message}
					{errorDelete?.message}
				</div>
				<div className="mb-2 rounded-lg overflow-hidden">
					<Image
						src={updateState.image}
						alt={updateState.description}
						width={400}
						height={400}
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="createName" className="block font-light text-lg">
						description
					</label>
					<textarea
						name="createName"
						id="createName"
						className="bg-gray-300 rounded-lg shadow-lg px-2 py-2 w-full focus:ring-primary"
						value={updateState.description}
						onChange={(e) => {
							setUpdateState({ ...updateState, description: e.target.value });
						}}
					></textarea>
				</div>
				<div className="mb-2">
					<label htmlFor="createImage" className="block font-light text-lg">
						image
					</label>
					<input
						type="file"
						name="createImage"
						onChange={(e) => {
							e.preventDefault();
							if (!e.target.files) return;
							setUpdateState({
								...updateState,
								imageFile: e.target.files[0],
							});
						}}
					/>
				</div>
				<div className="mb-2 flex justify-between w-full px-12">
					<button
						className="bg-green-500 hover:bg-green-300 text-white font-bold px-2 py-2 rounded-full text-xl"
						onClick={uploadImage}
					>
						Upload
					</button>
					<button
						className="bg-red-500 hover:bg-red-300 text-white font-bold px-2 py-2 rounded-full text-xl"
						onClick={(e) => {
							deleteGalleryImage({
								variables: { deleteGalleryImageId: updateState.id },
								refetchQueries: [GET_GALLERY_IMAGES, "Query"],
							});
						}}
					>
						{loadingDelete ? "...loading" : "Delete"}
					</button>
					<button
						className="bg-red-500 hover:bg-red-300 text-white font-bold px-2 py-2 rounded-full text-xl disabled:opacity-50"
						onClick={(e) => {
							updateGalleryImage({
								variables: {
									updateGalleryImageId: updateState.id,
									updateGalleryImageDescription: updateState.description,
									updateGalleryImageImage: updateState.image,
								},
								refetchQueries: [GET_GALLERY_IMAGES, "Query"],
							});
						}}
					>
						{loading ? "...loading" : "Update"}
					</button>
				</div>
			</div>
		</div>
	);
}
