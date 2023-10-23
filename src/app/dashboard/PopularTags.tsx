import React from 'react'

function PopularTags() {
  return (
    <div className="rounded-2xl bg-[#262D34] p-5 min-w-[220px] h-fit">
      <p className="font-semibold">Popular Tags</p>
      <div className="flex gap-[10px] mt-5">
        <div className="p-[6px] rounded bg-[#5A4F43]"><img src="/code-logo.png" alt="" /></div>
        <p className="text-sm my-auto">#javascript</p>
      </div>
      <div className="flex gap-[10px] mt-5">
        <div className="p-[6px] rounded bg-[#5A4F43]"><img src="/code-logo.png" alt="" /></div>
        <p className="text-sm my-auto">#Kotlin</p>
      </div>
      <div className="flex gap-[10px] mt-5">
        <div className="p-[6px] rounded bg-[#5A4F43]"><img src="/code-logo.png" alt="" /></div>
        <p className="text-sm my-auto">#Flutter</p>
      </div>
    </div>
  )
}

export default PopularTags;
