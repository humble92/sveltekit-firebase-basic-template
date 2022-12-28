<script>
  import "../app.postcss";
  import Nav from "$lib/components/Nav.svelte";
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { auth } from "$lib/firebase/initFirebase";
  import { 
    onAuthStateChanged, 
  } from 'firebase/auth';
  import { goto } from '$app/navigation';

  export let data;

  // Monitor auth state
  let isLogged;
  const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        isLogged = true;
      }
      else {
        isLogged = false;
      }
    })
  }
  monitorAuthState();

  // Client-side redirect
  // TODO: binking issue before redirect
  $: if (browser) {
    if (data.url_protected && !isLogged) {
      goto('/login')
    }
  }

  const logout = data.logout;
  const site_title = data.site_title;
  let protectedDisplay = "none";
  $: protectedDisplay = isLogged? "block": "none";
</script>

<svelte:head>
  <title>{$page.data.title ?? data.title ?? site_title}</title>
</svelte:head>

<Nav nav={data.nav} {site_title} isLogged={isLogged} on:logout={logout}>
  <slot />
</Nav>
