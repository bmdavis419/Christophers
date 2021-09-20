import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

interface PropsInterface {
	subcategory: {
		name: string;
		id: string;
	};
	catID: string;
}

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

export default function SubField(props: PropsInterface) {
	const { subcategory, catID } = props;

	// state
	const [subcategoryState, setSubcategoryState] = useState(subcategory);
	const [canUpdate, setCanUpdate] = useState(false);

	// mutation
	const [updateSub, { loading: loadingUpdateSub, error: errorUpdateSub }] =
		useMutation(gql`
			mutation UpdateSubcategoryMutation(
				$updateSubcategoryName: String!
				$updateSubcategoryId: ID!
			) {
				updateCateringSubcategory(
					name: $updateSubcategoryName
					id: $updateSubcategoryId
				) {
					name
				}
			}
		`);
	const [deleteSub, { loading: loadingDeleteSub, error: errorDeleteSub }] =
		useMutation(gql`
			mutation DeleteSubcategoryMutation(
				$deleteSubcategoryId: ID!
				$deleteSubcategoryCatId: ID!
			) {
				deleteCateringSubcategory(
					id: $deleteSubcategoryId
					catID: $deleteSubcategoryCatId
				)
			}
		`);

	return (
		<div className="mb-4">
			<input
				type="text"
				className="bg-gray-300 px-3 py-3 rouned-lg"
				value={subcategoryState.name}
				onChange={(e) => {
					e.preventDefault();
					setCanUpdate(true);
					setSubcategoryState({ ...subcategoryState, name: e.target.value });
				}}
			/>
			<button
				className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
				disabled={!canUpdate}
				onClick={(e) => {
					setCanUpdate(false);

					updateSub({
						variables: {
							updateSubcategoryName: subcategoryState.name,
							updateSubcategoryId: subcategory.id,
						},
					});
				}}
			>
				{loadingUpdateSub ? "...loading" : "Update"}
			</button>
			<button
				className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-red-400"
				onClick={(e) => {
					e.preventDefault();
					deleteSub({
						variables: {
							deleteSubcategoryId: subcategory.id,
							deleteSubcategoryCatId: catID,
						},
						refetchQueries: [GET_CATEGORIES, "cateringCategories"],
					});
				}}
			>
				{loadingDeleteSub ? "...deleting" : "Delete"}
			</button>
			<div className="text-red-500 font-bold text-xs block">
				{errorUpdateSub}
				{errorDeleteSub}
			</div>
		</div>
	);
}
