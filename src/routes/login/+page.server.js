// Note. When form action is used, form submit is handled here.
// In the case of Firebase, we don't use form action.
import { auth, db } from "$lib/firebase/initFirebase";
import { ref, set } from 'firebase/database';
import { getSessionUser } from '$lib/firebase/user';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { uuidv4 as uuid } from '$lib/helpers/utils';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  const user = getSessionUser(cookies.get('session_id'));
  return { user };
}

export const actions = {
    default: async ({ cookies, request, url }) => {

      const data = await request.formData();
      const txtEmail = data.get('email');
      const txtPassword = data.get('password');

      // // To be deleted... Temporary
      // if (cookies.get("session_id")) {
      //   const session_user = getSessionUser(cookies.get("session_id"));
      //   if (session_user && session_user.email === txtEmail) {
      //       console.log("user logged in... return", cookies.get("session_id"), session_user.email);
      //       throw redirect(307, '/');
      //       return;
      //   }
      // }

      try {
        
        // The code following is only working in client side (.svelte) in the case of Firebase.
        const user = await signInWithEmailAndPassword(auth, txtEmail, txtPassword);

        const session_id = uuid();
        const reference = ref(db, 'sessions/' + session_id);
    
        set(reference, {
            accessToken: user.user.accessToken,
            uid: user.user.uid,
            email: user.user.email,
        });
        
        cookies.set('session_id', session_id, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/"
        });

        if (url.searchParams.has('redirectTo')) {
          throw redirect(303, url.searchParams.get('redirectTo'));
        }

        throw redirect(307, '/');
        // return { success: true, session_id: session_id };
      }
      catch(error) {
        console.log(error);
      }
    }
  };

