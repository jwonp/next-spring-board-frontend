import NextAuth, { AuthOptions } from "next-auth";
import { setGoogle, setTwitch } from "@src/components/func/setDataByProvider";
import TwitchProvider from "next-auth/providers/twitch";
import GoogleProvider from "next-auth/providers/google";
import { Provider, ProviderType } from "@src/static/types/dataTypes";
import { addUserProfile } from "@src/components/func/sendRequest";

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
      const provider = account?.provider as ProviderType;

      console.log("gggggggg");
      console.log({ ...user, provider: provider });

      // switch (Provider[provider]) {
      //   case Provider.google:
      //     addUserProfile(
      //       setGoogle(
      //         profile?.email as string,
      //         user.id,
      //         profile?.name as string
      //       )
      //     );
      //     break;
      //   case Provider.twitch:
      //     addUserProfile(setTwitch(profile?.email as string, user.id));
      //     break;
      // }

      // isLoggedInBefore(ac)
      return true;
    },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },

  events: {},

  debug: true,
};

export default NextAuth(authOptions);
