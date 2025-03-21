import { ApolloLink, HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';
import { getSession } from 'next-auth/react';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

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

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(httpLink),
          ])
        : authLink.concat(httpLink),
  });
});
