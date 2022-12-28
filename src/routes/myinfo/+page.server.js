// When session is controlled by cookie.
// onAuthStateChanged of Firebase is used here instead.
// 
// import { getSessionUser } from '$lib/firebase/user';
// import { redirect } from '@sveltejs/kit';

// export async function load({ cookies }) {
//     const user = getSessionUser(cookies.get('session_id'));
//     if (!user) {
//         throw redirect(307, '/login');
//     }
// }