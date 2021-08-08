import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>)
}
export default MyApp
