import FirebaseConfiguration from '@/firebase/FirebaseConfiguration';
import { changeFetchSuccessToFalse } from '@/redux/slices/authSlice';
import { useDispatch, useSelector } from '@/redux/store';
import { signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCaretDown, AiOutlineSearch } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Skeleton from 'react-loading-skeleton';
import Dropdown from './Dropdown';
import { fetchDiscussionsThunk } from '@/redux/slices/discussSlice';

function Header() {
  const { user, fetchSuccess } = useSelector((states) => states.auth);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  function handleGoogleAuth() {
    try {
      signInWithPopup(FirebaseConfiguration.auth, FirebaseConfiguration.provider);
    } catch (e: any) {
      console.log(e.message)
    }
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(fetchDiscussionsThunk(searchText))
  }

  useEffect(() => {
    if (fetchSuccess) setIsLoading(false);
  }, [dispatch, user?.user_id, fetchSuccess]);

  return (
    <div className="px-6 py-5 flex justify-between bg-[#262D34]">
      <Link className="my-auto mr-2 lg:flex-1" href="/">
        <div className="flex gap-3">
          <img className="w-[30px] h-[30px] my-auto" src="/Logo.png" alt="" />
          <p className="hidden md:block font-bold text-xl lg:text-[26px] text-[#FF571A] my-auto">Forum Discussion</p>
        </div>
      </Link>

      <div className="lg:flex-1 mx-auto">
        <form onSubmit={handleSearch} className="relative bg-[#2C353D] md:w-fit mx-auto rounded-lg">
          <input value={searchText} onChange={e => setSearchText(e.target.value)} type="text" className="min-w-[200px] md:min-w-[260px] lg:min-w-[320px]
           xl:min-w-[400px] w-40 rounded-lg px-4 pr-10 py-3 text-sm bg-[#2C353D] placeholder:text-[#858EAD]" placeholder="Search..." />
          <AiOutlineSearch className="absolute text-xl right-4 inset-y-0 m-auto" />
        </form>
      </div>

      {isLoading ? 
      <div className="md:flex-1 h-[50px]"><Skeleton duration={0.6} width={232} height={50} className='!rounded-lg !ml-auto !block' highlightColor="#858EAD" baseColor="#2C353D" /></div> 
      : user ?
        <div className="flex md:flex-1 gap-2 md:gap-6 my-auto">
          <Link href="/chat" className="ml-auto"><div className="md:w-10 md:h-10 rounded-lg p-[10px] bg-[#2C353D]"><BsChat className="md:text-xl text-white" /></div></Link>
          <div className="relative my-auto">
            <div ref={wrapperRef} onClick={() => setShowDropdown(prev => !prev)} className="flex ml-auto md:ml-0 cursor-pointer">
              <img className="w-7 h-7 md:w-10 md:h-10 rounded-xl object-cover block m-auto" src={user.photoURL || ""} alt="" referrerPolicy="no-referrer" />
              <p className="ml-3 text-sm md:text-base font-bold my-auto">{user.username}</p>
              <AiOutlineCaretDown className="ml-2 my-auto" />
            </div>
            {showDropdown && <Dropdown wrapperRef={wrapperRef} onClose={() => setShowDropdown(false)} />}
          </div>
        </div> :
        <div className="md:flex-1">
          <button onClick={handleGoogleAuth} className="ml-auto font-medium py-3 px-6 border border-[#E1E1E1] rounded-lg flex justify-center gap-3">
            <FcGoogle className="text-2xl" /> Sign In With Google
          </button>
        </div>
      }
    </div>
  )
}

export default Header;
