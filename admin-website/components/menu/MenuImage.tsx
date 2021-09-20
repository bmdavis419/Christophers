import React from "react";
import Image from "next/image";

interface PropsInterface {
	inputData: any;
	setImage: Function;
	uploadImage: Function;
	setInputData: Function;
}

export default function MenuImage(props: PropsInterface) {
	const { inputData, setImage, uploadImage, setInputData } = props;
	return (
		<div className="flex justify-center w-full">
			<div>
				<Image
					width={200}
					height={200}
					src={inputData.image}
					alt={inputData.name}
					className="rounded-lg"
				/>
				<label htmlFor="file" className="block">
					Upload New Image
				</label>
				<input
					type="file"
					name="file"
					id="file"
					onChange={(e) => {
						e.preventDefault();
						if (!e.target.files) return;
						setImage(e.target.files[0]);
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

				<button
					onClick={(e) => {
						e.preventDefault();
						setInputData({ ...inputData, image: "/images/DefaultItem.png" });
					}}
					className="bg-green-500 rounded-full hover:bg-green-200 px-3 py-2 font-bold text-white"
				>
					MAKE DEFAULT IMAGE
				</button>
			</div>
		</div>
	);
}
