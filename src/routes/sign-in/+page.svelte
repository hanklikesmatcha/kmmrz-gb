<script lang='ts'>
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData
</script>

<div class="grid place-items-center h-screen">
  <div class="card p-8 max-w-md rounded-lg shadow-lg border-2 border-valentine-500 space-y-6 text-valentine-500">
    <h1 class="text-3xl font-bold text-center">Welcome to Kmmrz Group Buying</h1>
    <div class="text-lg">
      {#if $page.data.session}
        <div class="text-valentine-500 text-center">
          <p class="mb-2">Signed in as:</p>
          <strong>{$page.data.session.user?.name ?? "User"}</strong>
        </div>
        <button on:click={() => signOut()} class="mt-4 bg-blue-500 text-white w-full px-4 py-2 rounded-md">Sign out</button>
      {:else}
        <div class="text-red-600 text-center">You are not signed in</div>
        <button on:click={() => signIn("google")} class="mt-4 bg-blue-500 text-white w-full px-4 py-2 rounded-md">Sign In with Google</button>
      {/if}
    </div>
  </div>
</div>
