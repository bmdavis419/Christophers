import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import FaqCard from "../components/faqComponents/FaqCard";
import Header from "../components/layout/header";
import client from "../apollo-client";
import { gql } from "@apollo/client";

interface FAQInterface {
	RestaurantFAQ: {
		question: string;
		answer: string;
	}[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data } = await client.query({
		query: gql`
			query Query {
				restaurantFAQ {
					id
					question
					answer
				}
			}
		`,
	});

	return {
		props: {
			RestaurantFAQ: data.restaurantFAQ,
		},
	};
};

export default function faq(props: FAQInterface) {
	const { RestaurantFAQ } = props;
	let restaurants = RestaurantFAQ.map((i, idx) => {
		return <FaqCard question={i.question} answer={i.answer} key={idx} />;
	});
	return (
		<>
			<Head>
				<title>Christopher&apos;s Restaurant FAQ</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<div>
				<h2 className="text-primary text-headmd text-center">
					Frequently Asked Questions
				</h2>
				<div className="grid grid-flow-row lg:grid-cols-2 grid-cols-1 md:px-faq md:py-5 gap-2 lg:gap-6">
					{restaurants}
				</div>
			</div>
		</>
	);
}
