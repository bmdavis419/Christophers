import React, { useState } from "react";
import { GetServerSideProps } from "next";
import GalleryImage from "../components/gallery/GalleryImage";
import ContactForm from "../components/contact/ContactForm";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Info from "../components/index/Info";
import Head from "next/head";
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
	images: [
		{
			image: string;
			description: string;
			id: string;
		}
	];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	// get the data
	const { data } = await client.query({
		query: gql`
			query Query {
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
					locationLink
				}
				restaurantGalleryImages {
					image
					description
					id
				}
			}
		`,
	});

	return {
		props: {
			restaurantInfo: data.restaurantInfo,
			images: data.restaurantGalleryImages,
		},
	};
};

export default function Gallery(props: PropsInterface) {
	const { images, restaurantInfo } = props;
	const sortedImages = [];
	for (let i: number = 0; i < images.length; i += 4) {
		sortedImages.push(images.slice(i, i + 4));
	}
	const [index, setIndex] = useState(0);

	let circles: any = [];
	for (let i: number = 0; i < sortedImages.length; i++) {
		circles.push(
			<div
				onClick={() => {
					setIndex(i);
				}}
				className={`rounded-full mt-auto m-2 lg:m-3 p-3 xl:p-4 2xl:p-5 bg-${
					index == i ? "primary" : "gray-400"
				}`}
				key={i}
			></div>
		);
	}
	return (
		<div className="flex flex-col">
			<Head>
				<title>Christopher&apos;s Gallery</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<div className="text-headlg text-primary text-center mb-6">Gallery</div>
			<div className="grid grid-flow-row lg:grid-cols-2 md:grid-cols-1 sm:grid-rows-2 sm:grid-cols-1 gap-6 md:gap-130 justify-items-center filter drop-shadow-gallery">
				{sortedImages[index].map((el, i) => {
					return (
						<GalleryImage
							pic={el.image}
							index={i}
							description={el.description}
							key={i}
						/>
					);
				})}
			</div>
			<div className="relative mix-blend normal flex flex-row self-end mx-auto mt-6">
				{circles}
			</div>
			<div className="flex justify-center flex-col lg:flex-row align-center">
				<div className="lg:mx-2 mx-auto">
					<ContactForm />
				</div>
				<div className="max-w-144">
					<Info restaurantInfo={restaurantInfo} />
				</div>
			</div>
		</div>
	);
}
