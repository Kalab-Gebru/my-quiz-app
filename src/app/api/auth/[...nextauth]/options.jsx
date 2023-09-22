import GoogleProvider from "next-auth/providers/google";
import services from "../../../../lib/connect";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        user.id = token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.sub;
      return session;
    },
    async signIn({ profile }) {
      try {
        const user = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
        await services.setUserById(user);
      } catch {}
      return profile;
    },
  },
};
