import React, { useState, useEffect } from "react";
import HomeBannerCard from "./homepage/HomeBannerCard";
import HomepageCard from "./homepage/HomepageCard";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";
import RestaurantInfo from "./homepage/RestaurantInfo";
import HomepageFeature from "./homepage/HomepageFeature";
import { Editor, EditorState, RichUtils } from "draft-js";
import sanitize from "sanitize-html";
import { stateToHTML } from "draft-js-export-html";
import CreateHomepageFeature from "./homepage/CreateHomepageFeature";

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

	const GET_CARDS = gql`
		{
			homepageCards {
				id
				title
				date
				content
			}
		}
	`;

	const {
		loading: loadCards,
		error: errorCards,
		data: dataCards,
	} = useQuery(GET_CARDS);

	// create the mutations
	const [createHomepageCard, { loading: loadingCreateCard }] = useMutation(gql`
		mutation UpdateHomepageCardMutation(
			$createHomepageCardTitle: String!
			$createHomepageCardDate: String!
			$createHomepageCardContent: String!
		) {
			createHomepageCard(
				title: $createHomepageCardTitle
				date: $createHomepageCardDate
				content: $createHomepageCardContent
			) {
				id
				title
				date
				content
			}
		}
	`);

	const {
		loading: loadBanner,
		error: errorBanner,
		data: dataBanner,
	} = useQuery(GET_BANNER);
	const {
		loading: loadInfo,
		error: errorInfo,
		data: dataInfo,
	} = useQuery(GET_INFO);

	const [cards, setCards] = useState<any>([]);

	const [newCard, setNewCard] = useState({
		title: "",
		date: "",
		content: "",
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

	// card content
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);
	const editor = React.useRef<any>(null);
	function focusEditor() {
		editor.current?.focus();
	}

	useEffect(() => {
		if (dataCards != undefined) {
			const temp = [...dataCards.homepageCards];
			setCards(temp);
		}
	}, [dataCards]);

	// make sure there is data before render
	if (loadCards || loadBanner || loadInfo) return <Loading />;
	if (errorBanner) return <div>Error: {errorBanner.message}</div>;
	if (errorCards) return <div>Error: {errorCards.message}</div>;
	if (errorInfo) return <div>Error: {errorInfo.message}</div>;

	return (
		<div className="w-full">
			<div className="font-bold text-3xl text-primary text-center w-full">
				Homepage Editing
			</div>
			<HomeBannerCard homepageBanner={dataBanner.homepageBanner} />
			<RestaurantInfo restaurantInfo={dataInfo.restaurantInfo} />

			<div className="mb-7 px-4 rounded-xl shadow-lg py-4 mx-5">
				<h1 className="text-center font-bold text-primary text-xl mb-5">
					Homepage Card
				</h1>
				<div className="w-full">
					<div className="w-full flex justify-between space-x-5">
						<input
							type="text"
							className="bg-gray-300 rounded-lg w-3/4 px-3 py-2"
							placeholder="Title"
							onChange={(e) => {
								setCanCreateCard({ ...canCreateCard, title: true });
								e.preventDefault();
								setNewCard({ ...newCard, title: e.target.value });
							}}
						/>
						<input
							type="text"
							className="bg-gray-300 rounded-lg w-1/4 px-3 py-2"
							placeholder="Date"
							onChange={(e) => {
								setCanCreateCard({ ...canCreateCard, date: true });
								e.preventDefault();
								setNewCard({ ...newCard, date: e.target.value });
							}}
						/>
					</div>
					<div className="w-full flex justify-center space-x-5 my-5">
						<button
							onClick={(e) => {
								e.preventDefault();
								setEditorState(
									RichUtils.toggleInlineStyle(editorState, "BOLD")
								);
							}}
							className="bg-gray-500 rounded-md text-xl px-2 py-1 text-white hover:bg-gray-300"
						>
							B
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								setEditorState(
									RichUtils.toggleInlineStyle(editorState, "ITALIC")
								);
							}}
							className="bg-gray-500 rounded-md text-xl px-3 py-1 text-white italic hover:bg-gray-300"
						>
							I
						</button>
					</div>
					<label htmlFor="editor" className="text-sm font-light block">
						Content
					</label>
					<div
						id="editor"
						className="w-full border-4 border-primary rounded-lg text-center h-96 overflow-scroll"
						onClick={focusEditor}
					>
						<Editor
							ref={editor}
							editorState={editorState}
							onChange={setEditorState}
							placeholder="Write something!"
						/>
					</div>

					<div className="w-full flex justify-center mt-5">
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
										createHomepageCardContent: sanitize(
											stateToHTML(editorState.getCurrentContent())
										),
									},
									refetchQueries: [GET_CARDS],
								});
							}}
						>
							{loadingCreateCard ? "...loading" : "Create New Card"}
						</button>
					</div>
				</div>
			</div>
			{cards.map(
				(card: {
					id: string;
					title: string;
					date: string;
					content: string;
				}) => {
					return <HomepageCard homepageCard={card} key={card.id} />;
				}
			)}
			<CreateHomepageFeature />
		</div>
	);
}
