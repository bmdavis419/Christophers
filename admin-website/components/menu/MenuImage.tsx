import React from "react";
import Image from "next/image";

interface PropsInterface {
	inputData: any;
	setInputData: Function;
}

export default function MenuImage(props: PropsInterface) {
	const { inputData, setInputData } = props;
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
				<input type="file" name="file" id="file" />
			</div>
		</div>
	);
}
