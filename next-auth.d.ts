// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's email address. */
      email?: string;
      /** The user's name. */
      name?: string;
      /** The user's avatar (custom field). */
      avatar?: string;
      /** The user's role (custom field). */
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    /** The user's avatar (custom field). */
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's email address. */
    email?: string;
    /** The user's name. */
    name?: string;
    /** The user's avatar (custom field). */
    avatar?: string;
  }
}
