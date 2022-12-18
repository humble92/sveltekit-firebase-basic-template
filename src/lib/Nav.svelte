<script>
    import { page } from "$app/stores";
    console.log($page);

    const nav = [
        { title: "홈", path: "/" },
        { title: "회원가입", path: "/register" },
        { title: "로그인", path: "/login" },
        { title: "직원목록", path: "/employee" },
        { title: "비밀번호변경", path: "/myinfo" },
        { title: "출퇴근", path: "/commute" },
        { title: "출퇴근 이력조회", path: "/commute-history" },
        { title: "로그아웃", path: "/" },
    ]

    export let site_title;
</script>


<div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-base-300">
      <div class="flex-none lg:hidden">
        <label for="my-drawer-3" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div class="flex-1 px-2 mx-2">{site_title}</div>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-horizontal">
          <!-- Navbar menu content here -->
          {#each nav as item}
          <li>
            <a class:active={$page.url.pathname === item.path} href={item.path}>{item.title}</a>
          </li>
          {/each}
        </ul>
      </div>
    </div>
    <!-- Page content here -->
    <slot />
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay"></label> 
    <ul class="menu p-4 w-80 bg-base-100">
      <!-- Sidebar content here -->
      {#each nav as item}
        <li>
          <a class:active={$page.url.pathname === item.path} href={item.path}>{item.title}</a>
        </li>
      {/each}
    </ul>
    
  </div>
</div>
