import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Footer from "../components/layout/footer";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<main className="min-h-screen">
				<Component {...pageProps} />
			</main>
			<Footer />
		</ApolloProvider>
	);
}
export default MyApp;
