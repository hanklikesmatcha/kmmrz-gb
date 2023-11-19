import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { KMMRZ_BE_URL } from "$env/static/private";

export const load: PageServerLoad = async (event) => {
  const userRole: string | undefined = event.cookies.get('role')

  if (userRole !== 'ADMIN') {
    throw error(403, { message: "Forbidden", code: "FORBIDDEN" });
  } 
  try {
    const res = await fetch(`${KMMRZ_BE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    
    return {
        products: data,
        session: event.locals.getSession(),
    };
  } catch (err) {
    console.log(err);
    throw error(500, { message: "Internal server error", code: "INTERNAL_SERVER_ERROR" });
  }
}
