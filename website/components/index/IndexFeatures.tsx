import React, { useState } from "react";
import Image from "next/image";

interface PropsInterface {
	homepageFeatures: [
		{
			id: string;
			title: string;
			description: string;
			topLinkText: string;
			topLink: string;
			bottomLinkText: string;
			bottomLink: string;
			image: string;
		}
	];
}
export default function IndexFeatures(props: PropsInterface) {
	const { homepageFeatures } = props;
	let circles: any = [];

	const [index, setIndex] = useState(0);
	function setActiveFeature(e: React.MouseEvent, i: number) {
		e.preventDefault();
		setIndex(i);
	}
	if (homepageFeatures.length > 1) {
		for (let i: number = 0; i < homepageFeatures.length; i++) {
			circles.push(
				<div
					onClick={(e) => {
						setActiveFeature(e, i);
					}}
					className={`rounded-full mt-auto m-2 lg:m-3 p-3 xl:p-4 2xl:p-5 bg-${
						index == i ? "primary" : "gray-400"
					}`}
					key={i}
				></div>
			);
		}
	}

	return (
		<div className="overflow-hidden relative md:rounded-50px w-full max-h-144 h-144 grid sm:grid-cols-2 justify-evenly filter drop-shadow-xl bg-gray-50">
			<div className="h-144 relative w-full">
				<Image
					layout="fill"
					objectFit="fill"
					src={homepageFeatures[index].image}
					alt="Image of featured dish"
				/>
			</div>
			<div className="align-center h-144 text-white sm:text-black sm:pt-12 bg-black bg-opacity-60 sm:bg-transparent sm:bg-opacity-100 p-4 space-y-2 xl:space-y-4 2xl:space-y-4 h-4/5vw flex flex-col text-center lg:w-2/3 mx-auto">
				<Image
					className="max-h-144 relative visible sm:invisible mix-blend-multiply"
					objectFit="fill"
					layout="fill"
					src={homepageFeatures[index].image}
					alt="Menu Header Background Image"
				/>
				<div className="flex items-center justify-center h-100">
					<div>
						<h1 className="relative mix-blend normal text-3xl font-bold mb-5">
							{homepageFeatures[index].title}
						</h1>
						<p className="relative mix-blend normal text-sm xl:text-xl mb-5">
							{homepageFeatures[index].description}
						</p>
						<div className="grid grid-cols-1 2xl:grid-cols-2 gap-2 2xl:gap-16 mb-5">
							<button className="relative mix-blend normal w-40  m-auto 2xl:text-xl rounded-full py-2 2xl:py-2 bg-primary text-white">
								{homepageFeatures[index].topLinkText}
							</button>
							<button className="relative mix-blend normal w-40  m-auto 2xl:text-xl rounded-full py-2 2xl:py-2 bg-primary text-white">
								{homepageFeatures[index].bottomLinkText}
							</button>
						</div>
						<div className="relative mix-blend normal flex flex-row self-end mx-auto">
							{circles}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
