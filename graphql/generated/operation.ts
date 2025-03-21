import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  user: UserGql;
};

export type CheckEventInput = {
  siteId: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export enum CheckInType {
  CheckIn = 'CHECK_IN',
  CheckOut = 'CHECK_OUT'
}

export type CreateSiteInput = {
  name: Scalars['String']['input'];
};

export type EventGql = {
  __typename?: 'EventGql';
  id: Scalars['ID']['output'];
  site: SiteGql;
  siteId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  type: CheckInType;
  worker: UserGql;
  workerId: Scalars['String']['output'];
};

export type FilterEventsInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  siteId?: InputMaybe<Scalars['String']['input']>;
  workerId?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkIn: EventGql;
  checkOut: EventGql;
  createSite: SiteGql;
  login: AuthResponse;
  signUp: UserGql;
};


export type MutationCheckInArgs = {
  checkEventInput: CheckEventInput;
};


export type MutationCheckOutArgs = {
  checkEventInput: CheckEventInput;
};


export type MutationCreateSiteArgs = {
  createSiteInput: CreateSiteInput;
};


export type MutationLoginArgs = {
  authInput: AuthInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  eventsBySiteId: Array<EventGql>;
  eventsByWorkerId: Array<EventGql>;
  listCheckInUsers: Array<UserGql>;
  listEvents: Array<EventGql>;
  sites: Array<SiteGql>;
  user: UserGql;
  workers: Array<UserGql>;
};


export type QueryEventsBySiteIdArgs = {
  siteId: Scalars['String']['input'];
};


export type QueryEventsByWorkerIdArgs = {
  workerId: Scalars['String']['input'];
};


export type QueryListEventsArgs = {
  filters: FilterEventsInput;
};


export type QueryUserArgs = {
  userId: Scalars['String']['input'];
};

export enum Role {
  Supervisor = 'SUPERVISOR',
  Worker = 'WORKER'
}

export type SignUpInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type SiteGql = {
  __typename?: 'SiteGql';
  events: Array<EventGql>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  workers: Array<UserGql>;
};

export type UserGql = {
  __typename?: 'UserGql';
  email: Scalars['String']['output'];
  events: Array<EventGql>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  role: Role;
};

export type CheckInMutationVariables = Exact<{
  checkInEventMutation: CheckEventInput;
}>;


export type CheckInMutation = { __typename?: 'Mutation', checkIn: { __typename?: 'EventGql', id: string, siteId: string, timestamp: any, type: CheckInType } };

export type CheckOutMutationVariables = Exact<{
  checkOutEventMutation: CheckEventInput;
}>;


export type CheckOutMutation = { __typename?: 'Mutation', checkOut: { __typename?: 'EventGql', id: string, siteId: string, timestamp: any, type: CheckInType } };

export type EventsByWorkerIdQueryVariables = Exact<{
  workerId: Scalars['String']['input'];
}>;


export type EventsByWorkerIdQuery = { __typename?: 'Query', eventsByWorkerId: Array<{ __typename?: 'EventGql', id: string, timestamp: any, type: CheckInType, site: { __typename?: 'SiteGql', name: string, id: string, location?: string | null } }> };

export type ListCheckInUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCheckInUsersQuery = { __typename?: 'Query', listCheckInUsers: Array<{ __typename?: 'UserGql', email: string, id: string, name: string, role: Role, events: Array<{ __typename?: 'EventGql', timestamp: any, type: CheckInType, site: { __typename?: 'SiteGql', name: string, location?: string | null } }> }> };

export type ListEventsQueryVariables = Exact<{
  filterEventsInput: FilterEventsInput;
}>;


export type ListEventsQuery = { __typename?: 'Query', listEvents: Array<{ __typename?: 'EventGql', id: string, timestamp: any, type: CheckInType, site: { __typename?: 'SiteGql', name: string, id: string, location?: string | null }, worker: { __typename?: 'UserGql', id: string, name: string, role: Role, email: string } }> };

export type ListSitesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListSitesQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'SiteGql', id: string, name: string, location?: string | null }> };

export type ListWorkersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListWorkersQuery = { __typename?: 'Query', workers: Array<{ __typename?: 'UserGql', id: string, name: string, email: string, role: Role }> };


export const CheckInDocument = gql`
    mutation checkIn($checkInEventMutation: CheckEventInput!) {
  checkIn(checkEventInput: $checkInEventMutation) {
    id
    siteId
    timestamp
    type
  }
}
    `;
export type CheckInMutationFn = Apollo.MutationFunction<CheckInMutation, CheckInMutationVariables>;

