import FirebaseConfiguration from '@/firebase/FirebaseConfiguration';
import { changeFetchSuccessToFalse } from '@/redux/slices/authSlice';
import { useDispatch, useSelector } from '@/redux/store';
import { signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Skeleton from 'react-loading-skeleton';
import { useStore } from 'react-redux';

function Header() {
  const { user, fetchSuccess } = useSelector((states) => states.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  function handleGoogleAuth() {
    try {
      signInWithPopup(FirebaseConfiguration.auth, FirebaseConfiguration.provider);
    } catch (e: any) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    if (fetchSuccess) setIsLoading(false);
    dispatch(changeFetchSuccessToFalse());
  }, [dispatch, user?.user_uid, fetchSuccess]);

  return (
    <div className="px-6 py-5 flex justify-between bg-[#262D34]">
      <div className="flex flex-1 gap-3">
        <img className="w-[30px] h-[30px] my-auto" src="/Logo.png" alt="" />
        <p className="font-bold text-[26px] text-[#FF571A] my-auto">Forum Discussion</p>
      </div>

      <div className="flex-1">
        <div className="relative bg-[#2C353D] w-fit mx-auto rounded-lg">
          <input type="text" className="xl:min-w-[400px] rounded-lg px-4 pr-10 py-3 text-sm bg-[#2C353D] placeholder:text-[#858EAD]" placeholder="Type here to search..." />
          <AiOutlineSearch className="absolute text-xl right-4 inset-y-0 m-auto" />
        </div>
      </div>

      {isLoading ? 
      <div className="flex-1 h-[50px]"><Skeleton duration={0.6} width={232} height={50} className='!rounded-lg !ml-auto !block' highlightColor="#858EAD" baseColor="#2C353D" /></div> 
      : user ?
        <div className="flex flex-1 gap-6">
          <div className="ml-auto rounded-lg w-10 h-10 p-[10px] bg-[#2C353D]"><BsChat className="text-xl text-white" /></div>
          <div className="flex gap-4">
            <img className="w-10 h-10 rounded-xl object-cover block m-auto" src={user.photoURL || ""} alt="" />
            <p className="font-bold my-auto">{user.username}</p>
          </div>
        </div> :
        <div className="flex-1">
          <button onClick={handleGoogleAuth} className="ml-auto font-medium py-3 px-6 border border-[#E1E1E1] rounded-lg flex justify-center gap-3">
            <FcGoogle className="text-2xl" /> Sign In With Google
          </button>
        </div>
      }
    </div>
  )
}

export default Header;
