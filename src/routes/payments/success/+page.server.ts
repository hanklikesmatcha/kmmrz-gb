import { KMMRZ_BE_URL, SEND_EMAIL } from "$env/static/private";
import { sendEmails } from "$lib/utils/send-emails";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { dev } from "$app/environment";

export const load: PageServerLoad = async (event) => {
  const orderId = event.request.url.split("?")[1].split("order_id=")[1];
  let order;
  try {
    const resFromServer = await fetch(
      `${KMMRZ_BE_URL}/orders/${orderId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        }
      }
    );
    order = await resFromServer.json();
  } catch (err) {
    console.log(err);
    throw error(500, {
      message:
        "Not able to find the order, please contact the customer service to ensure the oder has gone through.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
  if (order.status !== "PAID") {
    if (SEND_EMAIL || !dev) {
      try {
        await sendEmails(
          {
            email: order.owner.email,
            name: order.owner.name,
          },
          {} // add an empty object as the second argument
        );
      } catch (err) {
        console.log(err);
        throw error(500, {
          message: "Internal server error",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }

    try {
      const resFromServer = await fetch(`${KMMRZ_BE_URL}/orders/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: order.id,
          status: "PAID",
        }),
      });
      await resFromServer.json();
    } catch (err) {
      console.log(err);
      throw error(500, {
        message:
          "Not able to find the order, please contact the customer service to ensure the oder has gone through.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  return {
    order: order,
    session: event.locals.getSession(),
  };
};