/**
 * __useCheckInMutation__
 *
 * To run a mutation, you first call `useCheckInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkInMutation, { data, loading, error }] = useCheckInMutation({
 *   variables: {
 *      checkInEventMutation: // value for 'checkInEventMutation'
 *   },
 * });
 */
export function useCheckInMutation(baseOptions?: Apollo.MutationHookOptions<CheckInMutation, CheckInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckInMutation, CheckInMutationVariables>(CheckInDocument, options);
      }
export type CheckInMutationHookResult = ReturnType<typeof useCheckInMutation>;
export type CheckInMutationResult = Apollo.MutationResult<CheckInMutation>;
export type CheckInMutationOptions = Apollo.BaseMutationOptions<CheckInMutation, CheckInMutationVariables>;
export const CheckOutDocument = gql`
    mutation checkOut($checkOutEventMutation: CheckEventInput!) {
  checkOut(checkEventInput: $checkOutEventMutation) {
    id
    siteId
    timestamp
    type
  }
}
    `;
export type CheckOutMutationFn = Apollo.MutationFunction<CheckOutMutation, CheckOutMutationVariables>;

/**
 * __useCheckOutMutation__
 *
 * To run a mutation, you first call `useCheckOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkOutMutation, { data, loading, error }] = useCheckOutMutation({
 *   variables: {
 *      checkOutEventMutation: // value for 'checkOutEventMutation'
 *   },
 * });
 */
export function useCheckOutMutation(baseOptions?: Apollo.MutationHookOptions<CheckOutMutation, CheckOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckOutMutation, CheckOutMutationVariables>(CheckOutDocument, options);
      }
export type CheckOutMutationHookResult = ReturnType<typeof useCheckOutMutation>;
export type CheckOutMutationResult = Apollo.MutationResult<CheckOutMutation>;
export type CheckOutMutationOptions = Apollo.BaseMutationOptions<CheckOutMutation, CheckOutMutationVariables>;
export const EventsByWorkerIdDocument = gql`
    query eventsByWorkerId($workerId: String!) {
  eventsByWorkerId(workerId: $workerId) {
    id
    site {
      name
      id
      location
    }
    timestamp
    type
  }
}
    `;

/**
 * __useEventsByWorkerIdQuery__
 *
 * To run a query within a React component, call `useEventsByWorkerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsByWorkerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsByWorkerIdQuery({
 *   variables: {
 *      workerId: // value for 'workerId'
 *   },
 * });
 */
export function useEventsByWorkerIdQuery(baseOptions: Apollo.QueryHookOptions<EventsByWorkerIdQuery, EventsByWorkerIdQueryVariables> & ({ variables: EventsByWorkerIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsByWorkerIdQuery, EventsByWorkerIdQueryVariables>(EventsByWorkerIdDocument, options);
      }
export function useEventsByWorkerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsByWorkerIdQuery, EventsByWorkerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsByWorkerIdQuery, EventsByWorkerIdQueryVariables>(EventsByWorkerIdDocument, options);
        }
export function useEventsByWorkerIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EventsByWorkerIdQuery, EventsByWorkerIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventsByWorkerIdQuery, EventsByWorkerIdQueryVariables>(EventsByWorkerIdDocument, options);
        }
export type EventsByWorkerIdQueryHookResult = ReturnType<typeof useEventsByWorkerIdQuery>;
export type EventsByWorkerIdLazyQueryHookResult = ReturnType<typeof useEventsByWorkerIdLazyQuery>;
export type EventsByWorkerIdSuspenseQueryHookResult = ReturnType<typeof useEventsByWorkerIdSuspenseQuery>;
export type EventsByWorkerIdQueryResult = Apollo.QueryResult<EventsByWorkerIdQuery, EventsByWorkerIdQueryVariables>;
export const ListCheckInUsersDocument = gql`
    query listCheckInUsers {
  listCheckInUsers {
    email
    id
    name
    role
    events {
      timestamp
      type
      site {
        name
        location
      }
    }
  }
}
    `;

