import React, { useState, useEffect } from "react";
import CateringHomeBannerCard from "./homepage/CateringHomeBannerCard"
import CateringHomepageCard from "./homepage/CateringHomepageCard"
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading"

export default function CateringHomepage() {
	const GET_BANNER = gql`
	{
		cateringHomepageBanner {
            topText
            midText
            bottomText
            leftLinkText
            leftLink
            rightLinkText
            rightLink
            images
          }
	}
`;

	const { loading: loadCards, error: errorCards, data: dataCards } = useQuery(gql`
	{
		cateringHomepageCards {
			id
			title
			date
			content
		  }
	}
`);

	// create the mutations
	const [
		createCateringHomepageCard,
		{ loading, error },
	] = useMutation(gql`
	mutation UpdateCateringHomepageCardMutation($createCateringHomepageCardTitle: String!, $createCateringHomepageCardDate: String!, $createCateringHomepageCardContent: String!) {
		createCateringHomepageCard(title: $createCateringHomepageCardTitle, date: $createCateringHomepageCardDate, content: $createCateringHomepageCardContent) {
		  id
		  title
		  date
		  content
		}
	  }
	`);

	

	const { loading: loadBanner, error: errorBanner, data: dataBanner } = useQuery(GET_BANNER);
	
	const [cards, setCards] = useState<any>([]);
	const [newCard, setNewCard] = useState({
		title: "",
		date: "",
		content: "",
});
	const [canCreate, setCanCreate] = useState({
		title: false,
		date: false,
		content: false,
	});

	useEffect(() => {
		if (dataCards != undefined) {
			const temp = [...dataCards.cateringHomepageCards];
			setCards(temp);
		}
	}, [dataCards]);

	// make sure there is data before render
	if (loadCards || loadBanner) return <Loading />;
	if (errorBanner) return <div>Error: {errorBanner.message}</div>;
	if (errorCards) return <div>Error: {errorCards.message}</div>;

	return (
		<div>
			<CateringHomeBannerCard cateringHomepageBanner={dataBanner.cateringHomepageBanner}/>
			<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Title"
					onChange={(e) => {
						setCanCreate({ ...canCreate, title: true });
						e.preventDefault();
						setNewCard({ ...newCard, title: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Date"
					onChange={(e) => {
						setCanCreate({ ...canCreate, date: true });
						e.preventDefault();
						setNewCard({ ...newCard, date: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Content"
					onChange={(e) => {
						setCanCreate({ ...canCreate, content: true });
						e.preventDefault();
						setNewCard({ ...newCard, content: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canCreate}
					onClick={(e) => {
						setCanCreate({
							title: false,
							date: false,
							content: false,
						});

						createCateringHomepageCard({
							variables: {
								createCateringHomepageCardTitle: newCard.title,
								createCateringHomepageCardDate: newCard.date,
								createCateringHomepageCardContent: newCard.content
							},
                        });
					}}
				>
					Create new Catering Homepage Card
				</button>
			</div>
		</div>
			{cards.map((card: {
				id: string
				title: string
				date: string
				content: string
			}) => {
				return (
					<CateringHomepageCard cateringHomepageCard={card} key={card.id}/>
				)
			})}
		</div>
		
		);
}
