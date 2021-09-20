import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import FeatureCard from "./features/FeatureCard";
import Loading from "./Loading";

interface NewFeatureInterface {
	name: string;
	daysOfWeek: number[];
}

export default function Features() {
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

	// state vars
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const [newFeatureState, setNewFeatureState] = useState<NewFeatureInterface>({
		name: "",
		daysOfWeek: [],
	});

	// mutation vars
	const [createFeature, { error, loading }] = useMutation(gql`
		mutation Mutation(
			$createFeatureCategoryName: String!
			$createFeatureCategoryDaysOfWeek: [Int]
		) {
			createFeatureCategory(
				name: $createFeatureCategoryName
				daysOfWeek: $createFeatureCategoryDaysOfWeek
			) {
				name
			}
		}
	`);

	// get the feature categories
	const {
		loading: loadingCat,
		error: errorCat,
		data,
	} = useQuery(GET_FEATURES_CATEGORIES);
	if (loadingCat) return <Loading />;
	if (errorCat) return <div>errorCat.message</div>;

	return (
		<div className="w-full">
			<h1 className="text-center w-full block text-primary text-3xl my-3">
				Manage Features
			</h1>
			<div className="w-full flex-wrap flex space-x-4 space-y-4 mx-3">
				{data &&
					data.featureCategories.map(
						(cat: { id: string; name: string; daysOfWeek: number[] }) => {
							return <FeatureCard key={cat.id} feature={cat} />;
						}
					)}
			</div>
			<div className="bg-white shadow-2xl rounded-xl mx-5">
				<h2 className="text-center mx-4 text-primary font-bold">
					Create New Feature Category
				</h2>
				<div className="mb-3 ml-5">
					<label htmlFor="newName" className="block font-light">
						Name
					</label>
					<input
						type="text"
						id="newName"
						value={newFeatureState.name}
						className="bg-gray-200 px-2 py-2 rounded-xl"
						onChange={(e) => {
							setNewFeatureState({ ...newFeatureState, name: e.target.value });
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
									checked={newFeatureState.daysOfWeek.includes(idx)}
									onChange={(e) => {
										let tempArr = [...newFeatureState.daysOfWeek];
										newFeatureState.daysOfWeek.includes(idx)
											? tempArr.splice(tempArr.indexOf(idx), 1)
											: tempArr.push(idx);
										setNewFeatureState({
											...newFeatureState,
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
							createFeature({
								variables: {
									createFeatureCategoryName: newFeatureState.name,
									createFeatureCategoryDaysOfWeek: [
										...newFeatureState.daysOfWeek,
									],
								},
								refetchQueries: [GET_FEATURES_CATEGORIES, "featureCategories"],
							});
						}}
					>
						{loading ? "...creating" : "create"}
					</button>
					<span className="font-light text-red-400 block">
						{error && error.message}
					</span>
				</div>
			</div>
		</div>
	);
}
