<script>
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
  import logo from '$lib/assets/logo-no-background.svg';
  
  $: userSignedIn = $page.data.session != null;

</script>

<nav class="bg-gradient-to-b from-pink-300 to-purple-100 via-blue-100 text-white p-0 m-0">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/">
      <img src={logo} alt="Logo" class="w-24 h-24 p-0 m-0" />
    </a>
    {#if userSignedIn}
      <button
        class="btn btn-ghost btn-sm"
        on:click={() => {
          // Perform sign-out logic here
          // For example, clear session, log out, or redirect to a sign-out page
          document.cookie = ''
          signOut();
        }}
      >
        Sign Out
      </button>
    {:else}
      <button
        class="btn btn-ghost btn-sm"
        on:click={() => {
          // Perform sign-out logic here
          // For example, clear session, log out, or redirect to a sign-out page
          signIn("google");
        }}
      >
        Sign In
      </button>
    {/if}
  </div>
</nav>
