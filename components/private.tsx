import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { initializeApollo } from "../apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  GetCurrentUserDocument,
  GetCurrentUserQueryVariables,
  GetCurrentUserQuery,
} from "../generated/graphql";
import { setUser } from "../store/authSlice";
import { AppStore } from "../store/store";

export function withAuth(gssp: GetServerSideProps, store: AppStore) {
  return async (context: GetServerSidePropsContext) => {
    const client: ApolloClient<InMemoryCache> = initializeApollo(null, context);

    try {
      const res = await client.query<
        GetCurrentUserQuery,
        GetCurrentUserQueryVariables
      >({
        query: GetCurrentUserDocument,
      });

      const { __typename, ...rest } = res.data.getCurrentUser;

      store.dispatch(setUser(rest));

      const sp: any = await gssp(context);
      const finalProps = {
        props: {
          ...sp.props,
          initialApolloState: client.cache.extract(),
        },
      };

      return finalProps;
    } catch {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }
  };
}
