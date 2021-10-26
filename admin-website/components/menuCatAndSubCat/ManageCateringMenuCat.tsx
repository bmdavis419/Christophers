import { DocumentNode } from "graphql";
import React from "react";
import CatCard from "./CatCard";

interface PropsInterface {
	categories: {
		name: string;
		id: string;
		subcategories: {
			name: string;
			id: string;
		}[];
	}[];
	GET_CATEGORIES: DocumentNode;
}

export default function ManageMenuCat(props: PropsInterface) {
	// get data from props
	const { categories, GET_CATEGORIES } = props;

	return (
		<>
			<div className="justify-center items-center flex overflow-x-auto overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none h-1/2 mt-32 p-10">
				<div className="relative my-6 mx-auto w-6/12">
					{/*content*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<h1 className="text-center font-bold text-4xl my-3">
							Manage Categories
						</h1>
						<div className="w-full">
							{categories &&
								categories.map((category) => {
									return (
										<CatCard
											category={category}
											key={category.id}
											GET_CATEGORIES={GET_CATEGORIES}
										/>
									);
								})}
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
}
