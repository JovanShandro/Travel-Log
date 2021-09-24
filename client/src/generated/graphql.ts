import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  password: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ErrorFragment = {
  __typename?: 'FieldError';
  field: string;
  message: string;
};

export type UserFragment = {
  __typename?: 'User';
  id: number;
  username: string;
};

export type UserResponseFragment = {
  __typename?: 'UserResponse';
  errors?: Maybe<
    Array<{ __typename?: 'FieldError'; field: string; message: string }>
  >;
  user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
    user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
    user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
};

export const ErrorFragmentDoc = gql`
  fragment Error on FieldError {
    field
    message
  }
`;
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    username
  }
`;
export const UserResponseFragmentDoc = gql`
  fragment UserResponse on UserResponse {
    errors {
      ...Error
    }
    user {
      ...User
    }
  }
  ${ErrorFragmentDoc}
  ${UserFragmentDoc}
`;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      ...UserResponse
    }
  }
  ${UserResponseFragmentDoc}
`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     username: // value for 'username'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        LoginMutation,
        LoginMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          LoginMutation,
          LoginMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        LogoutMutation,
        LogoutMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          LogoutMutation,
          LogoutMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    LogoutMutation,
    LogoutMutationVariables
  >;
export const RegisterDocument = gql`
  mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      ...UserResponse
    }
  }
  ${UserResponseFragmentDoc}
`;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     username: // value for 'username'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        RegisterMutation,
        RegisterMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          RegisterMutation,
          RegisterMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    RegisterMutation,
    RegisterMutationVariables
  >;
export const MeDocument = gql`
  query Me {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    {},
    options as any,
  );
}
export type MeQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
