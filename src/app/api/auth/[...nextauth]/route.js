import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { setCookie } from 'nookies';
import axios from '../../../../utils/index';

const handler = async function auth(req, res) {
  console.log(res, res);

  return await NextAuth(req, res, {
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
            console.log(response?.data?.token, 'token');

            setCookie({ res }, 'jwt', JSON.stringify(response.data.token), {
              maxAge: 1 * 24 * 60 * 60,
              path: '/',
              httpOnly: true,
            });
            return { user: response.data.user, token: response.data.token };
          } else {
            return null;
          }
        },
      }),
    ],

    callbacks: {
      async jwt({ token, user, trigger, session }) {
        if (trigger === 'update') {
          return { ...token, ...session.user };
        }

        const providerName = session?.provider;
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
  });
};

export { handler as GET, handler as POST };
