import React, { useState } from "react";
import MenuCategory from "./MenuCategory";
import MenuImage from "./MenuImage";
import MenuTextField from "./MenuTextField";
import MenuTypeField from "./MenuTypeField";

interface PropsInterface {
	menuItem: {
		name: string;
		id: string;
		description: string;
		price: string;
		image: string;
		type: number;
		isOldImage: boolean;
		category: {
			id: string;
			name: string;
		};
		subcategory: {
			name: string;
			id: string;
		};
	};
	categories: [
		{
			name: string;
			id: string;
			subcategories: [
				{
					name: string;
					id: string;
				}
			];
		}
	];
}

export default function MenuItemCard(props: PropsInterface) {
	// get the menu item from the props
	const { menuItem, categories } = props;

	// get the state of components
	const [formState, setFormState] = useState({
		name: menuItem.name,
		description: menuItem.description,
		price: menuItem.price,
		image: menuItem.image,
		type: menuItem.type,
		category: menuItem.category,
		subcategory: menuItem.subcategory,
	});

	// get the input modal states
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="my-3 shadow-lg rounded-sm w-full px-3 py-2">
			<div>
				<span>{menuItem.name}</span>
				<button
					className="rounded-full bg-primary p-2 inline ml-4 text-white hover:bg-secondary hover:shadow-inner"
					title="edit"
					onClick={(e) => {
						e.preventDefault();
						setShowModal(true);
					}}
				>
					<svg
						className="w-6 h-6 inline mr-2"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
					</svg>
					edit
				</button>
			</div>
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative my-6 mx-auto w-6/12">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-3xl font-semibold">Edit Menu Item</h3>
									<button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
										<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className="relative px-6 py-3">
									<MenuTextField
										inputData={formState}
										setInputData={setFormState}
										item="name"
									/>
									<MenuTextField
										inputData={formState}
										setInputData={setFormState}
										item="price"
									/>
									<MenuTextField
										inputData={formState}
										setInputData={setFormState}
										item="description"
									/>
									<MenuTypeField type={formState} setType={setFormState} />
									<MenuCategory
										categories={categories}
										inputData={formState}
										setInputData={setFormState}
									/>
									<MenuImage
										inputData={formState}
										setInputData={setFormState}
									/>
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={(e) => {
											e.preventDefault();
											setShowModal(false);
										}}
									>
										Close
									</button>
									<button
										className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={(e) => {
											e.preventDefault();
										}}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</div>
	);
}
