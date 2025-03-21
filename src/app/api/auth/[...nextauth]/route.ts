import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
              mutation loginMutation {
                login(authInput: { email: "${credentials?.email}", password: "${credentials?.password}" }) {
                  access_token
                  user {
                    email
                    id
                    name
                    role
                  }
                }
              }
            `,
            }),
          });

          if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
          }

          const { data } = await res.json();
          if (data?.login) {
            return {
              ...data.login.user,
              token: data.login.access_token,
              user_data: data.login.user,
            };
          }
          return null;
        } catch (e) {
          console.error('There was an error', e.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user_data;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
