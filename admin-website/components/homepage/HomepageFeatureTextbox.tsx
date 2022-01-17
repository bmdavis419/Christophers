import React from "react";

interface PropsInterface {
	displayName: string;
	dbName: string;
	value: string;
	updateFunction: Function;
	updateFunctionData: any;
}

export default function HomepageFeatureTextbox(props: PropsInterface) {
	const { displayName, dbName, value, updateFunction, updateFunctionData } =
		props;

	return (
		<div className="mb-2 w-full">
			<label htmlFor={dbName} className="block font-light">
				{displayName}
			</label>
			<input
				type="text"
				className="bg-white shadow-inner rounded-lg w-full px-2 py-1 border-black"
				id={dbName}
				value={value}
				onChange={(e) => {
					e.preventDefault();
					updateFunction({ ...updateFunctionData, [dbName]: e.target.value });
				}}
			/>
		</div>
	);
}
