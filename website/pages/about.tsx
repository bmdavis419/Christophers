import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import React from "react";
import client from "../apollo-client";

interface PropsInterface {
	about: {
		topHeading: string;
		subHeading: string;
		content: string;
	};
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	// call DB
	const { data } = await client.query({
		query: gql`
			{
				about {
					topHeading
					subHeading
					content
				}
			}
		`,
	});
	return {
		props: {
			about: data.about,
		},
	};
};

export default function about(props: PropsInterface) {
	const { about } = props;
	const { topHeading, subHeading, content } = about;
	return (
		<div>
			<div className="text-center text-primary font-bold text-3xl md:text-6xl flex justify-center pt-24">
				<div className="max-w-9/10 md:max-w-1/2">{topHeading}</div>
			</div>
			<div className="text-center text-black text-Roboto font-bold text-2xl md:text-5xl flex justify-center pt-10">
				<div className="max-w-1/2">{subHeading}</div>
			</div>
			<div className="text-center text-black text-base md:text-2xl flex justify-center pt-12 pb-40">
				<div className="max-w-3/4">{content}</div>
			</div>
		</div>
	);
}
