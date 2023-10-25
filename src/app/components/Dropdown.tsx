import React, { useRef } from 'react'
import useOutsideClick from '../utils/useOutsideClick';
import { signOut } from 'firebase/auth';
import FirebaseConfiguration from '@/firebase/FirebaseConfiguration';

function Dropdown({ wrapperRef, onClose }: { wrapperRef: any, onClose: () => void }) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, wrapperRef, onClose);

  async function handleLogout() {
    await signOut(FirebaseConfiguration.auth);
  }
  
  return (
    <div ref={dropdownRef} className="absolute bottom-[-60px] right-0 p-2 rounded-lg bg-slate-500">
      <button onClick={handleLogout} className="bg-red-500 px-6 py-1 rounded-lg">Logout</button>
    </div>
  )
}

export default Dropdown;
