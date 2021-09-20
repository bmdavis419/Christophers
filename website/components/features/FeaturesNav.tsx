import React from "react";

interface PropsInterface {
	displayIdx: number;
	setDisplayIdx: Function;
	featureCategories: {
		name: string;
		daysOfWeek: number[];
		id: string;
	}[];
}

export default function FeaturesNav(props: PropsInterface) {
	// get data from props
	const { displayIdx, setDisplayIdx, featureCategories } = props;

	// arr for days of the week
	const daysOfWeek = ["S", "M", "T", "W", "R", "F", "S"];

	return (
		<div className="flex justify-center w-full">
			<div className="md:mx-20 flex justify-center flex-wrap md:space-x-5 space-y-3">
				{featureCategories &&
					featureCategories.length > 0 &&
					featureCategories.map((fCat, idx) => {
						return (
							<button
								key={fCat.id}
								onClick={(e) => {
									e.preventDefault();
									setDisplayIdx(idx);
								}}
								className={`${
									displayIdx === idx && "ring-4 ring-primary ring-opacity-50"
								} rounded-full px-5 py-3 text-xl font-bold bg-primary text-white hover:cursor-pointer hover:bg-secondary`}
							>
								{fCat.name}
								<div className="flex justify-between">
									{daysOfWeek.map((day, idx2) => {
										return (
											<div
												className={`mx-1 ${
													fCat.daysOfWeek.includes(idx2)
														? "bg-primary text-white ring-2 ring-white ring-inset"
														: "bg-white text-primary"
												}  rounded-full w-7 h-7 text-center align-middle`}
												key={idx2}
											>
												{day}
											</div>
										);
									})}
								</div>
							</button>
						);
					})}
			</div>
		</div>
	);
}
