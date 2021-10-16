import firebase from "firebase";
import React, { useState } from "react";
import HomeBannerImageCard from "./HomeBannerImageCard";

interface PropsInterface {
	formState: {
		images: string[];
	};
	setFormState: Function;
	setCanUpdate: Function;
}

export default function HomeBannerImages(props: PropsInterface) {
	const { formState, setFormState, setCanUpdate } = props;

	const removeImage = (image: string) => {
		let images = [...formState.images];
		const index = images.indexOf(image);
		images.splice(index, 1);
		setFormState({ ...formState, images: images });
	};

	// upload an image
	const [imageFile, setImageFile] = useState<null | File>(null);
	const [uploadProgress, setUploadProgress] = useState("");
	const [uploadError, setUploadError] = useState<null | string>();
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
					let images = [...formState.images];
					images.push(`/images/${imageFile.name}`);
					setCanUpdate(true);
					setFormState({ ...formState, images: images });
				}
			);
		}
	};

	return (
		<div className="w-full px-7">
			<div className="text-center font-bold text-primary text-2xl">
				Banner Images
			</div>
			<div className="grid grid-cols-3 bg-gray-300 bg-opacity-50 p-5 gap-4 rounded-xl">
				{formState.images &&
					formState.images.map((image) => {
						return (
							<HomeBannerImageCard
								image={image}
								removeImage={removeImage}
								setCanUpdate={setCanUpdate}
							/>
						);
					})}
				<div className="bg-white rounded-xl p-5 mb-3">
					<label htmlFor="file" className="block">
						Upload New Image
					</label>
					<div className="text-green-500 font-light">{uploadProgress}</div>
					<div className="text-red-500 font-light">{uploadError}</div>
					<input
						type="file"
						name="file"
						id="file"
						onChange={(e) => {
							e.preventDefault();
							if (!e.target.files) return;
							setImageFile(e.target.files[0]);
						}}
					/>
					<button
						onClick={(e) => {
							e.preventDefault();
							uploadImage(e);
						}}
						className="bg-primary rounded-full hover:bg-secondary px-3 py-2 font-bold text-white"
					>
						UPLOAD
					</button>
				</div>
			</div>
		</div>
	);
}
