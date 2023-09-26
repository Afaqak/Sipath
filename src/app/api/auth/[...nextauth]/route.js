import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import axios from '../../../../utils/index';

export const authOptions = {
  pages: {
    signIn: '/sign-in',
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
  ],
  callbacks: {
    async signIn({ user, token }) {
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const { data } = await axios.post('/auth/oauth', { id: token?.sub });
      if (!token.isUpdated) {
        console.log(data, 'data');
        token.isNewUser = data?.isNewUser;
        token.token = data.token;
        token.user = data.user;
        console.log(data, 'data');
        token.isUpdated = true;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.isNewUser = token?.isNewUser;
      session.token = token?.token;
      session.user = token.user;
      console.log(session, 'session');
      return session;
    },
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
