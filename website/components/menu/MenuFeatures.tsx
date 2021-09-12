import React from "react";
import Image from "next/image";

interface PropsInterface {
	activeFeature: number;
	numFeatures: number;
	Feature: any;
	setActiveFeature: Function;
}
export default function MenuFeatures(props: PropsInterface) {
	const { activeFeature, numFeatures, Feature, setActiveFeature } = props;
	let circles: any = [];
	for (let i: number = 0; i < numFeatures; i++) {
		circles.push(
			<div
				onClick={(e) => {
					setActiveFeature(e, i);
				}}
				className={`rounded-full mt-auto m-2 lg:m-3 p-3 xl:p-4 2xl:p-5 bg-${
					activeFeature == i ? "primary" : "gray-400"
				}`}
			></div>
		);
	}
	if (!Feature.menuItem) return null;
	return (
		<div className="overflow-hidden relative md:rounded-50px w-full sm:h-1/2vw md:h-1/4vw md:mt-2 grid sm:grid-cols-2 justify-evenly filter drop-shadow-xl bg-gray-50">
			<div className="sm:h-1/2vw md:h-1/3vw relative w-full">
				<Image
					layout="fill"
					objectFit="fill"
					src={Feature.menuItem.image}
					alt="Image of featured dish"
				/>
			</div>
			<div className="text-white sm:text-black sm:pt-4 bg-black bg-opacity-60 sm:bg-transparent sm:bg-opacity-100 space-y-2 sm:h-1/2vw flex flex-col text-center xl:w-2/3 mx-auto">
				<Image
					className="relative visible sm:invisible mix-blend-multiply"
					objectFit="fill"
					layout="fill"
					src={Feature.menuItem.image}
					alt="Menu Header Background Image"
				/>
				<h1 className="relative mix-blend normal text-xl xl:text-2xl 2xl:text-3xl font-bold">
					{Feature.menuItem.name}
				</h1>
				<h2 className="relative mix-blend normal text-md xl:text-xl 2xl:text-3xl">
					{Feature.type}
				</h2>
				<p className="relative mix-blend normal text-sm 2xl:text-xl px-8 md:px-0 my-auto mx-auto">
					{Feature.menuItem.description}
				</p>
				<div className="relative mix-blend normal w-40 md:w-1/2 m-auto rounded-full p-2 bg-primary text-white hover:bg-secondary transition duration-500 ease-in-out cursor-pointer">
					Order Online
				</div>
				<div className="relative mix-blend normal flex flex-row mx-auto justify-end">
					{circles}
				</div>
			</div>
		</div>
	);
}
