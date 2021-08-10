import React, { useState } from "react";
import About from "./About";
import CateringHomepage from "./CateringHomepage";
import Homepage from "./Homepage";
import Menu from "./Menu";
import Nav from "./Nav";

export default function Dashboard() {
	// set the current component
	const [pageIndex, setPageIndex] = useState(0);
	const components = [<Homepage />, <About />, <Menu />, <CateringHomepage />];
	const updateIndex = (num: number) => {
		setPageIndex(num);
	};

	return (
		<div className="md:flex flex-col md:flex-row">
			<Nav setPageIndex={updateIndex} />
			{components[pageIndex]}
		</div>
	);
}
