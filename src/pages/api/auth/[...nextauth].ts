import NextAuth, { AuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import GoogleProvider from "next-auth/providers/google";
import { addUser } from "@src/components/func/RequestFuncs";
import { UserType } from "@src/static/types/UserType";
import { randomBytes, randomUUID } from "crypto";

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
          // provider: "google",
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
          // provider: "twitch",
        };
      },
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
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
      session.user.id = token.sub;
      if (token.picture.includes("lh3.googleusercontent.com"))
        session.user.provider = "google";
      if (token.picture.includes("static-cdn.jtvnw.net"))
        session.user.provider = "twitch";

      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },

  events: {
    //   async signIn(message) { /* on successful sign in */ },
    //   async signOut(message) { /* on signout */ },
    //   async createUser(message) { /* user created */ },
    //   async updateUser(message) { /* user updated - e.g. their email was verified */ },
    //   async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message: any) {},
  },

  debug: false,
};

export default NextAuth(authOptions);
