"use client"
import React, { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import IncomingChat from './IncomingChat';
import OutgoingChat from './OutgoingChat';
import { FaArrowLeft, FaRobot } from "react-icons/fa";
import openai from '../services/openAIConfig';
import Link from 'next/link';

function ChatContainer() {
  const [chatData, setChatData] = useState<Array<{ type: string, text: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setChatData(prev => [...prev, { type: "outgoing", text: input }])
    setInput("");
    
    // openai.completions.create({
    //   prompt: input,
    //   model: "gpt-3.5-turbo-instruct",
    //   temperature: 0.5,
    //   max_tokens: 256,
    // }).then((data) => {
    //   console.log(data)
    //   setChatData(prev => [...prev, { type: "incoming", text: data.choices[0].text }])
    //   setIsLoading(false);
    // })
  }

  return (
    <div className="mx-auto min-w-xs max-w-lg text-white bg-gray-900 rounded-2xl">
      <div className="flex gap-4 px-4 py-6">
        <Link href="/" className="my-auto"><FaArrowLeft className="cursor-pointer my-auto" /></Link>
        <FaRobot className="text-2xl" />
        <p className="font-medium">Rephraser OpenAI</p>
      </div>
      <div className="px-4 py-3 flex flex-col gap-3 bg-gray-800 min-h-[80vh]">
        {chatData.map((item, index) =>
          item.type === "outgoing" ?
          <OutgoingChat text={item.text} key={index} />
          : <IncomingChat text={item.text} key={index} />
        )}
      </div>
      {isLoading ? <div className="px4 py-6 w-full text-center">
        Generating...
      </div> 
      : <form onSubmit={(event) => handleSubmit(event)} className="flex gap-4 px-4 py-6 cursor-pointer">
        <input value={input} onChange={e => setInput(e.currentTarget.value)} type="text" placeholder='Enter your request' 
        className="rounded-lg px-3 py-2 w-full text-black" />
        <div className="rounded-full p-2 my-auto bg-slate-600"><AiOutlineSend className="text-2xl" /></div>
      </form>}
    </div>
  )
}

export default ChatContainer;
