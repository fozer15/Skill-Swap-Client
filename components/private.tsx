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
import { supportsResultCaching } from "@apollo/client/cache/inmemory/entityStore";

export function withAuth(
  gssp: GetServerSideProps | any,
  store: AppStore
): GetServerSideProps {
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
      const user = rest;
      store.dispatch(setUser(user));

      const sp: any = await gssp(context, user);

      sp.props = { ...sp.props, initialApolloState: client.cache.extract() };

      if (!user.isProfileCreated) {
        return {
          redirect: {
            destination: "/create-profile",
          },
        };
      }

      return sp;
    } catch (err) {
      //auth-error
      return {
        redirect: {
          destination: "/login",
        },
      };
    }
  };
}
