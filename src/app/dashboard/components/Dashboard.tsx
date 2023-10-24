import React from 'react'
import PopularTags from './PopularTags'
import CreatePost from './CreateDiscussion'
import MostLikedDiscuss from './MostLikedDiscuss'
import DiscussionList from './DiscussionList'

export default function() {
  return (
    <div className="px-10 py-5 flex gap-5 justify-between">
      <PopularTags />
      <div>
        <CreatePost />
        <DiscussionList />
      </div>
      <MostLikedDiscuss />
    </div>
  )
}

