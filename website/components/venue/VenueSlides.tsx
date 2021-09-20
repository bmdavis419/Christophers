import React from "react";
import Image from "next/image";

interface PropsInterface {
	activeVenue: number;
	numVenues: number;
	setActiveVenue: Function;
	venue: {
		name: string;
		description: string;
		image: string;
	};
}
export default function VenueSlides(props: PropsInterface) {
	const { activeVenue, numVenues, setActiveVenue, venue } = props;
	let circles: any = [];
	for (let i: number = 0; i < numVenues; i++) {
		circles.push(
			<div
				onClick={(e) => {
					setActiveVenue(e, i);
				}}
				className={`rounded-full mt-auto m-2 lg:m-3 p-3 xl:p-4 2xl:p-5 bg-${
					activeVenue == i ? "primary" : "gray-400"
				}`}
			></div>
		);
	}
	return (
		<div className="grid grid-cols-1 xl:grid-cols-2">
			<h1 className="col-span-2 text-center text-primary text-6xl m-2 mb-8">
				{venue.name}
			</h1>
			<div className="flex flex-col justify-center align-center">
				<div className="relative bg-black bg-opacity-60 xl:rounded-50px xl:h-1/3vw h-100vw w-100vw xl:w-1/3vw mx-auto">
					<Image
						className="mix-blend-multiply xl:mix-blend-normal relative"
						objectFit="fill"
						layout="fill"
						src={venue.image}
						alt="Venue banner image"
					/>
				</div>
			</div>
			{/*Add ternery operator to control text size to make sure it fits based on character length, on sm > 400 characters should be shrunk*/}
			<p
				className={`relative text-center w-full md:w-10/12 lg:w-2/3 m-auto text-xl text-white xl:text-black`}
			>
				{venue.description}
			</p>
			<div className="relative mix-blend normal flex flex-row self-end mx-auto col-span-2 m-4">
				{circles}
			</div>
		</div>
	);
}
