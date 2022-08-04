import "../styles/globals.css";
import type { AppProps, AppContext } from "next/app";
import Head from "next/head";
import Sript from "next/script";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import { useEffect } from "react";
import nookies from "nookies";
import { auth } from "../util/firebase";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      console.log("token renewed");

      if (!user) {
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <script
          src="https://kit.fontawesome.com/be8853b629.js"
          //@ts-ignore
          crossOrigin={true}
        ></script>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,200;8..144,300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />;
      </ApolloProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
