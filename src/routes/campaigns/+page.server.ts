import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { KMMRZ_BE_URL } from "$env/static/private";

export const load: PageServerLoad = async (event: any) => {
  // const userRole: string | undefined = event.cookies.get('role')

  const user = await event.locals.user

  if (user.role !== 'ADMIN') {
    throw error(403, { message: "Forbidden", code: "FORBIDDEN" });
  } 
  try {
    const res = await fetch(`${KMMRZ_BE_URL}/campaigns`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    
    return {
        campaigns: data,
        session: event.locals.getSession(),
    };
  } catch (err) {
    console.log(err);
    throw error(500, { message: "Internal server error", code: "INTERNAL_SERVER_ERROR" });
  }
}
