import FirebaseConfiguration from '@/firebase/FirebaseConfiguration'
import { loggedInUserFailed, loggedInUserSuccess } from '@/redux/slices/authSlice';
import { useDispatch } from '@/redux/store';
import React, { useEffect } from 'react'
import Header from './Header';


export default function ({ children, header = <Header /> }: { children: JSX.Element, header?: JSX.Element }) {
  const dispatch = useDispatch();
  const auth = FirebaseConfiguration.auth;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        dispatch(loggedInUserFailed());
        return;
      }
      dispatch(loggedInUserSuccess({ user_id: user.uid, email: user.email, photoURL: user.photoURL, username: user.displayName }));
    });
  }, [])

  return (
    <>
      {header}
      {children}
    </>
  )
}
