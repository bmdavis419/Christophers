import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

interface NewFeatureInterface {
	name: string;
	daysOfWeek: number[];
}

export default function Features() {
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

	return (
		<div>
			<h1>Manage Features</h1>
			<div>
				<div>
					<label htmlFor="newName">Name</label>
					<input
						type="text"
						id="newName"
						value={newFeatureState.name}
						onChange={(e) => {
							setNewFeatureState({ ...newFeatureState, name: e.target.value });
						}}
					/>
				</div>
				<div>
					{daysOfWeek.map((day, idx) => {
						return (
							<div key={idx}>
								<label htmlFor={`${day}New`}>{day}</label>
								<input
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
				<div>
					<button
						onClick={(e) => {
							e.preventDefault();
							createFeature({
								variables: {
									createFeatureCategoryName: newFeatureState.name,
									createFeatureCategoryDaysOfWeek: [
										...newFeatureState.daysOfWeek,
									],
								},
							});
						}}
					>
						Create
					</button>
				</div>
			</div>
		</div>
	);
}
