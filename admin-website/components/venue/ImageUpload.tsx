import React from "react";

interface PropsInterface {
	setImageFile: Function;
	uploadError: string;
	uploadImage: any;
	uploadProgress: string;
	image: string;
	name: string;
}

export default function ImageUpload(props: PropsInterface) {
	// get data from props
	const {
		name,
		setImageFile,
		uploadError,
		uploadImage,
		uploadProgress,
		image,
	} = props;

	return (
		<div className="mb-3 bg-opacity-50 p-4 bg-gray-300 rounded-xl">
			<label htmlFor="image" className="block font-light">
				{name}
			</label>
			<input
				type="file"
				accept="image/*"
				onChange={(e) => {
					e.preventDefault();
					if (!e.target.files) return;
					setImageFile(e.target.files[0]);
				}}
			/>
			<span className="text-sm text-red-500 font-light block">
				{uploadError}
			</span>
			<div>
				<button
					className="inline-block bg-green-500 bg-opacity-90 shadow-lg rounded-full text-white font-bold px-3 py-2 hover:bg-opacity-100 mt-4"
					onClick={uploadImage}
				>
					{uploadProgress === "" ? "Upload" : `${uploadProgress}`}
				</button>
				{image ? (
					<svg
						className="inline-block w-10 h-10 text-green-500 ml-3"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				) : (
					<svg
						className="inline-block w-10 h-10 text-red-500 ml-3"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				)}
			</div>
		</div>
	);
}
