import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';

function Header() {
  return (
    <div className="px-6 py-5 flex justify-between bg-[#262D34]">
      <div className="flex flex-1 gap-3">
        <img className="w-[30px] h-[30px] my-auto" src="/Logo.png" alt="" />
        <p className="font-bold text-[26px] text-[#FF571A]">Forum Discussion</p>
      </div>

      <div className="flex-1">
        <div className="relative bg-[#2C353D] w-fit mx-auto rounded-lg">
          <input type="text" className="xl:min-w-[400px] rounded-lg px-4 pr-10 py-3 text-sm bg-[#2C353D] placeholder:text-[#858EAD]" placeholder="Type here to search..." />
          <AiOutlineSearch className="absolute text-xl right-4 inset-y-0 m-auto" />
        </div>
      </div>

      <div className="flex flex-1 gap-6">
        <div className="ml-auto rounded-lg w-10 h-10 p-[10px] bg-[#2C353D]"><BsChat className="text-xl text-white" /></div>
        <div className="flex gap-4">
          <img className="w-10 h-10 rounded-xl object-cover block m-auto" src="/daon.jpg" alt="" />
          <p className="font-bold my-auto">Felicio Angga</p>
        </div>
      </div>
    </div>
  )
}

export default Header;
