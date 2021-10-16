import React from "react";
import Image from "next/image";

interface PropsInterface {
	image: string;
	removeImage: Function;
	setCanUpdate: Function;
}

export default function HomeBannerImageCard(props: PropsInterface) {
	return (
		<div className="bg-white rounded-xl p-5 mb-3">
			<div className="w-full flex justify-center">
				<Image src={props.image} width={400} height={150}></Image>
			</div>
			<div>{props.image}</div>
			<div className="w-full flex justify-center">
				<button
					className="bg-primary hover:bg-secondary rounded-full text-white font-bold px-3 py-2"
					onClick={(e) => {
						props.removeImage(props.image);
						props.setCanUpdate(true);
					}}
				>
					Remove
				</button>
			</div>
		</div>
	);
}
