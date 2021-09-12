import React from "react";
import { gql, useQuery } from "@apollo/client";
import MenuItem from "./MenuItem";

interface PropsInterface {
	id: String;
	name: String;
}
interface DataInterface {
	data: {
		subcategory: {
			menuItems: [
				{
					name: string;
					description: string;
					price: number;
					image: string;
					type: number;
					id: string;
				}
			];
			name: string;
		};
	};
}
export default function MenuBox(props: PropsInterface) {
	const { loading, error, data } = useQuery(GET_MENU_ITEMS, {
		variables: { id: props.id },
	});

	if (loading)
		return (
			<div className=" grid-cols-2 menu3col:grid-cols-3 menu4col:grid-cols-4 animate-pulse grid grid-flow-row gap-16 mb-16 mx-16">
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
				<div className="w-36 h-48 md:w-72 md:h-96 bg-gray-200 rounded-xl"></div>
			</div>
		);
	if (error) return <div>`Error! ${error}`</div>;
	return (
		<div className="min-h-screen grid-cols-2 menu2col:grid-cols-2 menu3col:grid-cols-3 menu4col:grid-cols-4 grid grid-flow-row  gap-16 mb-16 mx-4 md:mx-16">
			{data.subcategory.menuItems &&
				data.subcategory.menuItems.map((menuItem: any) => {
					return <MenuItem menuItem={menuItem} key={menuItem.id} />;
				})}
		</div>
	);
}
const GET_MENU_ITEMS = gql`
	query Subcategory($id: ID!) {
		subcategory(id: $id) {
			menuItems {
				name
				description
				price
				type
				image
				id
			}
		}
	}
`;
