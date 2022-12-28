import { auth } from "$lib/firebase/initFirebase";
import { 
  signOut,
} from 'firebase/auth';

// Log out
const logout = async (event) => {
  await signOut(auth);
  // When cookie/session based login/logout is used
  // In the case of Firebase, we don't use it.
  // console.log(event.cookies)
  // event.cookies.delete('session_id');
  // event.locals.user = null;
  // await page.goto("/");
}

export function load({url}) {

    const nav = [
        { title: "Home", path: "/", protected: false },
        { title: "Register", path: "/register", protected: false },
        { title: "Login", path: "/login", protected: false },
        { title: "My page", path: "/myinfo", protected: true },
    ];

    const url_pathname = url.pathname;
    const nav_item = nav.filter(item => url_pathname === item.path);
    const url_protected = nav_item.length ? nav_item[0].protected: true;

    return {
        site_title: "My Webapp",
        nav,
        url_pathname,
        url_protected,
        logout,
    };
}
