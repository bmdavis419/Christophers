import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading"
import VenueCard from "./venue/VenueCard"

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

    const [createVenue] = useMutation(gql`
    mutation Mutation($createVenueName: String!, $createVenueImage: String!, $createVenueDescription: String!) {
        createVenue(name: $createVenueName, image: $createVenueImage, description: $createVenueDescription) {
          id
          name
          image
          description
        }
      }
    `);

    const { loading, error, data } = useQuery(GET_VENUE);
    const [cards, setCards] = useState<any>([]);
    const [newCard, setNewCard] = useState({
		name: "",
		image: "",
		description: "",
    }); 
    const [canCreate, setCanCreate] = useState({
		name: false,
		image: false,
		description: false,
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
        <div>
            <div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Name"
					onChange={(e) => {
						setCanCreate({ ...canCreate, name: true });
						e.preventDefault();
						setNewCard({ ...newCard, name: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Image"
					onChange={(e) => {
						setCanCreate({ ...canCreate, image: true });
						e.preventDefault();
						setNewCard({ ...newCard, image: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Description"
					onChange={(e) => {
						setCanCreate({ ...canCreate, description: true });
						e.preventDefault();
						setNewCard({ ...newCard, description: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canCreate}
					onClick={(e) => {
						setCanCreate({
                            name: false,
                            image: false,
                            description: false
						});

						createVenue({
							variables: {
								createVenueName: newCard.name,
								createVenueImage: newCard.image,
								createVenueDescription: newCard.description,
							},
                        });
					}}
				>
					Create new Venue
				</button>
			</div>
		</div>
        {cards.map((card: {
				id: string
                name: string
                image: string
                description: string
			}) => {
				return (
					<VenueCard venueCard={card} key={card.id}/>
				)
			})}
        </div>
    )
}
