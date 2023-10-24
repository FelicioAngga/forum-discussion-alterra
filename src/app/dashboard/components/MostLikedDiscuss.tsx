import React from 'react'
import IconNext from '../../components/IconNext';

function MostLikedDiscuss() {
  return (
    <div className="min-w-[325px] h-fit rounded-2xl p-5 bg-[#262D34]">
      <p className="font-semibold">Most Liked Discussion</p>
      <div className="flex mt-5">
        <img className="w-14 h-14 rounded my-auto" src="/dummy-post.png" alt="" />
        <div className="ml-3">
          <p className="max-w-[190px] text-xs break-words">How to maintain mental health and importance of community</p>
          <p className="mt-[6px] text-[10px] text-[#97989D]">by Ivana</p>
        </div>
        <IconNext />
      </div>
      <div className="flex mt-5">
        <img className="w-14 h-14 rounded my-auto" src="/dummy-post.png" alt="" />
        <div className="ml-3">
          <p className="max-w-[190px] text-xs break-words">How to maintain mental health and importance of community</p>
          <p className="mt-[6px] text-[10px] text-[#97989D]">by Ivana</p>
        </div>
        <IconNext />
      </div>
    </div>
  )
}

export default MostLikedDiscuss;
