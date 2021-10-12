import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";
import VenueCard from "./venue/VenueCard";
import VenueCreate from "./venue/VenueCreate";

export default function Venue() {
	const GET_VENUE = gql`
		{
			venues {
				id
				name
				image
				description
			}
		}
	`;

	const { loading, error, data } = useQuery(GET_VENUE);
	const [cards, setCards] = useState<any>([]);
	const [newCard, setNewCard] = useState({
		name: "",
		image: "",
		description: "",
		bannerImage: "",
	});

	useEffect(() => {
		if (data != undefined) {
			const temp = [...data.venues];
			setCards(temp);
		}
	}, [data]);

	// make sure there is data before render
	if (loading) return <Loading />;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="w-full">
			<div className="py-5">
				<h1 className="text-3xl font-bold text-primary text-center">Venue</h1>
			</div>
			<div className="w-full flex justify-center">
				<VenueCreate
					formState={newCard}
					setFormState={setNewCard}
					GET_VENUE={GET_VENUE}
				/>
			</div>
			{cards.map(
				(card: {
					id: string;
					name: string;
					image: string;
					description: string;
				}) => {
					return <VenueCard venueCard={card} key={card.id} />;
				}
			)}
		</div>
	);
}
