import { gql, useMutation } from "@apollo/client";
import { EditorState, RichUtils, Editor } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import React, { useEffect, useState } from "react";
import sanitize from "sanitize-html";

interface PropsInterface {
	cateringHomepageCard: {
		id: string;
		title: string;
		date: string;
		content: string;
	};
}

export default function CateringHomepageCard(props: PropsInterface) {
	const { cateringHomepageCard } = props;
	const [cateringHomepageCardState, setCateringHomepageCardState] =
		useState(cateringHomepageCard);
	const [canUpdate, setCanUpdate] = useState(false);

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

	// create the mutations
	const [updateCateringHomepageCard, { loading, error }] = useMutation(gql`
		mutation UpdateCateringHomepageCardMutation(
			$updateCateringHomepageCardId: String!
			$updateCateringHomepageCardTitle: String
			$updateCateringHomepageCardDate: String
			$updateCateringHomepageCardContent: String
		) {
			updateCateringHomepageCard(
				id: $updateCateringHomepageCardId
				title: $updateCateringHomepageCardTitle
				date: $updateCateringHomepageCardDate
				content: $updateCateringHomepageCardContent
			) {
				title
				date
				content
				id
			}
		}
	`);
	const [removeCateringHomepageCard, { loading: loadingDelete }] =
		useMutation(gql`
			mutation UpdateCateringHomepageCardMutation(
				$removeCateringHomepageCardId: ID!
			) {
				removeCateringHomepageCard(id: $removeCateringHomepageCardId)
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
			EditorState.createWithContent(stateFromHTML(cateringHomepageCard.content))
		);
	}, [cateringHomepageCard]);

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
							value={cateringHomepageCardState.title}
							onChange={(e) => {
								e.preventDefault();
								setCanUpdate(true);
								setCateringHomepageCardState({
									...cateringHomepageCardState,
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
							value={cateringHomepageCardState.date}
							onChange={(e) => {
								e.preventDefault();
								setCanUpdate(true);
								setCateringHomepageCardState({
									...cateringHomepageCardState,
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
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateCateringHomepageCard({
							variables: {
								updateCateringHomepageCardId: cateringHomepageCardState.id,
								updateCateringHomepageCardTitle:
									cateringHomepageCardState.title,
								updateCateringHomepageCardDate: cateringHomepageCardState.date,
								updateCateringHomepageCardContent: sanitize(
									stateToHTML(editorState.getCurrentContent())
								),
							},
							refetchQueries: [GET_CARDS],
						});
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
				<button
					className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					onClick={(e) => {
						removeCateringHomepageCard({
							variables: {
								removeCateringHomepageCardId: cateringHomepageCardState.id,
							},
							refetchQueries: [GET_CARDS],
						});
					}}
				>
					{loadingDelete ? "loading..." : "Delete"}
				</button>
			</div>
		</div>
	);
}
