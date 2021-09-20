import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import SubField from "./SubField";

interface PropsInterface {
	category: {
		name: string;
		id: string;
		subcategories: {
			name: string;
			id: string;
		}[];
	};
}

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

export default function CatCard(props: PropsInterface) {
	const { category } = props;
	const [categoryState, setCategoryState] = useState(category);
	const [canUpdate, setCanUpdate] = useState(false);
	const [newSubcategoryState, setNewSubcategoryState] = useState("");

	// create the mutations
	const [
		updateCategory,
		{ loading: loadingUpdateCategory, error: errorUpdateCategory },
	] = useMutation(gql`
		mutation Mutation($updateCategoryName: String!, $updateCategoryId: ID!) {
			updateCategory(name: $updateCategoryName, id: $updateCategoryId) {
				name
			}
		}
	`);

	const [
		deleteCategory,
		{ loading: loadingDeleteCategory, error: errorDeleteCategory },
	] = useMutation(gql`
		mutation DeleteCategoryMutation($deleteCategoryId: ID!) {
			deleteCategory(id: $deleteCategoryId)
		}
	`);

	const [
		createSubcategory,
		{ loading: loadingCreateSub, error: errorCreateSub },
	] = useMutation(gql`
		mutation CreateSubcategoryMutation(
			$createSubcategoryName: String!
			$createSubcategoryCategory: ID!
		) {
			createSubcategory(
				name: $createSubcategoryName
				category: $createSubcategoryCategory
			) {
				id
			}
		}
	`);

	return (
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={categoryState.name}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCategoryState({ ...categoryState, name: e.target.value });
					}}
				/>
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateCategory({
							variables: {
								updateCategoryName: categoryState.name,
								updateCategoryId: categoryState.id,
							},
						});
					}}
				>
					{loadingUpdateCategory ? "...loading" : "Update"}
				</button>
				{categoryState.subcategories.length == 0 && (
					<button
						className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-red-400"
						onClick={(e) => {
							e.preventDefault();
							if (categoryState.subcategories.length == 0) {
								deleteCategory({
									variables: {
										deleteCategoryId: category.id,
									},
									refetchQueries: [GET_CATEGORIES, "categories"],
								});
							}
						}}
					>
						{loadingDeleteCategory ? "...deleting" : "Delete"}
					</button>
				)}
				<div className="text-red-500 font-bold text-xs block">
					{errorUpdateCategory?.message}
					{errorDeleteCategory?.message}
				</div>
			</div>
			<div>
				{category.subcategories.map((sub) => {
					return (
						<SubField subcategory={sub} catID={category.id} key={sub.id} />
					);
				})}
				<div>
					<input
						type="text"
						className="bg-gray-300 px-3 py-3 rouned-lg"
						value={newSubcategoryState}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setNewSubcategoryState(e.target.value);
						}}
					/>
					<button
						className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
						onClick={(e) => {
							e.preventDefault();
							if (newSubcategoryState !== "") {
								createSubcategory({
									variables: {
										createSubcategoryName: newSubcategoryState,
										createSubcategoryCategory: category.id,
									},
									refetchQueries: [GET_CATEGORIES, "categories"],
								});
							}
						}}
					>
						{loadingCreateSub ? "...creating" : "Add New"}
					</button>
				</div>
				<div className="text-red-500 font-bold text-xs block">
					{errorCreateSub?.message}
				</div>
			</div>
		</div>
	);
}
