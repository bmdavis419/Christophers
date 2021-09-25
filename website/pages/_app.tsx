import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Footer from "../components/layout/footer";
import { Router } from "next/router";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
		const start = () => {
			console.log("start");
			setLoading(true);
		};
		const end = () => {
			console.log("findished");
			setLoading(false);
		};
		Router.events.on("routeChangeStart", start);
		Router.events.on("routeChangeComplete", end);
		Router.events.on("routeChangeError", end);
		return () => {
			Router.events.off("routeChangeStart", start);
			Router.events.off("routeChangeComplete", end);
			Router.events.off("routeChangeError", end);
		};
	}, []);

	return (
		<ApolloProvider client={client}>
			<main className="min-h-screen">
				{loading ? <Loading /> : <Component {...pageProps} />}
			</main>
			<Footer />
		</ApolloProvider>
	);
}
export default MyApp;
