import Head from "next/head";
import React from "react";
import Header from "./layout/header";

export default function Loading() {
	return (
		<div className="w-full overflow-x-hidden">
			<Head>
				<title>Loading...</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<div className="flex items-center jusitfy-center w-full h-screen">
				<div className="text-center w-full text-4xl font-bold text-primary">
					Loading...
				</div>
			</div>
		</div>
	);
}
