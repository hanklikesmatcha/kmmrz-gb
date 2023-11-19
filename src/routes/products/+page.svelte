<!-- src/routes/Products.svelte -->
<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="py-8 px-4">
    <h1 class="text-3xl font-semibold mb-4">Products</h1>
  
    <!-- DaisyUI Table component -->
    <table class="table w-full">
      <thead>
        <tr>
          <th class="font-semibold"></th>
          <th class="font-semibold">Name</th>
          <th class="font-semibold">Description</th>
          <th class="font-semibold">Price</th>
          <th class="font-semibold">Discount</th>
        </tr>
      </thead>
      <tbody>
        {#if data.products.length === 0}
          <tr>
            <td colspan="4" class="text-center">No products found</td>
          </tr>
        {/if}
        {#each data.products as product (product.id)}
          <tr>
            <td>
                <!-- Display the product image/avatar -->
                <img src={product.image} alt={product.name} class="w-16 h-16 object-cover rounded" />
              </td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.discount}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
