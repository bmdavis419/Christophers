import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";
import React, { useEffect, useState } from "react";
import CatCard from "./menuCatAndSubCat/CatCard";
import CateringMenuItemCard from "./cateringMenu/CateringMenuItemCard";
import CreateNewCateringMenuItem from "./cateringMenu/CreateNewCateringMenuItem";

export default function CateringMenu() {
	const GET_CATEGORIES = gql`
		{
			cateringCategories {
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
			cateringMenuItems {
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

	// read in the menu items
	const { loading, error, data } = useQuery(GET_MENU_ITEMS);

	const {
		loading: loadingCat,
		error: errorCat,
		data: dataCat,
	} = useQuery(GET_CATEGORIES);

	// state for menu items
	const [menuItems, setMenuItems] = useState<any>([]);

	// fill the menu items
	useEffect(() => {
		if (data != undefined) {
			const temp = [...data.cateringMenuItems];
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
				createCateringCategory(name: $createCategoryName) {
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
		) {
			createCateringMenuItem(
				name: $createMenuItemName
				category: $createMenuItemCategory
				subcategory: $createMenuItemSubcategory
				description: $createMenuItemDescription
				price: $createMenuItemPrice
				image: $createMenuItemImage
			) {
				id
				name
				description
				price
			}
		}
	`);

	// make sure there is data before render
	if (loading || loadingCat) return <Loading />;
	if (error) return <div>Error: {error.message}</div>;
	if (errorCat) return <div>Error: {errorCat.message}</div>;

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

	return (
		<div className="w-full px-5">
			<button
				onClick={(e) => {
					e.preventDefault();
					const temp = [...data.cateringMenuItems];
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
					const temp = [...data.cateringMenuItems];
					temp.sort(revAlphabetize);
					setMenuItems(temp);
				}}
				className="bg-primary px-5 py-3 hover:bg-secondary rounded-lg text-white m-5"
			>
				Reverse Alphabetize
			</button>
			<input
				type="text"
				className="bg-gray-300 rouned-lg px-3 py-4"
				placeholder="search"
				onChange={(e) => {
					e.preventDefault();
					const temp = data.cateringMenuItems.filter((item: any) => {
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
				<CreateNewCateringMenuItem
					setShowCreate={setShowCreate}
					setShowStatusModal={setShowStatusModal}
					createMenuItem={createMenuItem}
					dataCat={dataCat}
				/>
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
						category: { id: string; name: string }[];
						subcategory: { name: string; id: string }[];
					}) => {
						return (
							<CateringMenuItemCard
								menuItem={menuItem}
								key={menuItem.id}
								categories={dataCat.cateringCategories}
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
							dataCat.cateringCategories.map((category: any) => {
								return (
									<CatCard
										category={category}
										key={category.id}
										GET_CATEGORIES={GET_CATEGORIES}
									/>
								);
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
											refetchQueries: [GET_CATEGORIES],
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
