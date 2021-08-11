import React from "react";

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
}

export default function MenuItemCard(props: PropsInterface) {
	return <div>{props.menuItem.name}</div>;
}
