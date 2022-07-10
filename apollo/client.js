import { ForwardedRef, useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import merge from "deepmerge";
import { setContext, ContextSetter } from "@apollo/client/link/context";
import { getIdToken, onAuthStateChanged, auth } from "../util/firebase";

//@ts-ignore
let apolloClient;

const middleWareLink = new ApolloLink(
  (operation, forward) =>
    new Promise() <
    ForwardedRef >
    ((res, reg) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          return getIdToken(user).then((token) => {
            operation.setContext({
              headers: {
                ...operation.getContext().headers,
                authorization: token ? `Bearer ${token}` : "",
              },
            });
            return res(forward(operation));
          });
        }
        res(forward(operation));
      });
    })
);

function createLink() {
  return from([
    middleWareLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
  ]);
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createLink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  //@ts-ignore
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  //@ts-ignore
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
//@ts-ignore
export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
