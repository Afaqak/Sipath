import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '@/utils/index'
import { redirect } from 'next/navigation';


async function refreshAccessToken(token) {
  try {
    const refreshToken = token?.refreshToken;
 

    if (refreshToken) {

      const response = await axios.post('/auth/refresh-token', {
        refreshToken: refreshToken,
      });



      const refreshedToken = response.data.token;
      const expiration_time = response.data.expiration_time;

      return {
        ...token,
        token: refreshedToken,
        expiration_time: expiration_time,
      };
    }


  } catch (error) {

    const responseAfterSignout = await axios.post('/api/auth/signout')

    redirect('/')

  }
}

export const authOptions = {
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

        if (!credentials.email || !credentials.password) return;

        const response = await axios.post('/auth/login', {
          email: credentials.email,
          password: credentials.password,
        });

        if (response.data.user) {

          return {
            user: response.data?.user,
            token: response.data?.token,
            tutor: response.data?.tutor,
            slots:response.data?.slots,
            refreshToken: response.data.refresh_token,
            expiration_time: response?.data.expiration_time
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
   

      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      //  await axios.post('/api/auth/signout')
      if (Date.now() < new Date(token?.expiration_time).getTime()) {
       
        return token
      } else {
        const refreshedToken = await refreshAccessToken(token)
        token.token = refreshedToken?.token
        token.expiration_time = refreshedToken?.expiration_time
      }
      const providerName = account?.provider;

      if (providerName === 'facebook') {
        const { data } = await axios.post('/auth/oauth', { id: token?.sub });


        token.isNewUser = data?.isNewUser;
        token.token = data.token;
        token.slots=data.slots;
        token.tutor = data.tutor;
        token.user = data.user;
        token.token = data?.token
        token.refreshToken = data?.refresh_token
        token.slots=data.slots;
        token.expiration_time = data?.expiration_time

      } else if (providerName === 'google') {


        const { data } = await axios.post('/auth/oauth', { id: token?.sub, email: token.email });
        token.isUpdated = true;

        token.isNewUser = data?.isNewUser;
        token.token = data?.token
        token.expiration_time = data?.expiration_time
        token.token = data.token;
        token.refreshToken = data?.refresh_token
        token.user = data.user;
        token.slots=data.slots;
        token.tutor = data.user;
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
      let { refreshToken, ...newObj } = token;
     
      return newObj;
    },
  },
};
export const handler = NextAuth(authOptions);

// const handler = async function auth(req, res) {
//   console.log(req, res);
//   return await NextAuth(req, res, {
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       }),
//       FacebookProvider({
//         clientId: process.env.FACEBOOK_CLIENT_ID,
//         clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       }),
//       CredentialsProvider({
//         name: 'credentials',
//         credentials: {
//           email: { label: 'email', type: 'text', placeholder: 'jsmith' },
//           password: { label: 'Password', type: 'password' },
//         },
//         async authorize(credentials, req) {
//           console.log(credentials);
//           if (!credentials.email || !credentials.password) return;

//           const response = await axios.post('/auth/login', {
//             email: credentials.email,
//             password: credentials.password,
//           });

//           if (response.data.user) {
//             console.log(response?.data?.token, 'token');
//             return { user: response.data.user, token: response.data.token };
//           } else {
//             return null;
//           }
//         },
//       }),
//     ],

//     callbacks: {
//       async jwt({ token, user, trigger, session }) {
//         if (trigger === 'update') {
//           return { ...token, ...session.user };
//         }

//         const providerName = session?.provider;

//         console.log(session, user, 'here in jwt');
//         if (providerName === 'facebook') {
//           if (!token.isUpdated) {
//             const { data } = await axios.post('/auth/oauth', { id: token?.sub });
//             console.log(data);
//             token.isUpdated = true;
//             token.isNewUser = data?.isNewUser;
//             token.token = data.token;
//             token.user = data.user;
//           }
//         } else if (providerName === 'google') {
//           console.log('token here', token?.isUpdated);
//           if (!token.isUpdated) {
//             console.log('token.sub', token.sub, token);
//             const { data } = await axios.post('/auth/oauth', { id: token?.sub });
//             token.isUpdated = true;
//             console.log(data, 'data');

//             token.isNewUser = data?.isNewUser;
//             token.token = data.token;
//             token.user = data.user;
//           }
//         } else {
//           if (user) {
//             return {
//               ...token,
//               ...user,
//             };
//           }
//         }
//         return token;
//       },
//       async session({ session, token, user }) {
//         return token;
//       },
//     },
//   });
// };

export { handler as GET, handler as POST };
