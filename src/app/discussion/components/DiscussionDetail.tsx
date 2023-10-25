"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from '@/redux/store';
import { fetchDiscussionByIdThunk } from '@/redux/slices/discussSlice';
import { AiFillHeart } from 'react-icons/ai';
import { timeSince } from '@/app/utils/timeSince';
import Skeleton from 'react-loading-skeleton';
import likeDiscussService from '../services/likeDiscussService';

function DiscussionDetail({ id }: { id: string }) {
  const dispatch = useDispatch();
  const { user } = useSelector((states) => states.auth);
  const { discussionDetail, replyDiscussionList, loading } = useSelector((states) => states.discuss);
  const [isLiked, setIsLiked] = useState(false);
  
  function getSinceCreated() {
    if (!discussionDetail?.created_at) return;
    return timeSince(new Date(discussionDetail.created_at).getTime() / 1000);
  }

  function handleLikeClick(like: boolean) {
    setIsLiked(like);
    likeDiscussService(id, like);
  }

  useEffect(() => {
    dispatch(fetchDiscussionByIdThunk(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!discussionDetail) return;
    const liked = discussionDetail.likes ? discussionDetail.likes.filter(item => item === user?.user_id).length > 0 : false;
    setIsLiked(liked);
  }, [discussionDetail?.likes]);
  
  if(loading || !discussionDetail) return <div>
    <Skeleton duration={0.6} height={196} className='!block !mx-auto !w-[720px] !rounded-2xl' highlightColor="#2C353D" baseColor="#262D34" />
    <Skeleton duration={0.6} height={116} className='!block !mx-auto !w-[720px] !rounded-2xl' highlightColor="#2C353D" baseColor="#262D34" />
    <Skeleton duration={0.6} height={116} className='!block !mx-auto !w-[720px] !rounded-2xl' highlightColor="#2C353D" baseColor="#262D34" />
  </div>

  return (
    <div className="mx-auto p-5 w-full rounded-2xl bg-[#262D34] max-w-[720px]">
      <div className="flex flex-col md:flex-row gap-3 xl:gap-4 2xl:gap-5">
        <img className="min-w-[156px] max-w-[156px] h-[156px] object-cover block mx-auto rounded-2xl" src={discussionDetail.image} alt="" />
        <div className="w-full">
          <div className="text-lg font-semibold overflow-hidden">{discussionDetail.title}</div>
          <div className="flex gap-2 mt-[10px]">
            {discussionDetail.hashtag.map((hashtag, index) => 
            <div key={index} className="px-[10px] py-1 rounded-[20px] text-[10px] text-[#C5D0E6] bg-[#2C353D]">{hashtag}</div>)}
          </div>

          <div className="mt-7 flex justify-between">
            <div className="flex gap-[10px]">
              <img className="w-10 h-10 rounded-full" src={discussionDetail.user_image} alt="" />
              <div>
                <p className="text-sm font-semibold">{discussionDetail.username}</p>
                <p className="text-[10px] text-[#C5D0E6]">{getSinceCreated()} ago</p>
              </div>
            </div>
            <div className="h-fit my-auto">
              <p className="text-sm text-[#C5D0E6]">{replyDiscussionList?.length || 0} comments</p>
            </div>
          </div>
        </div>
      </div>
      <AiFillHeart onClick={() => handleLikeClick(!isLiked)} className={`${isLiked && 'text-red-500'} w-fit mt-4 shrink-0 text-xl my-auto cursor-pointer`} />
    </div>
  )
}

export default DiscussionDetail;
