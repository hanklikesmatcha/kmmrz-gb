import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { KMMRZ_BE_URL, PAYMENT_URL } from "$env/static/private";

export const load: PageServerLoad = async (event: any) => {
  try {
    const res = await fetch(`${KMMRZ_BE_URL}/campaigns/${event.params.key}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    if(!data) {
      throw error(400, {
        message: "Campaign not found",
        code: "BAD_REQUEST",
      });
    }
    return {
      campaign: data,
      session: event.locals.getSession(),
    };
  } catch (err) {
    console.log(err);
    throw error(400, {
      message: "Campaign not found",
      code: "BAD_REQUEST",
    });
  }
};

export const actions = {
  default: async (event: any) => {
    const formData = await event.request.formData();
    const price = formData.get("hiddenPrice");
    const quantity = formData.get("quantity");
    const productName = formData.get("hiddenProductName");
    const recipient = {
      name: formData.get("hiddenUsername"),
      email: formData.get("hiddenUserEmail"),
    };

    try {
      // Create an order and a payment intent
      const response = await fetch(PAYMENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaign_key: event.params.key,
          quantity: quantity,
          price: price,
          product_name: productName,
          owner_email: recipient.email,
          owner_name: recipient.name,
        }),
      });

      const data = await response.json();
      const checkoutUrl = JSON.parse(data);
      return {
        success: true,
        checkoutURL: checkoutUrl.url,
        recipient: recipient,
      };
    } catch (err) {
      console.log(err);
      throw error(500, {
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  },
} satisfies Actions;
