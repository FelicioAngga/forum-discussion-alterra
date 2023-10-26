import React from 'react'

function IncomingChat({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 rounded-lg w-fit bg-gray-600 max-w-[260px]">
      <p>{text}</p>
    </div>
  )
}

export default IncomingChat;
