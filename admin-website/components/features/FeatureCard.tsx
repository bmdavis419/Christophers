import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

interface PropsInterface {
	feature: {
		id: string;
		name: string;
		daysOfWeek: number[];
	};
}

export default function FeatureCard(props: PropsInterface) {
	const { feature } = props;

	// GQL Query
	const GET_FEATURES_CATEGORIES = gql`
		query Query {
			featureCategories {
				id
				name
				daysOfWeek
			}
		}
	`;

	// fill state
	const [formState, setFormState] = useState(feature);

	// create the update mutation
	const [updateFeatureCat, { loading, error }] = useMutation(gql`
		mutation UpdateFeatureCategoryMutation(
			$updateFeatureCategoryId: ID!
			$updateFeatureCategoryDaysOfWeek: [Int]!
			$updateFeatureCategoryName: String!
		) {
			updateFeatureCategory(
				id: $updateFeatureCategoryId
				daysOfWeek: $updateFeatureCategoryDaysOfWeek
				name: $updateFeatureCategoryName
			) {
				id
				name
				daysOfWeek
			}
		}
	`);

	const [removeFeature, { error: errorRemove, loading: loadingRemove }] =
		useMutation(gql`
			mutation DeleteCateringSubcategoryMutation(
				$deleteFeatureCategoryId: ID!
			) {
				deleteFeatureCategory(id: $deleteFeatureCategoryId)
			}
		`);

	// days of week arr
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return (
		<div className="bg-white shadow-lg rounded-xl max-w-1/2 w-1/3">
			<h2 className="text-center mx-4 text-primary font-bold">
				Update Feature Category
			</h2>
			<div className="mb-3 ml-5 w-full">
				<label htmlFor="newName" className="block font-light">
					Name
				</label>
				<input
					type="text"
					id="newName"
					value={formState.name}
					className="bg-gray-200 px-2 py-2 rounded-xl w-3/4"
					onChange={(e) => {
						setFormState({ ...formState, name: e.target.value });
					}}
				/>
			</div>
			<div className="mb-3 ml-5">
				<h3>Days Available:</h3>
				{daysOfWeek.map((day, idx) => {
					return (
						<div key={idx} className="mb-2">
							<label htmlFor={`${day}New`}>{day}</label>
							<input
								className="ml-3"
								type="checkbox"
								id={`${day}New`}
								checked={formState.daysOfWeek.includes(idx)}
								onChange={(e) => {
									let tempArr = [...formState.daysOfWeek];
									formState.daysOfWeek.includes(idx)
										? tempArr.splice(tempArr.indexOf(idx), 1)
										: tempArr.push(idx);
									setFormState({
										...formState,
										daysOfWeek: [...tempArr],
									});
								}}
							/>
						</div>
					);
				})}
			</div>
			<div className="m-3 pb-3">
				<button
					className="bg-green-500 hover:bg-green-300 text-white px-2 py-2 rounded-full font-bold"
					onClick={(e) => {
						e.preventDefault();
						updateFeatureCat({
							variables: {
								updateFeatureCategoryId: formState.id,
								updateFeatureCategoryDaysOfWeek: [...formState.daysOfWeek],
								updateFeatureCategoryName: formState.name,
							},
						});
					}}
				>
					{loading ? "...updating" : "update"}
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						removeFeature({
							variables: { deleteFeatureCategoryId: formState.id },
							refetchQueries: [GET_FEATURES_CATEGORIES, "featureCategories"],
						});
					}}
					className="bg-red-500 hover:bg-red-300 text-white ml-3 px-2 py-2 rounded-full font-bold"
				>
					{loadingRemove ? "...removing" : "remove"}
				</button>
				<span className="font-light text-red-400 block">
					{error && error.message}
					{errorRemove && errorRemove.message}
				</span>
			</div>
		</div>
	);
}
