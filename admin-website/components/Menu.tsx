import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";
import React, { useEffect, useState } from "react";
import MenuItemCard from "./menu/MenuItemCard";

export default function Menu() {
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
				isOldImage
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
	} = useQuery(gql`
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
	`);

	const [menuItems, setMenuItems] = useState<any>([]);

	// fill the menu items
	useEffect(() => {
		if (data.menuItems) {
			const temp = [...data.menuItems];
			temp.sort(alphabetize);
			setMenuItems(temp);
		}
	}, [data]);

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
			{menuItems.map(
				(menuItem: {
					name: string;
					id: string;
					description: string;
					price: string;
					image: string;
					type: number;
					isFeature: boolean;
					isOldImage: boolean;
					category: { id: string; name: string };
					subcategory: { name: string; id: string };
				}) => {
					return (
						<MenuItemCard
							menuItem={menuItem}
							key={menuItem.id}
							categories={dataCat.categories}
						/>
					);
				}
			)}
		</div>
	);
}
