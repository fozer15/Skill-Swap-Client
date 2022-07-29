import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  register: User;
};

export type MutationRegisterArgs = {
  user: RegisterInput;
};

export type Query = {
  __typename?: "Query";
  getCurrentUser: User;
};

export type RegisterInput = {
  email: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  password: Scalars["String"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  first_name: Scalars["String"];
  id: Scalars["ID"];
  last_name: Scalars["String"];
  password: Scalars["String"];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  __typename?: "Query";
  getCurrentUser: {
    __typename?: "User";
    first_name: string;
    last_name: string;
    email: string;
  };
};

export type RegisterMutationVariables = Exact<{
  user: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "User"; id: string };
};

export const GetCurrentUserDocument = gql`
  query getCurrentUser {
    getCurrentUser {
      first_name
      last_name
      email
    }
  }
`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;
export const RegisterDocument = gql`
  mutation Register($user: RegisterInput!) {
    register(user: $user) {
      id
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
