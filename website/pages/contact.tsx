import { gql } from "@apollo/client";
import Head from "next/head";
import { GetServerSideProps } from "next";
import React from "react";
import client from "../apollo-client";
import ContactForm from "../components/contact/ContactForm";
import Info from "../components/index/Info";
import Header from "../components/layout/header";

interface PropsInterface {
	restaurantInfo: {
		monday: string;
		tuesday: string;
		wednesday: string;
		thursday: string;
		friday: string;
		saturday: string;
		sunday: string;
		phone: number;
		location: string;
	};
}

export const getServerSideProps: GetServerSideProps = async () => {
	// get the data
	const { data } = await client.query({
		query: gql`
			{
				restaurantInfo {
					monday
					tuesday
					wednesday
					thursday
					friday
					saturday
					sunday
					phone
					location
				}
			}
		`,
	});

	return {
		props: {
			restaurantInfo: data.restaurantInfo,
		},
	};
};
export default function contact(props: PropsInterface) {
	const { restaurantInfo } = props;
	return (
		<>
			<Head>
				<title>Contact Christopher's Restaurant</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<div className="w-full flex justify-center mt-5">
				<div className="flex justify-center flex-col lg:flex-row align-center bg-white shadow-2xl rounded-50px md:w-3/5 py-5">
					<div className="lg:mx-2 mx-auto">
						<ContactForm />
					</div>
					<div className="max-w-144">
						<Info restaurantInfo={restaurantInfo} />
					</div>
				</div>
			</div>
		</>
	);
}
