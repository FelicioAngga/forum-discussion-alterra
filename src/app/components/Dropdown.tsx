import React, { useRef } from 'react'
import useOutsideClick from '../utils/useOutsideClick';
import { signOut } from 'firebase/auth';
import FirebaseConfiguration from '@/firebase/FirebaseConfiguration';
import { useRouter } from 'next/navigation';

function Dropdown({ wrapperRef, onClose }: { wrapperRef: any, onClose: () => void }) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useOutsideClick(dropdownRef, wrapperRef, onClose);

  async function handleLogout() {
    onClose();
    await signOut(FirebaseConfiguration.auth);
    router.refresh();
  }
  
  return (
    <div ref={dropdownRef} className="absolute bottom-[-60px] right-0 p-2 rounded-lg bg-slate-500 z-10">
      <button onClick={handleLogout} className="bg-red-500 px-6 py-1 rounded-lg">Logout</button>
    </div>
  )
}

export default Dropdown;
