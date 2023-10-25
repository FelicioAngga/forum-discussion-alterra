import { DiscussTypeRedux } from '@/redux/slices/discussSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai';
import { timeSince } from '../../utils/timeSince';
import likeDiscussService from '@/app/discussion/services/likeDiscussService';
import { useSelector } from '@/redux/store';

function DiscussionItem(data: DiscussTypeRedux) {
  const { user } = useSelector((states) => states.auth);
  const [isLiked, setIsLiked] = useState(false);
  function getSinceCreated() {
    return timeSince(new Date(data.created_at).getTime() / 1000);
  }

  function handleLikeClick(like: boolean) {
    setIsLiked(like);
    likeDiscussService(data.docId, like);
  }

  useEffect(() => {
    const liked = data.likes ? data.likes.filter(item => item === user?.user_id).length > 0 : false;
    setIsLiked(liked);
  }, [data.likes]);

  return (
    <div className="cursor-pointer p-5 flex w-full gap-3 xl:gap-4 2xl:gap-5 rounded-2xl bg-[#262D34] xl:min-w-[620px] 2xl:min-w-[720px]">
      <Link href={`/discussion/${data.docId}`}>
        <img className="min-w-[156px] max-w-[156px] h-[156px] object-cover block rounded-2xl" src={data.image} alt="" />
      </Link>
      <div className="w-full">
        <div className="flex gap-3 justify-between w-full">
          <Link href={`/discussion/${data.docId}`}>
            <div className="text-lg font-semibold overflow-hidden">{data.title}</div>
          </Link>
          <AiFillHeart onClick={() => handleLikeClick(!isLiked)} className={`${isLiked && 'text-red-500'} cursor-pointer shrink-0 text-xl my-auto`} />
        </div>

        <Link href={`/discussion/${data.docId}`}>
          <div className="flex gap-2 mt-[10px]">
            {data.hashtag.map((hashtag, index) => 
            <div key={index} className="px-[10px] py-1 rounded-[20px] text-[10px] text-[#C5D0E6] bg-[#2C353D]">{hashtag}</div>)}
          </div>

          <div className="mt-7 flex justify-between">
            <div className="flex gap-[10px]">
              <img className="w-10 h-10 rounded-full" src={data.user_image} alt="" />
              <div>
                <p className="text-sm font-semibold">{data.username}</p>
                <p className="text-[10px] text-[#C5D0E6]">{getSinceCreated()} ago</p>
              </div>
            </div>
            <div className="h-fit my-auto">
              <p className="text-sm text-[#C5D0E6]">{data.comments_count || 0} comments</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default DiscussionItem;
