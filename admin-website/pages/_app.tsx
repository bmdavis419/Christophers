import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "../firebaseConfig";
import "firebase/auth";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</FirebaseAppProvider>
	);
}
export default MyApp;
