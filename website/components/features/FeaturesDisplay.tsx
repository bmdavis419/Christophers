import React, { useState } from "react";
import Image from "next/image";

interface PropsInterface {
	featureCat: {
		name: string;
		id: string;
		menuItems: {
			name: string;
			price: string;
			description: string;
			image: string;
			type: number;
			id: string;
		}[];
	};
}

export default function FeaturesDisplay(props: PropsInterface) {
	const { featureCat } = props;

	// state for the index
	const [displayIdx, setDisplayIdx] = useState(0);

	return (
		<div className="flex justify-center my-8">
			<div className="bg-white rounded-2xl shadow-2xl md:w-2/3 w-5/6">
				<div className="text-center font-bold text-3xl text-primary my-2">
					{featureCat.name}
				</div>
				<div className="flex justify-center">
					<div className="relative group ">
						<Image
							width={400}
							height={400}
							className="rounded-xl"
							src={featureCat.menuItems[displayIdx].image}
							alt={featureCat.menuItems[displayIdx].name}
						/>
						<div className="absolute w-14 h-5 md:w-28 md:h-10 rounded-full bg-secondary top-2 text-sm md:text-lg left-2 text-white text-center ">
							<p className="md:mt-1.5">
								{featureCat.menuItems[displayIdx].type == 1
									? "Dine-in"
									: featureCat.menuItems[displayIdx].type == 0
									? "Both"
									: "Carryout"}
							</p>
						</div>
					</div>
				</div>
				<div className="pb-4">
					<div className="text-center font-bold text-xl text-primary my-2">
						{featureCat.menuItems[displayIdx].name}
					</div>
					<div className="text-center mb-2">
						{featureCat.menuItems[displayIdx].description}
					</div>
					<div className="justify-center flex items-center align-center">
						{featureCat.menuItems.length > 1 && (
							<svg
								className="w-8 h-8 block text-primary mr-4 hover:bg-primary hover:text-white cursor-pointer rounded-full"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								onClick={(e) => {
									e.preventDefault();
									if (displayIdx === 0) {
										setDisplayIdx(featureCat.menuItems.length - 1);
									} else {
										setDisplayIdx(displayIdx - 1);
									}
								}}
							>
								<path
									fillRule="evenodd"
									d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
									clipRule="evenodd"
								/>
							</svg>
						)}
						<a
							href="https://www.toasttab.com/christophers-restaurant-2318-e-dorothy-lane/v3"
							className="bg-primary rounded-full hover:bg-secondary px-3 py-2 text-white"
						>
							Order
							{featureCat.menuItems[displayIdx].price !== "" &&
								` - $${featureCat.menuItems[displayIdx].price}`}
						</a>
						{featureCat.menuItems.length > 1 && (
							<svg
								className="w-8 h-8 block text-primary ml-4 hover:bg-primary hover:text-white cursor-pointer rounded-full"
								fill="currentColor"
								onClick={(e) => {
									e.preventDefault();
									if (displayIdx === featureCat.menuItems.length - 1) {
										setDisplayIdx(0);
									} else {
										setDisplayIdx(displayIdx + 1);
									}
								}}
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
