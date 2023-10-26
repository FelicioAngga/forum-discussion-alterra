"use client";
import { useDispatch, useSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import replyDiscussionService from '../services/replyDiscussionService';
import getReplyDiscussService from '../services/getReplyDiscussService';
import { fetchDiscussionByIdThunk } from '@/redux/slices/discussSlice';

function ReplyDiscussion({ id }: { id: string }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { user, fetchSuccess } = useSelector((states) => states.auth);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    replyDiscussionService({
      discussion_id: id,
      reply_text: text,
      user_id: user.user_id,
      user_image: user.photoURL || "",
      username: user.username || "",
    }).then(() => {
      dispatch(fetchDiscussionByIdThunk(id));
      setText("");
    })
  }

  useEffect(() => {
    if (fetchSuccess) setIsAuthLoading(false);
    return () => setIsAuthLoading(true);
  }, [dispatch, user?.user_id, fetchSuccess]);
  
  if (isAuthLoading) return <Skeleton duration={0.6} height={152} className='mt-8 !absolute !inset-x-0 !bottom-0 !m-auto !w-[720px] !rounded-2xl' highlightColor="#2C353D" baseColor="#262D34" />
  if (!user) return <div className="absolute m-auto inset-x-0 bottom-0 px-5 pt-5 pb-10 max-w-[720px] rounded-t-2xl bg-[#262D34]">Login to reply this discussion</div>

  return (
    <div className="absolute w-fit md:w-auto m-auto inset-x-0 bottom-0 px-5 pt-5 pb-8 max-w-[720px] rounded-t-2xl bg-slate-700">
      <form onSubmit={handleSubmit} className="flex gap-6">
        <input value={text} onChange={e => setText(e.target.value)} type="text" className="w-full rounded-lg px-4 pr-10 py-3 text-sm 
        bg-[#2C353D] placeholder:text-[#858EAD]" placeholder="Write Your Answer Here..." />
        <button type='submit' disabled={!text} className="my-auto px-5 py-3 rounded-md text-sm font-medium bg-[#FF6934] disabled:bg-gray-400">Submit</button>
      </form>
      <div className="flex gap-4 mt-4">
        <img className="w-10 h-10 rounded-full object-cover block my-auto" src={user.photoURL || ""} alt="" referrerPolicy="no-referrer" />
        <p className="font-semibold text-sm my-auto">{user.username}</p>
      </div>
    </div>
  )
}

export default ReplyDiscussion;
