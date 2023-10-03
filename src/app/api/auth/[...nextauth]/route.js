import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios from '../../../../utils/index';
import { setCookie } from 'nookies';

export const authOptions = {
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        if (!credentials.email || !credentials.password) return;
        // const { data: user } = await axios.post('/auth/login', {
        //   email: credentials.email,
        //   password: credentials.password,
        // });

        const response = await axios.post('/auth/login', {
          email: credentials.email,
          password: credentials.password,
        });
        response.headers['set-cookie'];
        console.log(response.headers['set-cookie']);
        if (response.data.user) {
          return { user: response.data.user, token: response.data.token };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      const providerName = account?.provider;
      console.log('Provider Name:', providerName);
      if (providerName === 'facebook') {
        if (!token.isUpdated) {
          console.log('token.sub', token.sub, token);
          const { data } = await axios.post('/auth/oauth', { id: token?.sub });
          token.isUpdated = true;
          console.log(data);

          token.isNewUser = data?.isNewUser;
          token.token = data.token;
          token.user = data.user;
        }
      } else if (providerName === 'google') {
        if (!token.isUpdated) {
          console.log('token.sub', token.sub, token);
          const { data } = await axios.post('/auth/oauth', { id: token?.sub });
          token.isUpdated = true;
          console.log(data);

          token.isNewUser = data?.isNewUser;
          token.token = data.token;
          token.user = data.user;
        }
      } else {
        if (user) {
          return {
            ...token,
            ...user,
          };
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log;
      return token;
    },
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
