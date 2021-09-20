import React from "react";
import Image from "next/image";

interface PropsInterface {
	pic: string;
	index: number;
	description: string;
}

export default function GalleryImage(props: PropsInterface) {
	const { pic, index, description } = props;
	return (
		<div
			className={`hover:bg-black rounded-40 overflow-hidden hover:bg-opacity-60 h-300 w-300 md:h-550 md:w-550 relative lg:justify-self-${
				index % 2 == 0 ? "end" : "start"
			}`}
		>
			<Image
				className="mix-blend-multiply"
				src={pic}
				alt="bruh"
				layout="fill"
			/>
			<div className="text-sm md:text-lg text-center absolute opacity-0 md:hover:opacity-100 w-300 h-300 md:h-550 md:w-550 text-white flex items-center">
				<div className="w-full text-center">{description}</div>
			</div>
		</div>
	);
}
