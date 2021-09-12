import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";
import React, { useEffect, useState } from "react";
import MenuItemCard from "./menu/MenuItemCard";
import ManageMenuCat from "./catAndSubCat/ManageMenuCat";
import CatCard from "./catAndSubCat/CatCard";

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

	// read in the menu items
	const { loading, error, data } = useQuery(gql`
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
	`);

	const {
		loading: loadingCat,
		error: errorCat,
		data: dataCat,
	} = useQuery(GET_CATEGORIES);

	const [menuItems, setMenuItems] = useState<any>([]);

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

	// state for creating a category
	const [newCatState, setNewCatState] = useState("");

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
		</div>
	);
}
