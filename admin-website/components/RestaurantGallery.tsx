import { gql, useMutation } from "@apollo/client";
import firebase from "firebase";
import React, { useState } from "react";
import RestaurantGalleryUpdate from "./gallery/RestaurantGalleryUpdate";

interface CreateInterface {
	description: string;
	imageFile: File | null;
	image: string;
	canCreate: boolean;
	uploadProgress: string;
	uploadError: string;
}

export default function Gallery() {
	// state for creating
	const [createState, setCreateState] = useState<CreateInterface>({
		description: "",
		imageFile: null,
		image: "",
		canCreate: false,
		uploadProgress: "",
		uploadError: "",
	});

	const GET_GALLERY_IMAGES = gql`
		query Query {
			restaurantGalleryImages {
				image
				description
				id
			}
		}
	`;

	// upload an image
	const uploadImage = (e: any) => {
		e.preventDefault();
		const imageStorageRef = firebase.storage().ref().child("images");

		// check for file
		if (createState.imageFile) {
			let uploadTask = imageStorageRef
				.child(createState.imageFile.name)
				.put(createState.imageFile);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// progress
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setCreateState({
						...createState,
						uploadProgress: `uploading: ${progress}%`,
					});
				},
				(error) => {
					setCreateState({
						...createState,
						uploadError: `error: ${error.message}`,
					});
				},
				() => {
					if (createState.imageFile) {
						setCreateState({
							...createState,
							image: `/images/${createState.imageFile.name}`,
							canCreate: true,
							uploadProgress: "complete",
						});
					}
				}
			);
		} else {
			setCreateState({ ...createState, uploadError: "Please Select a File!" });
		}
	};

	// mutation to create
	const [createGalleryImage, { error, loading }] = useMutation(gql`
    mutation Mutation($createRestaurantGalleryImageImage: String!, $createRestaurantGalleryImageDescription: String) {
        createRestaurantGalleryImage(image: $createRestaurantGalleryImageImage, description: $createRestaurantGalleryImageDescription) {
          image
          description
          id
        }
      }
	`);

	return (
		<div className="w-full">
			<h1 className="text-center text-primary font-bold text-3xl">Gallery</h1>
			<RestaurantGalleryUpdate />
			<div className="bg-white rounded-3xl shadow-lg px-5 py-5 w-2/5">
				<div className="ring-2 ring-primary rounded-xl px-5 py-5">
					<div className="text-center font-bold text-primary text-2xl">
						Create New
					</div>
					<div className="text-green-500 text-center font-light text-lg">
						{createState.uploadProgress}
					</div>
					<div className="text-red-500 text-center font-light text-lg">
						{createState.uploadError}
						{error?.message}
					</div>
					<div className="mb-2">
						<label htmlFor="createName" className="block font-light text-lg">
							description
						</label>
						<textarea
							name="createName"
							id="createName"
							className="bg-gray-300 rounded-lg shadow-lg px-2 py-2 w-full focus:ring-primary"
							onChange={(e) => {
								setCreateState({ ...createState, description: e.target.value });
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
								setCreateState({
									...createState,
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
							className="bg-red-500 hover:bg-red-300 text-white font-bold px-2 py-2 rounded-full text-xl disabled:opacity-50"
							disabled={!createState.canCreate}
							onClick={(e) => {
								createGalleryImage({
									variables: {
										createRestaurantGalleryImageImage: createState.image,
										createRestaurantGalleryImageDescription: createState.description,
									},
									onCompleted: () => {
										setCreateState({
											...createState,
											canCreate: false,
											description: "",
											image: "",
											imageFile: null,
										});
									},
									refetchQueries: [GET_GALLERY_IMAGES, "Query"],
								});
							}}
						>
							{loading ? "...loading" : "Create"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
