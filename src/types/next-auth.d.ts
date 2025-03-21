import { Role } from '../../graphql/generated/operation';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    user: {
      name: string;
      id: string;
      email: string;
      role: Role;
    };
    expires: string;
  }
}
