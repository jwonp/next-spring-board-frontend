import NextAuth, { AuthOptions } from "next-auth";

import TwitchProvider from "next-auth/providers/twitch";
import GoogleProvider from "next-auth/providers/google";

import { addUser } from "@src/components/func/sendRequest";
import { UserType } from "@src/static/types/UserType";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.preferred_username,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.SECRET,
  },

  pages: {
    // signIn: "/auth/signin", // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: "/auth/new-user", // If set, new users will be directed here on first sign in
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const provider = account?.provider;

      const userData: UserType = { ...user, provider: provider };

      addUser(userData);

      return true;
    },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, token, user }) {
      // session.user.id = user.id;
      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },

  events: {},

  debug: false,
};

export default NextAuth(authOptions);
