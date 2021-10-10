import React, { useEffect, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";
import sanitize from "sanitize-html";
import { gql, useMutation, useQuery } from "@apollo/client";
import { stateFromHTML } from "draft-js-import-html";

interface AboutInterface {
	topHeading: string;
	subHeading: string;
	content: string;
}

interface DataInterface {
	about: AboutInterface;
}

export default function About() {
	// query
	const GET_ABOUT = gql`
		{
			about {
				topHeading
				subHeading
				content
			}
		}
	`;
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);

	const editor = React.useRef<any>(null);
	function focusEditor() {
		editor.current?.focus();
	}

	// setup form state
	const [formState, setFormState] = useState<AboutInterface>({
		topHeading: "",
		subHeading: "",
		content: "",
	});

	// muatation
	const [updateAbout, { loading: loadingUpdate, error: errorUpdate }] =
		useMutation(gql`
			mutation UpdateAboutMutation(
				$topHeading: String!
				$subHeading: String!
				$content: String!
			) {
				updateAbout(
					topHeading: $topHeading
					subHeading: $subHeading
					content: $content
				) {
					topHeading
					subHeading
					content
				}
			}
		`);

	// get the current data from database
	const { loading, error, data } = useQuery<DataInterface>(GET_ABOUT);

	// fill form state
	useEffect(() => {
		if (data) {
			setFormState({ ...data.about });
			setEditorState(
				EditorState.createWithContent(stateFromHTML(data.about.content))
			);
		}
	}, [data]);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	return (
		<div className="h-screen w-full flex justify-center">
			<div className="w-1/2 mt-5 px-3">
				<h1 className="text-4xl font-bold underline text-primary text-center mb-3">
					About Page
				</h1>
				<div>
					<div className="mb-2">
						<label htmlFor="TopHeading" className="block text-sm font-light">
							Top Heading
						</label>
						<input
							type="text"
							name="TopHeading"
							id="TopHeading"
							value={formState.topHeading}
							onChange={(e) => {
								e.preventDefault();
								setFormState({ ...formState, topHeading: e.target.value });
							}}
							className="w-full focus:ring-4 ring-primary bg-gray-200 shadow-xl px-2 py-1 rounded-lg"
						/>
					</div>
					<div>
						<label htmlFor="SubHeading" className="block text-sm font-light">
							Sub Heading
						</label>
						<input
							type="text"
							value={formState.subHeading}
							onChange={(e) => {
								e.preventDefault();
								setFormState({ ...formState, subHeading: e.target.value });
							}}
							name="SubHeading"
							id="SubHeading"
							className="w-full focus:ring-4 ring-primary bg-gray-200 shadow-xl px-2 py-1 rounded-lg"
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
					className="w-full border-4 border-primary rounded-lg text-center h-1/3 overflow-scroll"
					onClick={focusEditor}
				>
					<Editor
						ref={editor}
						editorState={editorState}
						onChange={setEditorState}
						placeholder="Write something!"
					/>
				</div>
				<h3 className="font-bold text-3xl block text-center">PREVIEW</h3>
				<div className="flex justify-center text-center">
					<div
						dangerouslySetInnerHTML={{
							__html: sanitize(stateToHTML(editorState.getCurrentContent())),
						}}
					/>
				</div>
				<div className="flex justify-center">
					<button
						className="bg-primary rounded-full hover:bg-secondary text-white text-xl font-bold shadow-sm px-3 py-2 mt-5"
						onClick={(e) => {
							e.preventDefault();
							updateAbout({
								variables: {
									topHeading: formState.topHeading,
									subHeading: formState.subHeading,
									content: sanitize(
										stateToHTML(editorState.getCurrentContent())
									),
								},
							});
						}}
					>
						{loadingUpdate ? "...updating" : "Update"}
					</button>
				</div>
			</div>
		</div>
	);
}
