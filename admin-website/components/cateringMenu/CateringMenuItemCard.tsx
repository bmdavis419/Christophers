import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import "firebase/storage";
import firebase from "firebase/app";
import MenuCategory from "../menu/MenuCategory";
import MenuImage from "../menu/MenuImage";
import MenuTextField from "../menu/MenuTextField";
import CateringMenuPriceField from "./CateringMenuPriceField";

interface PropsInterface {
	menuItem: {
		name: string;
		id: string;
		description: string;
		price: string;
		image: string;
		category: {
			id: string;
			name: string;
		}[];
		subcategory: {
			name: string;
			id: string;
		}[];
	};
	categories: {
		name: string;
		id: string;
		subcategories: [
			{
				name: string;
				id: string;
			}
		];
	}[];
}

export default function MenuItemCard(props: PropsInterface) {
	// get the menu item from the props
	const { menuItem, categories } = props;

	const GET_MENU_ITEMS = gql`
		{
			menuItems {
				id
				name
				description
				price
				image
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

	// get the state of components
	const [formState, setFormState] = useState({
		name: menuItem.name,
		description: menuItem.description,
		price: menuItem.price,
		image: menuItem.image,
		category: menuItem.category,
		subcategory: menuItem.subcategory,
		id: menuItem.id,
	});

	// mutation to update an item
	const UPDATE_MENU_ITEM = gql`
		mutation UpdateMenuItem(
			$id: ID!
			$name: String
			$category: [ID]
			$subcategory: [ID]
			$description: String
			$price: String
			$image: String
		) {
			updateCateringMenuItem(
				id: $id
				name: $name
				category: $category
				subcategory: $subcategory
				description: $description
				price: $price
				image: $image
			) {
				name
				id
			}
		}
	`;
	const [updateMenuItem, { loading, error }] = useMutation(UPDATE_MENU_ITEM);

	// mutation to delte the item
	const DELETE_ITEM = gql`
		mutation RemoveMenuItemMutation(
			$removeMenuItemId: ID!
			$removeMenuItemSubcatId: [ID]!
		) {
			removeCateringMenuItem(
				id: $removeMenuItemId
				subcatID: $removeMenuItemSubcatId
			)
		}
	`;
	const [
		deleteMenuItem,
		{ loading: loadingDeleteMenu, error: errorDeleteMenu },
	] = useMutation(DELETE_ITEM);

	// get the input modal states
	const [showModal, setShowModal] = useState(false);
	const [showStatusModal, setShowStatusModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	// upload an image
	const [imageFile, setImageFile] = useState<null | File>(null);
	const [uploadProgress, setUploadProgress] = useState("");
	const [uploadError, setUploadError] = useState<null | string>();
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
					setUploadProgress(`uploading: ${progress}%`);
				},
				(error) => {
					setUploadError(`error: ${error.message}`);
				},
				() => {
					setFormState({ ...formState, image: `/images/${imageFile.name}` });
				}
			);
		}
	};

	return (
		<div className="my-3 shadow-lg w-full px-3 py-2 rounded-full">
			<div className="flex justify-between items-center px-5">
				<div className="inline-block">
					<span>{menuItem.name}</span>
				</div>
				<div className="inline-block">
					<CateringMenuPriceField
						formState={formState}
						setFormState={setFormState}
					/>

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
					<button
						className="rounded-full bg-red-500 p-2 inline ml-4 text-white hover:bg-red-300 hover:shadow-inner"
						title="edit"
						onClick={(e) => {
							e.preventDefault();
							setShowDeleteModal(true);
						}}
					>
						<svg
							className="w-6 h-6 inline mr-2"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clipRule="evenodd"
							/>
						</svg>
						delete item
					</button>
				</div>
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
								</div>
								{/*body*/}
								<div className="relative px-6 py-3">
									<div
										className={
											uploadError
												? "text-center w-full font-bold text-lg text-red-500"
												: "text-center w-full font-bold text-lg text-green-500"
										}
									>
										{uploadProgress}
										{uploadError}
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
										categories={categories}
									/>
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
											setShowModal(false);
											setUploadProgress("");
										}}
									>
										Close
									</button>
									<button
										className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={(e) => {
											e.preventDefault();
											setUploadProgress("");
											setShowModal(false);
											setShowStatusModal(true);
											updateMenuItem({
												variables: {
													id: menuItem.id,
													name: formState.name,
													description: formState.description,
													image: formState.image,
													category: formState.category.map((cat) => cat.id),
													subcategory: formState.subcategory.map(
														(sub) => sub.id
													),
													price: formState.price,
												},
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

			{showDeleteModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative my-6 mx-auto w-3/12">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-3xl font-semibold">Delete Item</h3>
								</div>
								{/*body*/}
								<div className="text-center">
									Are you sure you want to delete this item?{" "}
									<span className="font-bold italic block">
										THIS ACTION IS IRREVERSABLE
									</span>
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
									<button
										className="bg-green-500 hover:bg-green-200 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={(e) => {
											e.preventDefault();
											setShowDeleteModal(false);
										}}
									>
										No
									</button>
									<button
										className="bg-primary hover:bg-secondary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={async (e) => {
											e.preventDefault();
											setShowDeleteModal(false);
											setShowStatusModal(true);
											deleteMenuItem({
												variables: {
													removeMenuItemId: menuItem.id,
													removeMenuItemSubcatId: menuItem.subcategory.map(
														(sub) => sub.id
													),
												},
												refetchQueries: [GET_MENU_ITEMS, "menuItems"],
											});
										}}
									>
										Yes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
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
							{loading && "updating..."}
							{loadingDeleteMenu && "deleteing..."}
							{errorDeleteMenu && `error: ${errorDeleteMenu.message}`}
							{error && `error: ${error.message}`}
							{!loading &&
								!error &&
								!loadingDeleteMenu &&
								!errorDeleteMenu &&
								"done!"}
						</label>
					</div>
				</>
			) : null}
		</div>
	);
}
