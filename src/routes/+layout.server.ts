import { KMMRZ_BE_URL } from "$env/static/private";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();
  const role = event.cookies.get("role");
  const userEmail = session?.user?.email;

  if (session && !role) {
    try {
      const res = await fetch(`${KMMRZ_BE_URL}/user/email?email=${userEmail}`, {
        method: "GET",
      });
      const existingUser = await res.json();

      if (!existingUser?.email) {
        const res = await fetch(`${KMMRZ_BE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session.user?.name,
            email: session.user?.email,
            image: session.user?.image,
            expires: session?.expires,
            user_type: "CONSUMER",
            role: "USER",
          }),
        });
        const newUser = await res.json();
        event.cookies.set("role", newUser.role, {
          path: "/",
          sameSite: "strict",
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60,
        });
        return {
          session: await event.locals.getSession(),
          redirectURL: event.url.searchParams.get("returnTo"),
        }
      }
      event.cookies.set("role", existingUser.role, {
        path: "/",
        sameSite: "strict",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
      });
      return {
        session: await event.locals.getSession(),
        redirectURL: event.url.searchParams.get("returnTo"),
      };
    } catch (err) {
      console.log(err);
      throw error(500, {
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }

  return {
    session: await event.locals.getSession(),
    redirectURL: event.url.searchParams.get("returnTo"),
  }
};
