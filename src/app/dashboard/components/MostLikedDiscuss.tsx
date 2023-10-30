import React, { useEffect, useState } from 'react'
import IconNext from '../../components/IconNext';
import { useSelector } from '@/redux/store';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

function MostLikedDiscuss() {
  const { discussionList, loading } = useSelector((states) => states.discuss);
  const [sortedList, setSortedList] = useState(discussionList);

  useEffect(() => {
    if (!discussionList) return;
    const sortedDiscussList = discussionList.slice().sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
    setSortedList(sortedDiscussList);
  }, [discussionList]);

  if (loading) return <Skeleton duration={0.6} height={300} className='!min-w-[325px] !rounded-2xl' highlightColor="#2C353D" baseColor="#262D34" />
  return (
    <div className="min-w-[325px] h-fit rounded-2xl p-5 bg-[#262D34]">
      <p className="font-semibold">Most Liked Discussion</p>
      {sortedList.map((data, index) => {
        return(<Link key={index} href={`/discussion/${data.docId}`}>
        <div className="flex mt-5">
          <img className="w-14 h-14 rounded my-auto object-cover" src={data.image} alt="" />
          <div className="ml-3">
            <p className="max-w-[190px] text-xs break-words">{data.title}</p>
            <p className="mt-[6px] text-[10px] md:text-xs text-[#97989D]">by {data.username}</p>
          </div>
          <IconNext />
        </div>
      </Link>)
      })}
    </div>
  )
}

export default MostLikedDiscuss;
