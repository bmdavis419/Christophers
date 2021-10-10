import React from "react";
import sanitize from "sanitize-html";

interface PropsInterface {
	id: string;
	title: string;
	date: string;
	content: string;
}

export default function IndexUpdates(props: PropsInterface) {
	return (
		<div className="w-full md:p-12 bg-gray-100 space-y-2 filter drop-shadow-xl md:rounded-50px flex flex-col justify-center align-center text-center">
			<h1 className="text-primary text-4xl lg:text-6xl text-center">
				{props.title}
			</h1>
			<h2 className="text-xl lg:text-3xl">{props.date}</h2>
			<div className="text-sm sm:text-lg w-full mx-auto text-center">
				<div
					dangerouslySetInnerHTML={{
						__html: sanitize(props.content),
					}}
				/>
			</div>
		</div>
	);
}
