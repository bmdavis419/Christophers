import React, { MouseEventHandler } from "react";
import { convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";
import sanitize from "sanitize-html";

export default function About() {
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);

	return (
		<div className="w-3/4">
			<h1>Edit About Page</h1>

			<div className="border-2 border-primary w-full h-1/2">
				<Editor
					editorState={editorState}
					onChange={setEditorState}
					placeholder="Write something!"
				/>
			</div>
			<div
				dangerouslySetInnerHTML={{
					__html: sanitize(stateToHTML(editorState.getCurrentContent())),
				}}
				className="text-center flex justify-center"
			/>
		</div>
	);
}
