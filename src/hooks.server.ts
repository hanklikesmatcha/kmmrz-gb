import { SvelteKitAuth } from "@auth/sveltekit";
import { sequence } from "@sveltejs/kit/hooks";
import Google from "@auth/core/providers/google";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_SECRET_32,
} from "$env/static/private";
import { redirect } from "@sveltejs/kit";

const protectedRoutePrefixes = ["/campaigns", "/products"];

async function authorization({
  event,
  resolve,
}: {
  event: App.Event;
  resolve: Function;
}) {
  const role = event.cookies.get("role");
  const session = await event.locals.getSession();
  if (!session && role) {
    event.cookies.delete("role");
  }
  const isProtectedRoute = protectedRoutePrefixes.some((prefix) =>
    event.url.pathname.includes(prefix)
  );

  if (isProtectedRoute) {
    const redirectURL = new URL(event.request.url);
    if (!session) {
      throw redirect(303, `/sign-in?returnTo=${redirectURL.pathname}`);
    }
    if (session.user.email === "szuhan.eng@gmail.com") {
      session.user.role = "ADMIN";
    }
    event.locals.user = session?.user;
  }

  return resolve(event);
}

export const handle = sequence(
  SvelteKitAuth({
    providers: [
      Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        else if (url.includes("returnTo")) {
          const returnTo = new URL(url).searchParams.get("returnTo");
          return `${baseUrl}${returnTo}`;
        }
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
    secret: AUTH_SECRET_32,
    session: {
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
    pages: {
      signIn: "/signin",
      signOut: "/signout",
    },
  }),
  authorization
);
