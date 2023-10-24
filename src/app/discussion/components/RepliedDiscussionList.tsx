import { useSelector } from '@/redux/store';
import React from 'react'
import RepliedDiscussionItem from './RepliedDiscussionItem';

function RepliedDiscussionList() {
  const { replyDiscussionList, loading } = useSelector((states) => states.discuss);
  
  if (!replyDiscussionList || loading) return <></>;
  return (
    <div className="mt-4 flex flex-col gap-4 max-h-[340px] overflow-auto max-w-[720px] mx-auto">
      {replyDiscussionList.map((data, index) => <RepliedDiscussionItem data={data} key={index} />)}
    </div>
  )
}

export default RepliedDiscussionList;
