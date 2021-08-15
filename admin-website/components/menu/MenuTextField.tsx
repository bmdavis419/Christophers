import React from "react";

interface PropsInterface {
	inputData: any;
	setInputData: Function;
	item: string;
}

export default function MenuTextField(props: PropsInterface) {
	const { setInputData, inputData, item } = props;

	return (
		<div className="mb-3">
			<label htmlFor={item} className="block">
				{item}
			</label>
			<input
				type="text"
				className="w-full px-3 bg-gray-100 py-2 rounded-md"
				id={item}
				name={item}
				value={inputData[item]}
				onChange={(e) => {
					e.preventDefault();
					setInputData({ ...inputData, [item]: e.target.value });
				}}
			/>
		</div>
	);
}
