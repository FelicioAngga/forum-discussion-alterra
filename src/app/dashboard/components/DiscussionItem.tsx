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
  const [likeCount, setLikeCount] = useState(0);

  function getSinceCreated() {
    return timeSince(new Date(data.created_at).getTime() / 1000);
  }

  function handleLikeClick(like: boolean) {
    if (!user) return;
    setIsLiked(like);
    setLikeCount(prev => like ? prev + 1 : prev - 1);
    likeDiscussService(data.docId, like);
  }

  useEffect(() => {
    setLikeCount(data.likes?.length || 0);
    if (!user) {
      setIsLiked(false);
      return;
    }
    const liked = data.likes ? data.likes.filter(item => item === user?.user_id).length > 0 : false;
    setIsLiked(liked);
  }, [data.likes, user]);

  return (
    <div className="cursor-pointer p-5 w-full rounded-2xl bg-[#262D34] xl:min-w-[620px] 2xl:min-w-[720px]">
      <div className="flex w-full gap-3 xl:gap-4 2xl:gap-5">
        <Link href={`/discussion/${data.docId}`}>
          <img className="min-w-[80px] max-w-[80px] h-20 md:min-w-[156px] md:max-w-[156px] md:h-[156px] object-cover block rounded-2xl" src={data.image} alt="" />
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

            <div className="hidden md:flex mt-7 justify-between">
              <div className="flex gap-[10px]">
                <img className="w-10 h-10 rounded-full" src={data.user_image} referrerPolicy="no-referrer" alt="" />
                <div>
                  <p className="text-sm font-semibold">{data.username}</p>
                  <p className="text-[10px] text-[#C5D0E6]">{getSinceCreated()} ago</p>
                </div>
              </div>
              <div className="flex gap-3 h-fit my-auto">
                <p className="text-sm text-[#C5D0E6]">{likeCount} likes</p>
                <p className="text-sm text-[#C5D0E6]">{data.comments_count || 0} comments</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex md:hidden mt-7 justify-between">
        <div className="flex gap-[10px]">
          <img className="w-10 h-10 rounded-full" src={data.user_image} referrerPolicy="no-referrer" alt="" />
          <div>
            <p className="text-sm font-semibold">{data.username}</p>
            <p className="text-[10px] text-[#C5D0E6]">{getSinceCreated()} ago</p>
          </div>
        </div>
        <div className="flex gap-3 h-fit my-auto">
          <p className="text-sm text-[#C5D0E6]">{likeCount} likes</p>
          <p className="text-sm text-[#C5D0E6]">{data.comments_count || 0} comments</p>
        </div>
      </div>
    </div>
  )
}

export default DiscussionItem;
