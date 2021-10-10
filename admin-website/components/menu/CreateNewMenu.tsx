import { gql } from "@apollo/client";
import firebase from "firebase";
import React, { useState } from "react";
import MenuCategory from "./MenuCategory";
import MenuImage from "./MenuImage";
import MenuTextArea from "./MenuTextArea";
import MenuTextField from "./MenuTextField";
import MenuTypeField from "./MenuTypeField";

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

interface PropsInterface {
	setShowCreate: Function;
	setShowStatusModal: Function;
	dataCat: any;
	createMenuItem: Function;
}

export default function CreateNewMenu(props: PropsInterface) {
	const { setShowCreate, setShowStatusModal, dataCat, createMenuItem } = props;
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

	return (
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
							<MenuTextArea
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
	);
}
