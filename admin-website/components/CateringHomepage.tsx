import React, { useState, useEffect } from "react";
import CateringHomeBannerCard from "./homepage/CateringHomeBannerCard";
import CateringHomepageCard from "./homepage/CateringHomepageCard";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import sanitize from "sanitize-html";

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

	const GET_CARDS = gql`
		{
			cateringHomepageCards {
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
	const [createCateringHomepageCard, { loading, error }] = useMutation(gql`
		mutation UpdateCateringHomepageCardMutation(
			$createCateringHomepageCardTitle: String!
			$createCateringHomepageCardDate: String!
			$createCateringHomepageCardContent: String!
		) {
			createCateringHomepageCard(
				title: $createCateringHomepageCardTitle
				date: $createCateringHomepageCardDate
				content: $createCateringHomepageCardContent
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
			const temp = [...dataCards.cateringHomepageCards];
			setCards(temp);
		}
	}, [dataCards]);

	// make sure there is data before render
	if (loadCards || loadBanner) return <Loading />;
	if (errorBanner) return <div>Error: {errorBanner.message}</div>;
	if (errorCards) return <div>Error: {errorCards.message}</div>;

	return (
		<div className="w-full">
			<div className="font-bold text-3xl text-primary text-center w-full">
				Homepage Editing
			</div>
			<CateringHomeBannerCard
				cateringHomepageBanner={dataBanner.cateringHomepageBanner}
			/>
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
								setCanCreate({ ...canCreate, title: true });
								e.preventDefault();
								setNewCard({ ...newCard, title: e.target.value });
							}}
						/>
						<input
							type="text"
							className="bg-gray-300 rounded-lg w-1/4 px-3 py-2"
							placeholder="Date"
							onChange={(e) => {
								setCanCreate({ ...canCreate, date: true });
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
									createCateringHomepageCardContent: sanitize(
										stateToHTML(editorState.getCurrentContent())
									),
								},
								refetchQueries: [GET_CARDS],
							});
						}}
					>
						{loading ? "...loading" : "Create"}
					</button>
				</div>
			</div>
			{cards.map(
				(card: {
					id: string;
					title: string;
					date: string;
					content: string;
				}) => {
					return (
						<CateringHomepageCard cateringHomepageCard={card} key={card.id} />
					);
				}
			)}
		</div>
	);
}
