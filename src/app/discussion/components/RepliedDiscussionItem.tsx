import React from 'react'
import { ReceivedReplyDiscussType } from '../services/getReplyDiscussService';
import { timeSince } from '@/app/utils/timeSince';

function RepliedDiscussionItem({ data }: { data: ReceivedReplyDiscussType }) {
  function getSinceCreated() {
    return timeSince(new Date(data.created_at).getTime() / 1000);
  }

  return (
    <div className="rounded-2xl px-5 py-4 bg-[#262D34]">
      <p className="font-medium text-lg">{data.reply_text}</p>
      <div className="flex">
        <div className="flex gap-2 mt-4">
          <img className="w-10 h-10 rounded-full object-cover block my-auto" src={data.user_image || ""} alt="" referrerPolicy="no-referrer" />
          <div>
            <p className="font-semibold text-sm my-auto">{data.username}</p>
            <p className="text-[10px] text-[#C5D0E6]">{getSinceCreated()} ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepliedDiscussionItem;
