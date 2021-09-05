import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import FaqCard from "../components/faqComponents/FaqCard";
import Header from "../components/layout/header";

interface FAQInterface {
	RestaurantFAQ: [
		{
			question: string;
			answer: string;
		}
	];
	CateringFAQ: [
		{
			question: string;
			answer: string;
		}
	];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			RestaurantFAQ: [
				{
					question: "RestaurantQuestion",
					answer:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut sunt, odit, atque amet, dolorum dolorem aliquam et totam labore in sint natus repudiandae consequuntur officia? Commodi a necessitatibus sapiente.",
				},
				{
					question: "RestaurantQuestion",
					answer:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut sunt, odit, atque amet, dolorum dolorem aliquam et totam labore in sint natus repudiandae consequuntur officia? Commodi a necessitatibus sapiente.",
				},
			],
			CateringFAQ: [
				{
					question: "CateringQuestion",
					answer:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut sunt, odit, atque amet, dolorum dolorem aliquam et totam labore in sint natus repudiandae consequuntur officia? Commodi a necessitatibus sapiente.",
				},
				{
					question: "CateringQuestion",
					answer:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut sunt, odit, atque amet, dolorum dolorem aliquam et totam labore in sint natus repudiandae consequuntur officia? Commodi a necessitatibus sapiente.",
				},
				{
					question: "CateringQuestion",
					answer:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut sunt, odit, atque amet, dolorum dolorem aliquam et totam labore in sint natus repudiandae consequuntur officia? Commodi a necessitatibus sapiente.",
				},
				{
					question: "CateringQuestion",
					answer:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut sunt, odit, atque amet, dolorum dolorem aliquam et totam labore in sint natus repudiandae consequuntur officia? Commodi a necessitatibus sapiente.",
				},
				{
					question: "CateringQuestion",
					answer:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut sunt, odit, atque amet, dolorum dolorem aliquam et totam labore in sint natus repudiandae consequuntur officia? Commodi a necessitatibus sapiente.",
				},
				{
					question: "CateringQuestion",
					answer:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut sunt, odit, atque amet, dolorum dolorem aliquam et totam labore in sint natus repudiandae consequuntur officia? Commodi a necessitatibus sapiente.",
				},
				{
					question: "CateringQuestion",
					answer:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut sunt, odit, atque amet, dolorum dolorem aliquam et totam labore in sint natus repudiandae consequuntur officia? Commodi a necessitatibus sapiente.",
				},
			],
		},
	};
};

export default function faq(props: FAQInterface) {
	const { RestaurantFAQ, CateringFAQ } = props;
	let restaurants = RestaurantFAQ.map((i) => {
		return <FaqCard question={i.question} answer={i.answer} />;
	});
	let caterings = CateringFAQ.map((i) => {
		return <FaqCard question={i.question} answer={i.answer} />;
	});
	return (
		<>
			<Head>
				<title>Christopher's Restaurant FAQ</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<div>
				<h2 className="text-primary text-headmd text-center">
					Frequently Asked Questions
				</h2>
				<div className="grid grid-flow-row md:grid-cols-2 sm:grid-cols-1 md:px-faq md:py-5 gap-6">
					{restaurants}
					{caterings}
				</div>
			</div>
		</>
	);
}
