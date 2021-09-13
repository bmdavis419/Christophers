import React, { useEffect, useState } from "react";

interface PropsInterface {
	categories: {
		name: string;
		id: string;
		subcategories: {
			id: string;
			name: string;
		}[];
	}[];
	inputData: {
		id: string;
		category: {
			name: string;
			id: string;
		}[];
		subcategory: {
			name: string;
			id: string;
		}[];
	};
	setInputData: Function;
}

export default function MenuCategory(props: PropsInterface) {
	const { categories, inputData, setInputData } = props;

	return (
		<div className="mb-3 flex justify-between">
			<div className="w-1/2 mx-2"></div>
			<div className="w-1/2 mx-2"></div>
		</div>
	);
}
