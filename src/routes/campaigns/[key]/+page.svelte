<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import type { PageData } from "./$types";
  import { formatTime } from "$lib/utils/timer";
  export let data: PageData;

  // Helper function to format the remaining time
  // Store to track remaining time
  const remainingTime = writable(0);
  const loading = writable(true); // Loading state

  // Update remaining time every second
  // Update remaining time every second
  let interval;
  $: {
    interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const endTime = Math.floor(new Date(campaign.end_date).getTime() / 1000);
      const timeLeft = endTime - currentTime;

      if (timeLeft > 0) {
        remainingTime.set(timeLeft);
        loading.set(false); // Set loading to false when countdown is calculated
      } else {
        remainingTime.set(0);
        loading.set(false);
      }
    }, 1000);
  }

  $: campaign = $page.data.campaign;
  let quantity = 1; // Default quantity
</script>

<div
  class="flex justify-center items-center min-h-screen bg-gradient-to-b from-pink-300 to-pink-200"
>
  <div class="w-full md:w-2/5 lg:w-1/4">
    <div
      class="bg-white shadow-lg rounded-lg p-4 bg-gradient-to-b from-purple-300 to-yellow-100 via-slate-50"
    >
      <div class="mb-4">
        <div class="grid grid-cols-2 my-2">
          <img
            src={campaign.product.image}
            alt={campaign.name}
            class="w-full rounded-lg col-span-2 mb-4"
          />
          <div class="grid grid-rows-3 grid-cols-1 gap-2 col-span-2 my-2">
            <span
              class="countdown font-mono row-start-1 text-2xl col-span-2 mx-auto text-center text-pink-500"
            >
              {#if $loading}
                Loading...
              {:else if $remainingTime > 0}
                {formatTime($remainingTime)}
              {:else}
                Auction Ended
              {/if}
            </span>
            <a
              class="font-bold text-lg row-start-2 col-start-1"
              href={campaign.product.brand_url}
            >
              {campaign.product.brand_name}
            </a>
            <div class="flex items-center justify-left row-start-3 col-start-1">
              <button class="badge badge-ghost"
                >Status: {campaign.is_active ? "Active" : "Closed"}</button
              >
            </div>
          </div>
        </div>
        <div class="mb-4">
          <div class="collapse bg-base-200 collapse-arrow">
            <input type="checkbox" class="peer" />
            <div
              class="collapse-title bg-gradient-to-r from-fuchsia-100 to-light-pink-50 to-fuchsia-100 text-primary-content peer-checked:bg-gradient-to-r peer-checked:from-cyan-50 peer-checked:to-light-pink-50 peer-checked:to-cyan-50 peer-checked:text-secondary-content"
            >
              Details
            </div>
            <div
              class="collapse-content bg-gradient-to-r from-cyan-100 to-light-pink-50 to-cyan-100 text-primary-content peer-checked:bg-gradient-to-r peer-checked:from-cyan-50 peer-checked:to-light-pink-50 peer-checked:to-cyan-50 peer-checked:text-secondary-content"
            >
              <ol class="list-inside">
                <li class="list-disc">
                  Product Name: {campaign.product.name}
                </li>
                <li class="list-disc">
                  Retail Price: {campaign.product.retail_price}
                </li>
                <li class="list-disc">
                  Save: ${campaign.product.discount} each
                </li>
                <li class="list-disc">
                  ETA Pick-up time: {campaign.pick_up_time}
                </li>
                <li class="list-disc">
                  Return in {campaign.return_time} days
                </li>
                <li class="list-disc">
                  Description: {campaign.product.description}
                </li>
              </ol>
            </div>
          </div>
        </div>
        <form
          method="POST"
          on:submit|preventDefault
          use:enhance={async ({ formElement, formData, action, cancel }) => {
            return async ({ result }) => {
              // `result` is an `ActionResult` object
              if (
                "data" in result &&
                result.data &&
                typeof result.data.checkoutURL === "string"
              ) {
                goto(result.data.checkoutURL);
              } else {
                await applyAction(result);
              }
            };
          }}
        >
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              disabled
              type="number"
              id="price"
              name="price"
              class="mt-1 p-2 rounded-md w-1/4 text-gray-800"
              bind:value={campaign.product.price}
            />
            <!-- Add a hidden input field to pass the price when submitting the form -->
            <input
              type="hidden"
              id="hiddenPrice"
              name="hiddenPrice"
              bind:value={campaign.product.price}
            />
            <input
              type="hidden"
              id="hiddenProductName"
              name="hiddenProductName"
              bind:value={campaign.product.name}
            />
            <input
              type="hidden"
              id="hiddenUserEmail"
              name="hiddenUserEmail"
              bind:value={data.session.user.email}
            />
            <input
              type="hidden"
              id="hiddenUsername"
              name="hiddenUsername"
              bind:value={data.session.user.name}
            />
            <label
              for="quantity"
              class="block text-sm font-medium text-gray-700"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              class="mt-1 p-2 rounded-md w-1/4 text-gray-800"
              bind:value={quantity}
              min="1"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary bg-gradient-to-b from-pink-300 to-purple-200 via-slate-100"
          >
            Purchase
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
