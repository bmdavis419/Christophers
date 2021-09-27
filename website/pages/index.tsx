import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import React from "react";
import Info from "../components/index/Info";
import client from "../apollo-client";
import IndexFeatures from "../components/index/IndexFeatures";
import IndexHeader from "../components/index/IndexHeader";
import IndexUpdates from "../components/index/IndexUpdates";
import Header from "../components/layout/header";
import Head from "next/head";
import Loading from "../components/Loading";

interface QueryData {
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

export default function Home() {
	// read in data
	const { data, error, loading } = useQuery<QueryData>(gql`
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
	`);

	if (error) return <div>Error: error.message</div>;
	if (loading) return <Loading />;

	if (data)
		return (
			<div className="w-full overflow-x-hidden">
				<Head>
					<title>Christopher&apos;s Restaurant</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<Header />
				<div>
					<div className="col-span-3">
						<IndexHeader homepageBanner={data.homepageBanner} />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 md:m-16 md:px-20">
						<div className="col-span-3 md:col-span-2">
							<IndexFeatures homepageFeatures={data.homepageFeatures} />
						</div>
						<Info restaurantInfo={data.restaurantInfo} />
						<div className="col-span-3">
							<div className="h-1 bg-red w-100vw bg-primary visible sm:invisible"></div>
							<IndexUpdates />
						</div>
					</div>
				</div>
			</div>
		);
}
