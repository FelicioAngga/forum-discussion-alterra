import FirebaseConfiguration from '@/firebase/FirebaseConfiguration'
import { loggedInUserFailed, loggedInUserSuccess } from '@/redux/slices/authSlice';
import { useDispatch } from '@/redux/store';
import React, { useEffect } from 'react'


export default function ({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch();
  const auth = FirebaseConfiguration.auth;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        dispatch(loggedInUserFailed());
        return;
      }
      dispatch(loggedInUserSuccess({ user_uid: user.uid, email: user.email, photoURL: user.photoURL, username: user.displayName }));
    });
  }, [])

  return (
    <>
      {children}
    </>
  )
}
