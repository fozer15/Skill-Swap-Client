import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import merge from "deepmerge";
import nookies from "nookies";

//@ts-ignore
let apolloClient;

const middleWareLink = (ctx) =>
  new ApolloLink((operation, forward) => {
    const cookies = nookies.get(ctx ?? null);
    operation.setContext({
      headers: {
        ...operation.getContext().headers,
        authorization: `Bearer ${cookies?.token}`,
      },
    });
    return forward(operation);
  });

function createLink(ctx) {
  return from([
    middleWareLink(ctx),
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
  ]);
}

function createApolloClient(ctx) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createLink(ctx),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, ctx) {
  //@ts-ignore
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

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
