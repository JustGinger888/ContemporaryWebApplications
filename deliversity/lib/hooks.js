import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore";


// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(getAuth());
  const [username, setUsername] = useState(null);

  useEffect(async () =>  {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, user.uid, "username");
      unsubscribe = await getDoc(ref)

      if (unsubscribe.exists()) {
        console.log("Document data:", unsubscribe.data());
        setUsername(unsubscribe.data()?.username)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}