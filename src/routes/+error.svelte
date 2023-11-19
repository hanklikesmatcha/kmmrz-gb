<script>
  import { page } from "$app/stores";
</script>

<div class="min-h-screen flex items-center justify-center background-color">
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-semibold text-color mb-4">Error {$page.status}</h1>
    <p class="text-gray-600 text-color">
      An error occurred: {$page?.error?.message}
    </p>
    <!-- <button class="mt-4 px-4 py-2 btn hover:bg-blue-600">Go back</button> -->
  </div>
</div>
