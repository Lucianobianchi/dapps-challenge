import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Container } from "@mui/material";
import Web3Provider from "web3-react";
import { MetaMask } from "../connectors/metamask";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const theGraphApolloClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/juanigallo/cdai-kovan-subgraph",
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <Web3Provider
                connectors={{ metamask: MetaMask }}
                libraryName={"ethers.js"}
            >
                <ApolloProvider client={theGraphApolloClient}>
                    <Container>
                        <h1>Exactly Finance Dapp Challenge</h1>
                        <Component {...pageProps} />
                    </Container>
                </ApolloProvider>
            </Web3Provider>
        </>
    );
}

export default MyApp;
