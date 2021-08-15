import React, { useEffect, useState } from "react";

interface PropsInterface {
	categories: [
		{
			name: string;
			id: string;
			subcategories: [
				{
					id: string;
					name: string;
				}
			];
		}
	];
	inputData: any;
	setInputData: Function;
}

export default function MenuCategory(props: PropsInterface) {
	const { categories, inputData, setInputData } = props;

	const [subDispaly, setSubDisplay] = useState(
		categories.map((category) => {
			if (category.id === inputData.category.id) {
				return category.subcategories.map((sub) => {
					return (
						<option value={sub.id} key={sub.id}>
							{sub.name}
						</option>
					);
				});
			}
		})
	);

	useEffect(() => {
		setSubDisplay(
			categories.map((category) => {
				if (category.id === inputData.category.id) {
					return category.subcategories.map((sub) => {
						return (
							<option value={sub.id} key={sub.id}>
								{sub.name}
							</option>
						);
					});
				}
			})
		);
	}, [props]);

	return (
		<div className="mb-3 flex justify-between">
			<div className="w-1/2 mx-2">
				<label htmlFor="category" className="block">
					category
				</label>
				<select
					name="category"
					id="category"
					defaultValue={inputData.category.id}
					className="rounded-md bg-gray-100 px-3 py-2 w-full"
					onChange={(e) => {
						e.preventDefault();
						setInputData({
							...inputData,
							category: { ...inputData.category, id: e.target.value },
						});
					}}
				>
					{categories.map((category) => {
						return (
							<option value={category.id} key={category.id}>
								{category.name}
							</option>
						);
					})}
				</select>
			</div>
			<div className="w-1/2 mx-2">
				<label htmlFor="subcategory">subcategory</label>
				<select
					name="subcategory"
					id="subcategory"
					defaultValue={inputData.subcategory.id}
					className="rounded-md bg-gray-100 px-3 py-2 w-full"
					onChange={(e) => {
						e.preventDefault();
						setInputData({
							...inputData,
							subcategory: { ...inputData.subcategory, id: e.target.value },
						});
					}}
				>
					{subDispaly}
				</select>
			</div>
		</div>
	);
}
