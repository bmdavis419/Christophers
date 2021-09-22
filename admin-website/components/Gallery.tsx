import firebase from "firebase";
import React, { useState } from "react";

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
						});
					}
				}
			);
		}
	};

	return (
		<div>
			<h1 className="text-center text-primary font-bold text-3xl">Gallery</h1>
			<div className="bg-white rounded-3xl shadow-lg px-5 py-5">
				<div className="ring-2 ring-primary rounded-xl px-5 py-5">
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
						<button className="bg-green-500 hover:bg-green-300 text-white font-bold px-2 py-2 rounded-full text-xl">
							Upload
						</button>
						<button
							className="bg-red-500 hover:bg-red-300 text-white font-bold px-2 py-2 rounded-full text-xl disabled:opacity-50"
							disabled={!createState.canCreate}
						>
							Create
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
