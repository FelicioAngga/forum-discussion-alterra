"use client"
import React from 'react'
import DiscussionDetail from '../components/DiscussionDetail';
import ReplyDiscussion from '../components/ReplyDiscussion';
import AuthWrapper from '@/app/components/AuthWrapper';
import RepliedDiscussionList from '../components/RepliedDiscussionList';

export default function ({ params }: { params: { id: string }}) {
  const { id } = params;

  return (
    <AuthWrapper>
      <div className="min-h-[calc(100vh-84px)] pt-6 px-5 relative bg-[#1E252B]">
        <DiscussionDetail id={id} />
        <RepliedDiscussionList />
        <ReplyDiscussion id={id} />
      </div>
    </AuthWrapper>
  )
}
