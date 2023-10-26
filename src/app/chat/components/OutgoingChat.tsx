import React from 'react'

function OutgoingChat({ text }: { text: string }) {
  return (
    <div className="ml-auto px-4 py-2 rounded-lg w-fit bg-gray-500 max-w-[260px]">
      <p className="break-words">{text}</p>
    </div>
  )
}

export default OutgoingChat