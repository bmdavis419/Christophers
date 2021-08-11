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

	// make sure there is data before render
	if (loading) return <Loading />;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			{data &&
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
						return <MenuItemCard menuItem={menuItem} />;
					}
				)}
		</div>
	);
}
