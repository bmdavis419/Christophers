import { gql, useMutation } from "@apollo/client";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import React, { useEffect, useState } from "react";
import sanitize from "sanitize-html";
// import SubField from "./SubField";

interface PropsInterface {
	homepageCard: {
		id: string;
		title: string;
		date: string;
		content: string;
	};
}

export default function HomepageCard(props: PropsInterface) {
	const { homepageCard } = props;
	const [homepageCardState, setHomepageCardState] = useState(homepageCard);
	const [canUpdate, setCanUpdate] = useState(false);

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

	// create the mutations
	const [updateHomepageCard, { loading, error }] = useMutation(gql`
		mutation UpdateHomepageCardMutation(
			$updateHomepageCardId: String!
			$updateHomepageCardTitle: String
			$updateHomepageCardDate: String
			$updateHomepageCardContent: String
		) {
			updateHomepageCard(
				id: $updateHomepageCardId
				title: $updateHomepageCardTitle
				date: $updateHomepageCardDate
				content: $updateHomepageCardContent
			) {
				title
				date
				content
				id
			}
		}
	`);
	const [removeHomepageCard, { loading: loadingDelete }] = useMutation(gql`
		mutation UpdateHomepageCardMutation($removeHomepageCardId: ID!) {
			removeHomepageCard(id: $removeHomepageCardId)
		}
	`);

	// card content
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);
	const editor = React.useRef<any>(null);
	function focusEditor() {
		editor.current?.focus();
	}

	// fill form state
	useEffect(() => {
		setEditorState(
			EditorState.createWithContent(stateFromHTML(homepageCard.content))
		);
	}, [homepageCard]);

	return (
		<div className="mb-7 px-4 rounded-xl shadow-lg py-4 mx-5">
			<div className="w-full">
				<div className="w-full flex justify-between space-x-5">
					<div className="w-3/4">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="title"
						>
							title
						</label>
						<input
							id="title"
							type="text"
							placeholder="title"
							className="bg-gray-300 px-3 py-3 rounded-lg w-full"
							value={homepageCardState.title}
							onChange={(e) => {
								e.preventDefault();
								setCanUpdate(true);
								setHomepageCardState({
									...homepageCardState,
									title: e.target.value,
								});
							}}
						/>
					</div>
					<div className="w-1/4">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="date"
						>
							date
						</label>
						<input
							id="date"
							type="text"
							placeholder="date"
							className="bg-gray-300 px-3 py-3 rounded-lg w-full"
							value={homepageCardState.date}
							onChange={(e) => {
								e.preventDefault();
								setCanUpdate(true);
								setHomepageCardState({
									...homepageCardState,
									date: e.target.value,
								});
							}}
						/>
					</div>
				</div>

				<div className="w-full flex justify-center space-x-5 my-5">
					<button
						onClick={(e) => {
							e.preventDefault();
							setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
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
					className="col-start-1 col-end-2 ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						updateHomepageCard({
							variables: {
								updateHomepageCardId: homepageCardState.id,
								updateHomepageCardTitle: homepageCardState.title,
								updateHomepageCardDate: homepageCardState.date,
								updateHomepageCardContent: sanitize(
									stateToHTML(editorState.getCurrentContent())
								),
							},
						});
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
				<button
					className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						removeHomepageCard({
							variables: {
								removeHomepageCardId: homepageCardState.id,
							},
							refetchQueries: [GET_CARDS],
						});
					}}
				>
					{loadingDelete ? "...loading" : "Delete"}
				</button>
			</div>
		</div>
	);
}
