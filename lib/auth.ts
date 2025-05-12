import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "@/db";
import { schema } from "@/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "Anonypost",
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [nextCookies(), username()],
});
export const { getSession } = auth.api;

export type SessionData = (typeof auth)["$Infer"]["Session"];
