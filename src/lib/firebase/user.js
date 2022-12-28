import { db } from "$lib/firebase/initFirebase";
import { ref, onValue } from 'firebase/database';

export function getSessionUser(session_id) {
    const reference = ref(db, 'sessions/' + session_id);

    let data = null;
    onValue(reference, (snapshot) => {
        data = snapshot.val();
    });

    return data;
}