import { DiscussTypeRedux } from '@/redux/slices/discussSlice';
import React from 'react'
import { AiFillHeart } from 'react-icons/ai';

function DiscussionItem(data: DiscussTypeRedux) {
  return (
    <div className="p-5 flex w-full gap-3 xl:gap-4 2xl:gap-5 rounded-2xl bg-[#262D34] xl:min-w-[620px] 2xl:min-w-[720px]">
      <img className="min-w-[156px] max-w-[156px] h-[156px] object-cover block rounded-2xl" src={data.image} alt="" />
      <div className="w-full">
        <div className="flex gap-3 justify-between w-full">
          <div className="text-lg font-semibold overflow-hidden">{data.title}</div>
          <AiFillHeart className="shrink-0 text-xl my-auto" />
        </div>

        <div className="flex gap-2 mt-[10px]">
          {data.hashtag.map((hashtag, index) => 
          <div key={index} className="px-[10px] py-1 rounded-[20px] text-[10px] text-[#C5D0E6] bg-[#2C353D]">{hashtag}</div>)}
        </div>

        <div className="mt-7 flex justify-between">
          <div className="flex gap-[10px]">
            <img className="w-10 h-10 rounded-full" src={data.user_image} alt="" />
            <div>
              <p className="text-sm font-semibold">{data.username}</p>
              <p className="text-[10px] text-[#C5D0E6]">3 days ago</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DiscussionItem;
