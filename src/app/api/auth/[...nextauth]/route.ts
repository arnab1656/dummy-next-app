import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "role", type: "text" },
      },
      authorize(credentials, req) {
        if (
          credentials?.username === "arnab" &&
          credentials?.password === "password" &&
          credentials?.role === "hero"
        ) {
          return {
            id: "123",
            email: "Arnab",
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
