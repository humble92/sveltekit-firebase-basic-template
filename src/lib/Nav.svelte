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

<nav>
    <ul>
        {#each nav as item}
            <li>
                <a class:active={$page.url.pathname === item.path} href={item.path}>{item.title}</a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    ul {display: flex; list-style: none;}
    li {margin-right: 1em; }
    li a {text-decoration: none;}
    li:hover { text-decoration: underline;}
</style>
