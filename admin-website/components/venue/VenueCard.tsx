import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	venueCard: {
		id: string
        name: string
        image: string
        description: string
	};
}

export default function CateringFAQCard(props: PropsInterface) {
	const { venueCard } = props;
	const [venueState, setCateringFAQState] = useState(venueCard);
	const [canUpdate, setCanUpdate] = useState(false);

	// create the mutations
	const [
		updateVenue,
		{ loading, error },
	] = useMutation(gql`
    mutation UpdateVenueMutation($updateVenueId: String!, $updateVenueName: String, $updateVenueDescription: String, $updateVenueImage: String) {
        updateVenue(id: $updateVenueId, name: $updateVenueName, description: $updateVenueDescription, image: $updateVenueImage) {
          id
          name
          image
          description
        }
      }
	`);
	const [
		removeVenue
	] = useMutation(gql`
    mutation UpdateVenueMutation($removeVenueId: ID!) {
        removeVenue(id: $removeVenueId)
      }
	`);


	return (
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={venueState.name}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringFAQState({ ...venueState, name: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={venueState.image}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringFAQState({ ...venueState, image: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={venueState.description}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringFAQState({ ...venueState, description: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateVenue({
							variables: {
								updateVenueId: venueState.id,
								updateVenueName: venueState.name,
								updateVenueImage: venueState.image,
								updateVenueDescription: venueState.description,
							},
                        });
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
				<button
					className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						removeVenue({
							variables: {
								removeVenueId: venueState.id
							},
						});
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
