import React, { useState } from "react";
import Image from "next/image";
import VenueSlides from "../../components/venue/VenueSlides";
import ContactCateringForm from "../../components/contactCatering/ContactCateringForm";
import client from "../../apollo-client";
import { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import Info from "../../components/index/Info";
import Head from "next/head";
import CateringHeader from "../../components/layout/cateringHeader";

interface PropsInterface {
	partners: {
		name: string;
		id: string;
		description: string;
		image: string;
	}[];
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
			query Query {
				partners {
					id
					name
					image
					description
				}
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
			partners: data.partners,
			restaurantInfo: data.restaurantInfo,
		},
	};
};
export default function Partner(props: PropsInterface) {
	const { partners, restaurantInfo } = props;
	const [index, setIndex] = useState(0);
	function setActiveVenue(e: HTMLFormElement, i: number) {
		e.preventDefault();
		setIndex(i);
	}
	return (
		<div>
			<Head>
				<title>Christopher&apos;s Partners</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<CateringHeader />
			<div className="flex flex-col justify-evenly items-center relative w-full p-12 h-3/4vw sm:h-1/2vw lg:h-1/3vw overflow-hidden">
				<Image
					className=""
					objectFit="cover"
					layout="fill"
					src="/temp/HeaderTemp.jpeg"
					alt="Partner banner image"
				/>
			</div>
			<VenueSlides
				numVenues={partners.length}
				activeVenue={index}
				venue={partners[index]}
				setActiveVenue={setActiveVenue}
			/>
			<div className="flex justify-center flex-col lg:flex-row align-center">
				<div className="lg:mx-2 mx-auto">
					<ContactCateringForm />
				</div>
				<div className="max-w-144">
					<Info restaurantInfo={restaurantInfo} />
				</div>
			</div>
		</div>
	);
}