/**
 * __useListCheckInUsersQuery__
 *
 * To run a query within a React component, call `useListCheckInUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCheckInUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCheckInUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCheckInUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListCheckInUsersQuery, ListCheckInUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCheckInUsersQuery, ListCheckInUsersQueryVariables>(ListCheckInUsersDocument, options);
      }
export function useListCheckInUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCheckInUsersQuery, ListCheckInUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCheckInUsersQuery, ListCheckInUsersQueryVariables>(ListCheckInUsersDocument, options);
        }
export function useListCheckInUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListCheckInUsersQuery, ListCheckInUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListCheckInUsersQuery, ListCheckInUsersQueryVariables>(ListCheckInUsersDocument, options);
        }
export type ListCheckInUsersQueryHookResult = ReturnType<typeof useListCheckInUsersQuery>;
export type ListCheckInUsersLazyQueryHookResult = ReturnType<typeof useListCheckInUsersLazyQuery>;
export type ListCheckInUsersSuspenseQueryHookResult = ReturnType<typeof useListCheckInUsersSuspenseQuery>;
export type ListCheckInUsersQueryResult = Apollo.QueryResult<ListCheckInUsersQuery, ListCheckInUsersQueryVariables>;
export const ListEventsDocument = gql`
    query listEvents($filterEventsInput: FilterEventsInput!) {
  listEvents(filters: $filterEventsInput) {
    id
    site {
      name
      id
      location
    }
    timestamp
    worker {
      id
      name
      role
      email
    }
    type
  }
}
    `;

/**
 * __useListEventsQuery__
 *
 * To run a query within a React component, call `useListEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListEventsQuery({
 *   variables: {
 *      filterEventsInput: // value for 'filterEventsInput'
 *   },
 * });
 */
export function useListEventsQuery(baseOptions: Apollo.QueryHookOptions<ListEventsQuery, ListEventsQueryVariables> & ({ variables: ListEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListEventsQuery, ListEventsQueryVariables>(ListEventsDocument, options);
      }
export function useListEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListEventsQuery, ListEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListEventsQuery, ListEventsQueryVariables>(ListEventsDocument, options);
        }
export function useListEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListEventsQuery, ListEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListEventsQuery, ListEventsQueryVariables>(ListEventsDocument, options);
        }
export type ListEventsQueryHookResult = ReturnType<typeof useListEventsQuery>;
export type ListEventsLazyQueryHookResult = ReturnType<typeof useListEventsLazyQuery>;
export type ListEventsSuspenseQueryHookResult = ReturnType<typeof useListEventsSuspenseQuery>;
export type ListEventsQueryResult = Apollo.QueryResult<ListEventsQuery, ListEventsQueryVariables>;
export const ListSitesDocument = gql`
    query listSites {
  sites {
    id
    name
    location
  }
}
    `;

/**
 * __useListSitesQuery__
 *
 * To run a query within a React component, call `useListSitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListSitesQuery(baseOptions?: Apollo.QueryHookOptions<ListSitesQuery, ListSitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSitesQuery, ListSitesQueryVariables>(ListSitesDocument, options);
      }
export function useListSitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSitesQuery, ListSitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSitesQuery, ListSitesQueryVariables>(ListSitesDocument, options);
        }
export function useListSitesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListSitesQuery, ListSitesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListSitesQuery, ListSitesQueryVariables>(ListSitesDocument, options);
        }
export type ListSitesQueryHookResult = ReturnType<typeof useListSitesQuery>;
export type ListSitesLazyQueryHookResult = ReturnType<typeof useListSitesLazyQuery>;
export type ListSitesSuspenseQueryHookResult = ReturnType<typeof useListSitesSuspenseQuery>;
export type ListSitesQueryResult = Apollo.QueryResult<ListSitesQuery, ListSitesQueryVariables>;
export const ListWorkersDocument = gql`
    query listWorkers {
  workers {
    id
    name
    email
    role
  }
}
    `;

/**
 * __useListWorkersQuery__
 *
 * To run a query within a React component, call `useListWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListWorkersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListWorkersQuery(baseOptions?: Apollo.QueryHookOptions<ListWorkersQuery, ListWorkersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListWorkersQuery, ListWorkersQueryVariables>(ListWorkersDocument, options);
      }
export function useListWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListWorkersQuery, ListWorkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListWorkersQuery, ListWorkersQueryVariables>(ListWorkersDocument, options);
        }
export function useListWorkersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListWorkersQuery, ListWorkersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListWorkersQuery, ListWorkersQueryVariables>(ListWorkersDocument, options);
        }
export type ListWorkersQueryHookResult = ReturnType<typeof useListWorkersQuery>;
export type ListWorkersLazyQueryHookResult = ReturnType<typeof useListWorkersLazyQuery>;
export type ListWorkersSuspenseQueryHookResult = ReturnType<typeof useListWorkersSuspenseQuery>;
export type ListWorkersQueryResult = Apollo.QueryResult<ListWorkersQuery, ListWorkersQueryVariables>;