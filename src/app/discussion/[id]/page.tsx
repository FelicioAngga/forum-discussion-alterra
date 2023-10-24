"use client"
import React from 'react'
import DiscussionDetail from './DiscussionDetail';
import ReplyDiscussion from '../components/ReplyDiscussion';
import AuthWrapper from '@/app/components/AuthWrapper';

export default function ({ params }: { params: { id: string }}) {
  const { id } = params;

  return (
    <AuthWrapper>
      <div className="min-h-[calc(100vh-84px)] pt-8 px-5 relative bg-[#1E252B]">
        <DiscussionDetail id={id} />
        <ReplyDiscussion />
      </div>
    </AuthWrapper>
  )
}
