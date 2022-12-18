<script>
    import { page } from "$app/stores";
    console.log($page);

    const nav = [
        { title: "홈", path: "/" },
        { title: "직원목록", path: "/employee" },
        { title: "비밀번호변경", path: "/myinfo" },
        { title: "출퇴근", path: "/commute" },
        { title: "출퇴근 이력조회", path: "/commute-history" },
    ]
</script>

<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <label for="my-drawer" class="btn btn-primary drawer-button">Open menu</label>
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        {#each nav as item}
            <li>
                <a class:active={$page.url.pathname === item.path} href={item.path}>{item.title}</a>
            </li>
        {/each}
      </ul>
    </div>
  </div>

