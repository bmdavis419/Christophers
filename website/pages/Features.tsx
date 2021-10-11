import gql from "graphql-tag";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import client from "../apollo-client";
import FeaturesDisplay from "../components/features/FeaturesDisplay";
import FeaturesNav from "../components/features/FeaturesNav";
import Header from "../components/layout/header";

interface PropsInterface {
	featureCategories: {
		id: string;
		name: string;
		daysOfWeek: number[];
		menuItems: {
			name: string;
			price: string;
			description: string;
			image: string;
			type: number;
			id: string;
		}[];
	}[];
}

export const getServerSideProps: GetServerSideProps = async () => {
	const { data } = await client.query({
		query: gql`
			query Query {
				featureCategories {
					id
					name
					daysOfWeek
					menuItems {
						name
						description
						price
						image
						type
						id
					}
				}
			}
		`,
	});

	return {
		props: {
			featureCategories: data.featureCategories,
		},
	};
};

export default function Features(props: PropsInterface) {
	// get the features
	const { featureCategories } = props;

	// state for shown index
	const [displayIdx, setDisplayIdx] = useState(0);

	return (
		<>
			<Head>
				<title>Christopher&apos;s Restaurant Features</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<FeaturesNav
				displayIdx={displayIdx}
				setDisplayIdx={setDisplayIdx}
				featureCategories={featureCategories}
			/>
			{featureCategories[displayIdx].menuItems.length > 0 && (
				<FeaturesDisplay featureCat={featureCategories[displayIdx]} />
			)}
		</>
	);
}
