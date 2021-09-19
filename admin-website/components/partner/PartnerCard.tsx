import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	partnerCard: {
		id: string
        name: string
        image: string
        description: string
	};
}

export default function CateringFAQCard(props: PropsInterface) {
	const { partnerCard } = props;
	const [partnerState, setCateringFAQState] = useState(partnerCard);
	const [canUpdate, setCanUpdate] = useState(false);

	// create the mutations
	const [
		updatePartner,
		{ loading, error },
	] = useMutation(gql`
    mutation updatePartnerMutation($updatePartnerId: String!, $updatePartnerName: String, $updatePartnerDescription: String, $updatePartnerImage: String) {
        updatePartner(id: $updatePartnerId, name: $updatePartnerName, description: $updatePartnerDescription, image: $updatePartnerImage) {
          id
          name
          image
          description
        }
      }
	`);
	const [
		removePartner
	] = useMutation(gql`
    mutation updatePartnerMutation($removePartnerId: ID!) {
        removePartner(id: $removePartnerId)
      }
	`);


	return (
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={partnerState.name}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringFAQState({ ...partnerState, name: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={partnerState.image}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringFAQState({ ...partnerState, image: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={partnerState.description}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringFAQState({ ...partnerState, description: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updatePartner({
							variables: {
								updatePartnerId: partnerState.id,
								updatePartnerName: partnerState.name,
								updatePartnerImage: partnerState.image,
								updatePartnerDescription: partnerState.description,
							},
                        });
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
				<button
					className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						removePartner({
							variables: {
								removePartnerId: partnerState.id
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
