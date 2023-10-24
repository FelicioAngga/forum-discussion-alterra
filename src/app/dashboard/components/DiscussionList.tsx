import React, { useEffect } from 'react'
import DiscussionItem from './DiscussionItem';
import { fetchDiscussionsThunk } from '@/redux/slices/discussSlice';
import { useDispatch, useSelector } from '@/redux/store';
import Skeleton from 'react-loading-skeleton';

function DiscussionList() {
  const dispatch = useDispatch();
  const { discussionList, loading } = useSelector((states) => states.discuss);

  useEffect(() => {
    dispatch(fetchDiscussionsThunk());
  }, [dispatch])

  return (
    <div className="mt-5">
      {loading ? <div className="flex flex-col gap-4">
        <Skeleton duration={0.6} height={196} className='!rounded-2xl' highlightColor="#2C353D" baseColor="#262D34" />
        <Skeleton duration={0.6} height={196} className='!rounded-2xl' highlightColor="#2C353D" baseColor="#262D34" />
        <Skeleton duration={0.6} height={196} className='!rounded-2xl' highlightColor="#2C353D" baseColor="#262D34" />
      </div> 
      : discussionList.length > 0 ? <div className="flex flex-col gap-4">
        {discussionList.map((data, index) => <DiscussionItem {...data} key={index} />)}
      </div>
      : <p>There is no discussion yet</p>}
    </div>
  )
}

export default DiscussionList;
