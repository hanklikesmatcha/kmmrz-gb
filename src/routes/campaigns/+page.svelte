<!-- src/routes/campaigns.svelte -->
<script lang="ts">
  import type { PageData } from "./$types";
  
  import { goto } from '$app/navigation';

  export let data: PageData;
  function navigateToCampaign(key: string) {
    goto(`/campaigns/${key}`)
  }
</script>

<div class="py-8 px-4">
  <h1 class="text-3xl font-semibold mb-4">Campaigns</h1>

  <!-- DaisyUI Table component -->
  <table class="table w-full">
    <thead>
      <tr>
        <th class="font-semibold"></th>
        <th class="font-semibold">Name</th>
        <th class="font-semibold">Campaign Slug</th>
        <th class="font-semibold">Description</th>
        <th class="font-semibold">Start Date</th>
        <th class="font-semibold">End Date</th>
        <th class="font-semibold">Product Name</th>
        <th class="font-semibold">Total Purchased</th>
      </tr>
    </thead>
    <tbody>
      {#if data.campaigns.length === 0}
        <tr>
          <td colspan="4" class="text-center">No campaigns found</td>
        </tr>
      {/if}
      {#each data.campaigns as campaign (campaign.id)}
        <tr on:click={() => navigateToCampaign(campaign.key)}>
          <td>
            <div class="w-16 h-16">
              <!-- Display the campaign image/avatar -->
              <img src={campaign.product.image} alt={campaign.product.name} class="w-full h-full object-cover rounded" />
            </div>
          </td>
          <td>{campaign.name}</td>
          <td>{campaign.key}</td>
          <td>{campaign.description}</td>
          <td>{campaign.start_date}</td>
          <td>{campaign.end_date}</td>
          <td>{campaign.product.name}</td>
          <td>{campaign.orders.length}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
