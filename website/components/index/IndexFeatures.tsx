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
<div className="overflow-hidden relative md:rounded-50px w-full sm:h-1/2vw md:h-1/4vw md:mt-2 grid sm:grid-cols-2 justify-evenly filter drop-shadow-xl bg-black md:bg-gray-100 bg-opacity-60">
			<div className="sm:h-1/2vw md:h-1/3vw relative w-full">
				<Image
					layout="fill"
					objectFit="fill"
					src={homepageFeatures[index].image}
					alt="Image of featured dish"
				/>
			</div>
			<div className="text-white sm:text-black sm:pt-4 bg-opacity-60 sm:bg-transparent sm:bg-opacity-100 space-y-4 sm:h-1/2vw flex flex-col text-center w-full xl:w-2/3 mx-auto">
				<Image
					className="relative visible sm:invisible mix-blend-multiply"
					objectFit="fill"
					layout="fill"
					src={homepageFeatures[index].image}
					alt="Menu Header Background Image"
				/>
				<h1 className="relative mix-blend normal text-xl xl:text-2xl 2xl:text-3xl font-bold">
					{homepageFeatures[index].title}
				</h1>
				<p className="relative mix-blend normal text-sm 2xl:text-xl px-8 md:px-0 my-auto mx-auto">
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
	);
}
