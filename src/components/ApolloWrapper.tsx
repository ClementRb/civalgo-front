'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
} from '@apollo/experimental-nextjs-app-support';
import { getSession } from 'next-auth/react';

function makeClient() {
  const authLink = new ApolloLink(async (operation, forward) => {
    const session = await getSession(); // Retrieve session from NextAuth
    const { accessToken } = session as unknown as Record<string, string>;

    operation.setContext({
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: 'http://localhost:3003/graphql',
    fetchOptions: { cache: 'force-cache' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

// you need to create a component to wrap your app in
export function ApolloClientProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
