"use client"

import { useState, useEffect, useRef } from "react"
import { BotMessageSquare, User, Dot, Send, SendHorizontal } from 'lucide-react';
import './scrollbar.css'

export default function Chatbot() {

    const [query, setQuery] = useState('')
    const [chatHistory, setChatHistory] = useState(() => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const storedChatHistory = sessionStorage.getItem('chatHistory');
            if (storedChatHistory) {
                return JSON.parse(storedChatHistory);
            }
        }
        return [];
    });

    const chatContainerRef: any = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    useEffect(() => {
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }, []);



    async function getAnswer() {

        chatHistory.push({
            'agent': 'loader',
            'value': 'loading...'
        })

        var answer = 'Hello vishnu. This is Testing bot User Interface.'
        chatHistory.pop()
        chatHistory.push({
            'agent': 'bot',
            'value': answer
        })
        var stringchatHistory = JSON.stringify(chatHistory)
        sessionStorage.setItem('chatHistory', stringchatHistory)
        console.log('answering...', query, chatHistory)
        setQuery('')
    }
    return (
        <div className="bg-white shadow-xl mb-2 rounded-2xl h-[68vh] w-[95vw] lg:w-[60vh] lg:h-[70vh] ">
            <div className="h-[12%] bg-blue-400 flex justify-start items-center rounded-t-2xl">
                {/* <BotMessageSquare
                    className="w-12 h-12 mx-5 text-black"
                /> */}
                {/* <img
                    className="w-12 h-12"
                    src='/worldChatLogo.svg' alt='logo'
                /> */}
            </div>


            <div id="scrollbar-chat" ref={chatContainerRef} className="h-[78%] overflow-y-auto overflow-x-hidden lg:px-4 py-2">
                {chatHistory.map((item: any, index: any) => (
                    <div key={index} className={`${item.agent === 'user' ? 'justify-end ml-auto' : "justify-start"} text-wrap items-end my-4 flex   w-[80%]`}>

                        <div>
                            <BotMessageSquare
                                className={`${item.agent === 'user' ? 'hidden' : " mx-1 w-5"}`}
                            />
                        </div>

                        {item.agent !== 'loader' ? (
                            <p
                                className="rounded-lg text-sm text-white px-4 py-2 bg-blue-500 whitespace-pre-wrap"
                                style={{
                                    wordBreak: 'break-word',
                                    // overflowWrap: 'break-word',
                                    // whiteSpace: 'pre-wrap'
                                }}
                            >
                                {item.value}
                            </p>
                        ) : (
                            <p
                                className="rounded-lg text-sm text-white px-2 "
                                style={{
                                    wordBreak: 'break-word',
                                    // overflowWrap: 'break-word',
                                    // whiteSpace: 'pre-wrap'
                                }}
                            >
                                <div className='flex space-x-2 justify-center items-center'>
                                    <div className='h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.2s]'></div>
                                    <div className='h-2 w-2  bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                    <div className='h-2 w-2  bg-blue-500 rounded-full animate-bounce'></div>
                                </div>
                            </p>
                        )}

                        <div>
                            <User
                                className={`${(item.agent === 'bot' || item.agent === 'loader') ? 'hidden' : " mx-1 w-5"}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full relative flex items-center h-[10%] border-t-[1px]">
                <input
                    className="w-full pr-10 pl-6 text-md placeholder:text-base outline-none shadow-lg placeholder:font-normal rounded-b-2xl resize-none focus:border-none h-full"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value) }}
                    placeholder="Ask any question related to news"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && query.length>0) {
                            var d = {
                                'agent': 'user',
                                'value': (e.target as HTMLInputElement).value
                            }
                            chatHistory.push(d)
                            getAnswer()
                        }
                    }}
                />
                {/* </textarea> */}
                <SendHorizontal
                    
                    onClick={(e) => {
                        if(query.length>0){
                            var d = {
                                'agent': 'user',
                                'value': query
                            }
                            chatHistory.push(d)
                            getAnswer()
                        }
                    }}
                    className={`absolute right-2 w-6  ${query.length>0?'lg:hover:cursor-pointer text-blue-400':'text-gray-300'}`}
                />
            </div>
        </div>

    )

}