import React, { useState } from "react";
import About from "./About";
import CateringHomepage from "./CateringHomepage";
import Homepage from "./Homepage";
import Menu from "./Menu";
import Nav from "./Nav";
import Head from "next/head";
import CateringFAQ from "./CateringFAQ";
import RestaurantFAQ from "./RestaurantFAQ";
import Venue from "./Venue";
import Partner from "./Partner";
import Features from "./Features";
import CateringMenu from "./CateringMenu";
import Gallery from "./Gallery";
import SiteControls from "./SiteControls";

export default function Dashboard() {
	// set the current component
	const [pageIndex, setPageIndex] = useState(0);
	const components = [
		<Homepage />,
		<About />,
		<Menu />,
		<CateringMenu />,
		<Features />,
		<CateringHomepage />,
		<CateringFAQ />,
		<RestaurantFAQ />,
		<Venue />,
		<Partner />,
		<Gallery />,
		<SiteControls />,
	];
	const updateIndex = (num: number) => {
		setPageIndex(num);
	};

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>Christopher's Admin</title>
			</Head>
			<div className="md:flex flex-col md:flex-row">
				<Nav setPageIndex={updateIndex} pageIndex={pageIndex} />
				{components[pageIndex]}
			</div>
		</>
	);
}
