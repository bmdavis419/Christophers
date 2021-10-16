import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";
import PartnerCard from "./partner/PartnerCard";
import PartnerCreate from "./partner/PartnerCreate";

export default function Venue() {
	const GET_PARTNER = gql`
		{
			partners {
				id
				name
				image
				description
				bannerImage
			}
		}
	`;

	const { loading, error, data } = useQuery(GET_PARTNER);
	const [cards, setCards] = useState<any>([]);
	const [newCard, setNewCard] = useState({
		name: "",
		image: "",
		description: "",
		bannerImage: "",
	});

	useEffect(() => {
		if (data != undefined) {
			const temp = [...data.partners];
			setCards(temp);
		}
	}, [data]);

	// make sure there is data before render
	if (loading) return <Loading />;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="w-full">
			<div className="py-5">
				<h1 className="text-3xl font-bold text-primary text-center">Partner</h1>
			</div>
			<div className="w-full flex justify-center">
				<PartnerCreate
					formState={newCard}
					setFormState={setNewCard}
					GET_VENUE={GET_PARTNER}
				/>
			</div>
			{cards.map(
				(
					card: {
						id: string;
						name: string;
						image: string;
						description: string;
						bannerImage: string;
					},
					idx: number
				) => {
					return (
						<div className="flex w-full justify-center">
							<PartnerCard venueCard={card} key={idx} GET_VENUE={GET_PARTNER} />
						</div>
					);
				}
			)}
		</div>
	);
}
