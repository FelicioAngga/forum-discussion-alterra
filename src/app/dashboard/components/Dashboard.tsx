import React from 'react'
import PopularTags from './PopularTags'
import CreatePost from './CreateDiscussion'
import MostLikedDiscuss from './MostLikedDiscuss'
import DiscussionList from './DiscussionList'

export default function() {
  return (
    <div className="px-5 lg:px-10 py-5 flex flex-col lg:flex-row gap-5 lg:justify-center xl:justify-between">
      <PopularTags />
      <div>
        <CreatePost />
        <DiscussionList />
      </div>
      <MostLikedDiscuss />
    </div>
  )
}

