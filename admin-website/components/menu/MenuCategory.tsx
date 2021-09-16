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

	// state for the checkboxes
	const [checkedArr, setCheckedArr] = useState(
		categories.map((cat) => {
			return inputData.category.some((cat2) => cat2.id === cat.id);
		})
	);

	return (
		<div className="mb-3">
			{categories &&
				categories.map((item, idx) => {
					return (
						<div className="flex justify-between" key={item.id}>
							<div className="w-1/2 mx-2" key={item.id}>
								<label htmlFor={item.id}>{item.name}</label>
								<input
									type="checkbox"
									id={item.id}
									// checked={inputData.category.some((cat) => cat.id === item.id)}
									checked={checkedArr[idx]}
									onChange={(e) => {
										if (checkedArr[idx]) {
											// make sure length is greater than 1
											if (inputData.category.length > 1) {
												// get the index of the checked item
												const idx2 = inputData.category.findIndex(
													(cat) => cat.id === item.id
												);

												// update the checked array
												let newArr = [...checkedArr];
												newArr[idx] = false;
												setCheckedArr([...newArr]);

												let tempSpliceCat = [...inputData.category];
												tempSpliceCat.splice(idx2, 1);

												let tempSpliceSub = [...inputData.subcategory];
												tempSpliceSub.splice(idx2, 1);

												// update the input data
												setInputData({
													...inputData,
													category: [...tempSpliceCat],
													subcategory: [...tempSpliceSub],
												});
											} else {
												alert("Must have at least one Category");
											}
										} else {
											let newArr = [...checkedArr];
											newArr[idx] = true;
											setCheckedArr(newArr);
											setInputData({
												...inputData,
												category: inputData.category.concat({
													name: item.name,
													id: item.id,
												}),
												subcategory: inputData.subcategory.concat({
													name: item.subcategories[0].name,
													id: item.subcategories[0].id,
												}),
											});
										}
									}}
								/>
							</div>
							{inputData.category.filter((cat) => cat.id === item.id).length >
								0 && (
								<div className="w-1/2 mx-2">
									<select
										name="subcategory"
										id={`subcategory-${item.id}`}
										value={
											inputData.subcategory[
												inputData.category.findIndex(
													(cat) => cat.id === item.id
												)
											].id
										}
										onChange={(e) => {
											// set the correct item in the subcat array
											const idx2 = inputData.category.findIndex(
												(cat) => cat.id === item.id
											);

											let newArr = [...inputData.subcategory];
											newArr[idx2] = {
												id: e.target.value,
												name: "Changed",
											};

											setInputData({ ...inputData, subcategory: [...newArr] });
										}}
									>
										{item.subcategories.map((subItem) => {
											return (
												<option value={subItem.id} key={subItem.id}>
													{subItem.name}
												</option>
											);
										})}
									</select>
								</div>
							)}
						</div>
					);
				})}
		</div>
	);
}
