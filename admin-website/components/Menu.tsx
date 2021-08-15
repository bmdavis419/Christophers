import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";
import React from "react";
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

	// make sure there is data before render
	if (loading || loadingCat) return <Loading />;
	if (error) return <div>Error: {error.message}</div>;
	if (errorCat) return <div>Error: {errorCat.message}</div>;

	return (
		<div className="w-full px-5">
			{data &&
				dataCat &&
				data.menuItems.map(
					(menuItem: {
						name: string;
						id: string;
						description: string;
						price: string;
						image: string;
						type: number;
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
