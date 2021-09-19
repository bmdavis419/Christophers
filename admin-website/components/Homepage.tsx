import React, { useState, useEffect } from "react";
import HomeBannerCard from "./homepage/HomeBannerCard"
import HomepageCard from "./homepage/HomepageCard"
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading"
import RestaurantInfo from "./homepage/RestaurantInfo";
import HomepageFeature from "./homepage/HomepageFeature"

export default function Homepage() {
	const GET_BANNER = gql`
	{
		homepageBanner {
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

const GET_INFO = gql`
	{
		restaurantInfo {
            monday
			tuesday
			wednesday
			thursday
			friday
			saturday
			sunday
			phone
			location
			locationLink
          }
	}
`;

	const { loading: loadCards, error: errorCards, data: dataCards } = useQuery(gql`
	{
		homepageCards {
			id
			title
			date
			content
		  }
	}
	`);
	const { loading: loadFeatures, error: errorFeatures, data: dataFeatures } = useQuery(gql`
	{
		homepageFeatures {
			id
			title
			description
			topLinkText
			topLink
			bottomLinkText
			bottomLink
			image
		}
	}
	`);

	// create the mutations
	const [
		createHomepageCard,
	] = useMutation(gql`
	mutation UpdateHomepageCardMutation($createHomepageCardTitle: String!, $createHomepageCardDate: String!, $createHomepageCardContent: String!) {
		createHomepageCard(title: $createHomepageCardTitle, date: $createHomepageCardDate, content: $createHomepageCardContent) {
		  id
		  title
		  date
		  content
		}
	  }
	`);
	const [
		createHomepageFeature,
	] = useMutation(gql`
	mutation Mutation($createHomepageFeatureTitle: String!, $createHomepageFeatureDescription: String!, $createHomepageFeatureTopLinkText: String!, $createHomepageFeatureTopLink: String!, $createHomepageFeatureBottomLinkText: String!, $createHomepageFeatureBottomLink: String!, $createHomepageFeatureImage: [String]!) {
		createHomepageFeature(title: $createHomepageFeatureTitle, description: $createHomepageFeatureDescription, topLinkText: $createHomepageFeatureTopLinkText, topLink: $createHomepageFeatureTopLink, bottomLinkText: $createHomepageFeatureBottomLinkText, bottomLink: $createHomepageFeatureBottomLink, image: $createHomepageFeatureImage) {
		  title
		  description
		  topLinkText
		  topLink
		  bottomLinkText
		  bottomLink
		  image
		}
	  }
	`);

	

	const { loading: loadBanner, error: errorBanner, data: dataBanner } = useQuery(GET_BANNER);
	const { loading: loadInfo, error: errorInfo, data: dataInfo } = useQuery(GET_INFO);
	
	const [cards, setCards] = useState<any>([]);
	const [features, setFeatures] = useState<any>([]);
	const [newCard, setNewCard] = useState({
		title: "",
		date: "",
		content: "",
});
	const [newFeature, setNewFeature] = useState({
		title: "",
		description: "",
		topLinkText: "",
		topLink: "",
		bottomLinkText: "",
		bottomLink: "",
		image: "",
	});
	const [canCreateCard, setCanCreateCard] = useState({
		title: false,
		date: false,
		content: false,
	});
	const [canCreateFeature, setCanCreateFeature] = useState({
		title: false,
		description: false,
		topLinkText: false,
		topLink: false,
		bottomLinkText: false,
		bottomLink: false,
		image: false,
	});

	useEffect(() => {
		if (dataCards != undefined) {
			const temp = [...dataCards.homepageCards];
			setCards(temp);
		}
	}, [dataCards]);
	useEffect(() => {
		if (dataFeatures != undefined) {
			const temp = [...dataFeatures.homepageFeatures];
			setFeatures(temp);
		}
	}, [dataFeatures]);

	// make sure there is data before render
	if (loadCards || loadBanner || loadInfo || loadFeatures) return <Loading />;
	if (errorBanner) return <div>Error: {errorBanner.message}</div>;
	if (errorCards) return <div>Error: {errorCards.message}</div>;
	if (errorInfo) return <div>Error: {errorInfo.message}</div>;
	if (errorFeatures) return <div>Error: {errorFeatures.message}</div>;

	return (
		<div>
			<HomeBannerCard homepageBanner={dataBanner.homepageBanner}/>
			<RestaurantInfo restaurantInfo={dataInfo.restaurantInfo}/>

			<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Title"
					onChange={(e) => {
						setCanCreateCard({ ...canCreateCard, title: true });
						e.preventDefault();
						setNewCard({ ...newCard, title: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Date"
					onChange={(e) => {
						setCanCreateCard({ ...canCreateCard, date: true });
						e.preventDefault();
						setNewCard({ ...newCard, date: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Content"
					onChange={(e) => {
						setCanCreateCard({ ...canCreateCard, content: true });
						e.preventDefault();
						setNewCard({ ...newCard, content: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canCreateCard}
					onClick={(e) => {
						setCanCreateCard({
							title: false,
							date: false,
							content: false,
						});

						createHomepageCard({
							variables: {
								createHomepageCardTitle: newCard.title,
								createHomepageCardDate: newCard.date,
								createHomepageCardContent: newCard.content
							},
                        });
					}}
				>
					Create new  Homepage Card
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
					<HomepageCard homepageCard={card} key={card.id}/>
				)
			})}
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Title"
					onChange={(e) => {
						setCanCreateFeature({ ...canCreateFeature, title: true });
						e.preventDefault();
						setNewFeature({ ...newFeature, title: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Description"
					onChange={(e) => {
						setCanCreateFeature({ ...canCreateFeature, description: true });
						e.preventDefault();
						setNewFeature({ ...newFeature, description: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Top Link Text"
					onChange={(e) => {
						setCanCreateFeature({ ...canCreateFeature, topLinkText: true });
						e.preventDefault();
						setNewFeature({ ...newFeature, topLinkText: e.target.value });
					}}
				/>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Top Link"
					onChange={(e) => {
						setCanCreateFeature({ ...canCreateFeature, topLink: true });
						e.preventDefault();
						setNewFeature({ ...newFeature, topLink: e.target.value });
					}}
				/>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Bottom Link Text"
					onChange={(e) => {
						setCanCreateFeature({ ...canCreateFeature, bottomLinkText: true });
						e.preventDefault();
						setNewFeature({ ...newFeature, bottomLinkText: e.target.value });
					}}
				/>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Bottom Link"
					onChange={(e) => {
						setCanCreateFeature({ ...canCreateFeature, bottomLink: true });
						e.preventDefault();
						setNewFeature({ ...newFeature, bottomLink: e.target.value });
					}}
				/>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					placeholder="Image"
					onChange={(e) => {
						setCanCreateFeature({ ...canCreateFeature, image: true });
						e.preventDefault();
						setNewFeature({ ...newFeature, image: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canCreateFeature}
					onClick={(e) => {
						setCanCreateFeature({
							title: false,
							description: false,
							topLinkText: false,
							topLink: false,
							bottomLinkText: false,
							bottomLink: false,
							image: false,
						});

						createHomepageCard({
							variables: {
								createHomepageFeatureTitle: newFeature.title,
								createHomepageFeatureDescription: newFeature.description,
								createHomepageFeatureTopLinkText: newFeature.topLinkText,
								createHomepageFeatureTopLink: newFeature.topLink,
								createHomepageFeatureBottomLinkText: newFeature.bottomLinkText,
								createHomepageFeatureBottomLink: newFeature.bottomLink,
								createHomepageFeatureImage: newFeature.image
							},
                        });
					}}
				>
					Create new Feature
				</button>
			</div>
		</div>
			{features.map((feature: {
				id: string
				title: string
				description: string
				topLinkText: string
				topLink: string
				bottomLinkText: string
				bottomLink: string
				image: string
			}) => {
				return (
					<HomepageFeature homepageFeature={feature} key={feature.id}/>
				)
			})}
		</div>
		
		);
}
