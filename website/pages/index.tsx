import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Info from"../components/index/Info";
import client from "../apollo-client";
import IndexFeatures from "../components/index/IndexFeatures";

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
	homepageFeatures: [{
		id:string;
		title:string;
		description:string;
		topLinkText:string;
		topLink:string;
		bottomLinkText:string;
		bottomLink:string;
		image:string;
	  }];
}

export const getServerSideProps: GetServerSideProps = async () => {
	// get the data
	const { data } = await client.query({
		query: gql`
			{
				homepageBanner {
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
				homepageFeatures {
					id
					title
					description
					topLinkText
					topLink
					bottomLinkText
					bottomLink
					image
				  }
			}
		`,
	});

	return {
		props: {
			homepageBanner: data.homepageBanner,
			restaurantInfo: data.restaurantInfo,
			homepageFeatures: data.homepageFeatures,
		},
	};
};

export default function Home(props: PropsInterface) {
	const { homepageBanner, restaurantInfo,homepageFeatures } = props;

	return <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 m-16">
		<div className="col-span-2"> 		<IndexFeatures homepageFeatures={homepageFeatures} /></div>
		<Info restaurantInfo={restaurantInfo} />

	</div>;
}
