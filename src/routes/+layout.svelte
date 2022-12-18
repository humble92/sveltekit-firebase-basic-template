<script>
  import "../app.postcss";
  import Nav from "$lib/Nav.svelte";

  const site_title = "근태관리 시스템";
</script>

<svelte:head>
  <title>{site_title}</title>
</svelte:head>

<Nav site_title={site_title}>
  <slot />
</Nav>
