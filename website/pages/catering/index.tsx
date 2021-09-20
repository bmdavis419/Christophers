import { gql } from "@apollo/client";
import Head from "next/head";
import { GetServerSideProps } from "next";
import React from "react";
import Info from "../../components/index/Info";
import client from "../../apollo-client";
import IndexHeader from "../../components/index/IndexHeader";
import IndexUpdates from "../../components/index/IndexUpdates";
import ContactCateringForm from "../../components/contactCatering/ContactCateringForm";
import CateringHeader from "../../components/layout/cateringHeader";

interface PropsInterface {
	homepageBanner: {
		topText: string;
		midText: string;
		bottomText: string;
		leftLinkText: string;
		leftLink: string;
		rightLinkText: string;
		rightLink: string;
		images: [string];
	};
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
	homepageFeatures: [
		{
			id: string;
			title: string;
			description: string;
			topLinkText: string;
			topLink: string;
			bottomLinkText: string;
			bottomLink: string;
			image: string;
		}
	];
}

export const getServerSideProps: GetServerSideProps = async () => {
	// get the data
	const { data } = await client.query({
		query: gql`
			{
				cateringHomepageBanner {
					topText
					midText
					bottomText
					leftLinkText
					leftLink
					rightLinkText
					rightLink
					images
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
			homepageBanner: data.cateringHomepageBanner,
			restaurantInfo: data.restaurantInfo,
		},
	};
};

export default function Home(props: PropsInterface) {
	const { homepageBanner, restaurantInfo } = props;

	return (
		<>
			<Head>
				<title>Christopher&apos;s Catering</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<CateringHeader />
			<div>
				<div className="col-span-3">
					<IndexHeader homepageBanner={homepageBanner} />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 md:m-16">
					<div className="col-span-3">
						<IndexUpdates />
					</div>
				</div>
				<div className="flex justify-center mb-5">
					<div
						className="flex justify-center flex-col lg:flex-row align-center bg-white shadow-lg rounded-50px md:w-3/5 pt-3"
						id="contact"
					>
						<div className="lg:mx-2 mx-auto">
							<ContactCateringForm />
						</div>
						<div className="max-w-144">
							<Info restaurantInfo={restaurantInfo} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
