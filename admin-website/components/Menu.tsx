import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";
import React, { useEffect, useState } from "react";
import MenuItemCard from "./menu/MenuItemCard";
import ManageMenuCat from "./catAndSubCat/ManageMenuCat";
import CatCard from "./catAndSubCat/CatCard";
import MenuTextField from "./menu/MenuTextField";
import MenuCategory from "./menu/MenuCategory";
import MenuTypeField from "./menu/MenuTypeField";
import MenuImage from "./menu/MenuImage";
import firebase from "firebase";

interface FormStateInterface {
	name: string;
	description: string;
	price: string;
	image: string;
	type: number;
	category: { name: string; id: string }[];
	subcategory: { name: string; id: string }[];
	isFeature: boolean;
	featureID: string;
}

export default function Menu() {
	const GET_CATEGORIES = gql`
		{
			categories {
				name
				id
				subcategories {
					id
					name
				}
			}
		}
	`;

	const GET_MENU_ITEMS = gql`
		{
			menuItems {
				id
				name
				description
				price
				image
				type
				isFeature
				featureID
				category {
					id
					name
				}
				subcategory {
					id
					name
				}
			}
		}
	`;

	// read in the menu items
	const { loading, error, data } = useQuery(GET_MENU_ITEMS);

	// read in the feature categories
	const {
		loading: loadingFeature,
		error: errorFeature,
		data: dataFeature,
	} = useQuery(gql`
		query Query {
			featureCategories {
				name
				daysOfWeek
				id
			}
		}
	`);
	const {
		loading: loadingCat,
		error: errorCat,
		data: dataCat,
	} = useQuery(GET_CATEGORIES);

	// state for menu items
	const [menuItems, setMenuItems] = useState<any>([]);

	// get the state of components
	const [formState, setFormState] = useState<FormStateInterface>({
		name: "",
		description: "",
		price: "",
		image: "/images/DefaultItem.png",
		type: 1,
		category: [],
		subcategory: [],
		isFeature: false,
		featureID: "",
	});

	// fill the menu items
	useEffect(() => {
		if (data != undefined) {
			const temp = [...data.menuItems];
			temp.sort(alphabetize);
			setMenuItems(temp);
		}
	}, [data]);

	// state for modals
	const [showCat, setShowCat] = useState(false);
	const [showCreate, setShowCreate] = useState(false);

	// state for creating a category
	const [newCatState, setNewCatState] = useState("");

	// state for error and loading and upload
	const [showStatusModal, setShowStatusModal] = useState(false);

	// mutation
	const [createCategory, { loading: loadingCreateCat, error: errorCreateCat }] =
		useMutation(gql`
			mutation CreateCategoryMutation($createCategoryName: String!) {
				createCategory(name: $createCategoryName) {
					name
					id
					subcategories {
						id
					}
				}
			}
		`);

	const [
		createMenuItem,
		{ loading: loadingCreateMenuItem, error: errorCreateMenuItem },
	] = useMutation(gql`
		mutation CreateMenuItem(
			$createMenuItemName: String!
			$createMenuItemCategory: [ID]!
			$createMenuItemSubcategory: [ID]!
			$createMenuItemDescription: String!
			$createMenuItemPrice: String!
			$createMenuItemImage: String!
			$createMenuItemType: Int!
			$createMenuItemIsFeature: Boolean!
		) {
			createMenuItem(
				name: $createMenuItemName
				category: $createMenuItemCategory
				subcategory: $createMenuItemSubcategory
				description: $createMenuItemDescription
				price: $createMenuItemPrice
				image: $createMenuItemImage
				type: $createMenuItemType
				isFeature: $createMenuItemIsFeature
			) {
				id
				name
				description
				price
			}
		}
	`);

	// upload an image
	const [imageFile, setImageFile] = useState<null | File>(null);
	const [uploadProgressImage, setUploadProgressImage] = useState("");
	const [uploadErrorImage, setUploadErrorImage] = useState<null | string>();
	const uploadImage = (e: any) => {
		e.preventDefault();
		const imageStorageRef = firebase.storage().ref().child("images");

		// check for file
		if (imageFile) {
			let uploadTask = imageStorageRef.child(imageFile.name).put(imageFile);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// progress
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setUploadProgressImage(`uploading: ${progress}%`);
				},
				(error) => {
					setUploadErrorImage(`error: ${error.message}`);
				},
				() => {
					setFormState({ ...formState, image: `/images/${imageFile.name}` });
				}
			);
		}
	};

	// make sure there is data before render
	if (loading || loadingCat || loadingFeature) return <Loading />;
	if (error) return <div>Error: {error.message}</div>;
	if (errorCat) return <div>Error: {errorCat.message}</div>;
	if (errorFeature) return <div>Error: {errorFeature.message}</div>;

	// sorts
	const alphabetize = (a: any, b: any) => {
		const itemA = a.name.toUpperCase();
		const itemB = b.name.toUpperCase();

		let comp = 0;
		if (itemA > itemB) {
			comp = 1;
		} else {
			comp = -1;
		}
		return comp;
	};

	const revAlphabetize = (a: any, b: any) => {
		const itemA = a.name.toUpperCase();
		const itemB = b.name.toUpperCase();

		let comp = 0;
		if (itemA > itemB) {
			comp = -1;
		} else {
			comp = 1;
		}
		return comp;
	};

	const sortFeatures = (a: any, b: any) => {
		const itemA = a.isFeature;
		const itemB = b.isFeature;

		return itemA >= itemB ? -1 : 1;
	};

	return (
		<div className="w-full px-5">
			<button
				onClick={(e) => {
					e.preventDefault();
					const temp = [...data.menuItems];
					temp.sort(alphabetize);
					setMenuItems(temp);
				}}
				className="bg-primary px-5 py-3 hover:bg-secondary rounded-lg text-white m-5"
			>
				Alphabetize
			</button>
			<button
				onClick={(e) => {
					e.preventDefault();
					const temp = [...data.menuItems];
					temp.sort(revAlphabetize);
					setMenuItems(temp);
				}}
				className="bg-primary px-5 py-3 hover:bg-secondary rounded-lg text-white m-5"
			>
				Reverse Alphabetize
			</button>
			<button
				onClick={(e) => {
					e.preventDefault();
					const temp = [...data.menuItems];
					temp.sort(sortFeatures);
					setMenuItems(temp);
				}}
				className="bg-yellow-500 px-5 py-3 hover:bg-yellow-200 rounded-lg text-white m-5"
			>
				Sort Features
			</button>
			<input
				type="text"
				className="bg-gray-300 rouned-lg px-3 py-4"
				placeholder="search"
				onChange={(e) => {
					e.preventDefault();
					const temp = data.menuItems.filter((item: any) => {
						return item.name.includes(e.target.value);
					});
					setMenuItems(temp);
				}}
			/>
			<button
				onClick={(e) => {
					e.preventDefault();
					setShowCat(!showCat);
				}}
				className="bg-primary px-5 py-3 hover:bg-secondary rounded-lg text-white m-5"
			>
				{showCat ? "Manage Menu Items" : "Manage Categories and Subcategories"}
			</button>
			<button
				onClick={(e) => {
					e.preventDefault();
					setShowCreate(!showCreate);
				}}
				className="bg-green-500 px-5 py-3 hover:bg-green-300 rounded-lg text-white m-5"
			>
				Create New Menu Item
			</button>
			{showCreate ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative my-6 mx-auto w-6/12">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-3xl font-semibold">Edit Menu Item</h3>
								</div>
								{/*body*/}
								<div className="relative px-6 py-3">
									<div
										className={
											uploadErrorImage
												? "text-center w-full font-bold text-lg text-red-500"
												: "text-center w-full font-bold text-lg text-green-500"
										}
									>
										{uploadProgressImage}
										{uploadErrorImage}
									</div>
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
									<MenuCategory
										inputData={formState}
										setInputData={setFormState}
										categories={dataCat.categories}
									/>
									<MenuTypeField type={formState} setType={setFormState} />
									<MenuImage
										inputData={formState}
										setImage={setImageFile}
										uploadImage={uploadImage}
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
											setShowCreate(false);
											setUploadProgressImage("");
										}}
									>
										Close
									</button>
									<button
										className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={(e) => {
											e.preventDefault();
											setUploadProgressImage("");
											setShowCreate(false);
											setShowStatusModal(true);
											createMenuItem({
												variables: {
													createMenuItemName: formState.name,
													createMenuItemDescription: formState.description,
													createMenuItemImage: formState.image,
													createMenuItemCategory: formState.category.map(
														(cat) => cat.id
													),
													createMenuItemSubcategory: formState.subcategory.map(
														(sub) => sub.id
													),
													createMenuItemType: formState.type,
													createMenuItemPrice: formState.price,
													createMenuItemIsFeature: formState.isFeature,
												},
												refetchQueries: [GET_MENU_ITEMS, "menuItems"],
											});
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
			{!showCat ? (
				menuItems &&
				menuItems.map(
					(menuItem: {
						name: string;
						id: string;
						description: string;
						price: string;
						image: string;
						type: number;
						isFeature: boolean;
						isOldImage: boolean;
						category: { id: string; name: string }[];
						subcategory: { name: string; id: string }[];
					}) => {
						return (
							<MenuItemCard
								menuItem={menuItem}
								key={menuItem.id}
								categories={dataCat.categories}
								featureCategoires={dataFeature.featureCategories}
							/>
						);
					}
				)
			) : (
				<>
					<h1 className="text-center font-bold text-4xl my-3">
						Manage Categories
					</h1>
					<div className="w-full">
						{dataCat &&
							dataCat.categories.map((category: any) => {
								return <CatCard category={category} key={category.id} />;
							})}
						<div className="mb-10">
							<input
								type="text"
								className="bg-gray-300 px-3 py-3 rouned-lg"
								value={newCatState}
								onChange={(e) => {
									e.preventDefault();
									setNewCatState(e.target.value);
								}}
							/>
							<button
								className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
								onClick={(e) => {
									e.preventDefault();
									if (newCatState !== "") {
										createCategory({
											variables: {
												createCategoryName: newCatState,
											},
											refetchQueries: [GET_CATEGORIES, "categories"],
										});
									}
								}}
							>
								{loadingCreateCat ? "...creating" : "Add New"}
							</button>
						</div>
						<div className="text-red-500 font-bold text-xs block">
							{errorCreateCat}
						</div>
					</div>{" "}
				</>
			)}
			{showStatusModal ? (
				<>
					<div className="fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
						<input type="checkbox" className="hidden" id="footertoast" />
						<label
							className={
								error
									? "bg-red-500 close cursor-pointer flex items-start justify-between w-full p-2  h-24 rounded shadow-lg text-white"
									: "bg-green-500 close cursor-pointer flex items-start justify-between w-full p-2  h-24 rounded shadow-lg text-white"
							}
							title="close"
							htmlFor="footertoast"
							onClick={(e) => {
								e.preventDefault();
								setShowStatusModal(false);
							}}
						>
							{loadingCreateMenuItem && "...creating"}
							{!loadingCreateMenuItem && "done!"}
						</label>
					</div>
				</>
			) : null}
		</div>
	);
}
