import { useDispatch, useSelector } from '@/redux/store';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdDocument } from 'react-icons/io'
import createDiscussService from '../services/createDiscussService';
import { fetchDiscussionsThunk } from '@/redux/slices/discussSlice';
import { changeFetchSuccessToFalse } from '@/redux/slices/authSlice';
import Skeleton from 'react-loading-skeleton';

function CreateDiscussion() {
  const dispatch = useDispatch();
  const { user, fetchSuccess } = useSelector((states) => states.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [inputs, setInputs] = useState<{title: string, hashtag: string, image: File | null}>({ title: "", hashtag: "", image: null });
  const inputFile = useRef<any>(null);

  function handleUploadImage() {
    if (inputFile && inputFile.current) inputFile.current.click();
  }

  function handleInputFileChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      setInputs(prev => ({ ...prev, image: e.target.files[0] }))
    }
  }
  
  async function handleCreateDiscuss() {
    if (!user || !inputs.title || !inputs.hashtag || !inputs.image) return;
    const hashTags = inputs.hashtag.split(" ");
    setIsLoading(true);
    createDiscussService({
      email: user?.email,
      username: user.username,
      user_id: user.user_id,
      title: inputs.title,
      hashtag: hashTags,
      image: inputs.image,
    }).then(() => {
      dispatch(fetchDiscussionsThunk());
      setIsLoading(false);
      setInputs({ title: "", hashtag: "", image: null })
    });
  }

  useEffect(() => {
    if (fetchSuccess) setIsAuthLoading(false);
    return () => setIsAuthLoading(true);
  }, [dispatch, user?.user_id, fetchSuccess]);
  
  if (isAuthLoading) return <Skeleton duration={0.6} width={620} height={88} className='!rounded-2xl' highlightColor="#2C353D" baseColor="#262D34" />
  if (!user) return <p>You need to login before like or create a post</p>
  return (
    <div className={`rounded-2xl bg-[#262D34] p-5 focus-within:h-[212px] ${(!inputs.image && !inputs.title && !inputs.hashtag) && 'h-[88px]'} overflow-hidden transition-all`}>
      <div className="flex gap-5">
        <img className="w-10 h-10 rounded-full my-auto" src={user.photoURL || ""} alt="" />
        <input onChange={(e) => setInputs((prev) => ({ ...prev, title: e.target.value }) )} type="text"  value={inputs.title}
        className="rounded-md p-3 min-w-[320px] xl:min-w-[360px] 2xl:min-w-[550px] bg-[#2C353D]" placeholder="Let’s share what going on your mind..." />
        <button disabled={isLoading || !inputs.title || !inputs.hashtag || !inputs.image} onClick={handleCreateDiscuss} 
        className="ml-auto h-12 px-4 py-3 rounded-md text-sm font-medium bg-[#FF6934] disabled:bg-gray-400">Create Post</button>
      </div>

      <input onChange={e => setInputs(prev => ({ ...prev, hashtag: e.target.value }))} type="text" value={inputs.hashtag}
      className="mt-5 rounded-md p-3 min-w-[380px] xl:min-w-[420px] 2xl:min-w-[610px] bg-[#2C353D]" placeholder="#exampletrending" />
      <div className="flex mt-5 gap-5">
        <input ref={inputFile} onChange={handleInputFileChange} className="absolute opacity-0 w-0 h-0" multiple={false} type="file" accept="image/*" />
        {inputs.image ? <p className="my-auto">{inputs.image.name}</p> : <IoMdDocument className="text-4xl text-[#C3C3C3]" />}
        <button onClick={handleUploadImage} className="h-fit my-auto px-4 py-2 rounded-md text-sm font-medium bg-[#FF6934]">Upload Image</button>
      </div>
    </div>
  )
}

export default CreateDiscussion;
