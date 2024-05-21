"use client"

import { useState, useEffect, useRef } from "react"
import { BotMessageSquare, User, Dot, Send, SendHorizontal, Sparkles, Sparkle } from 'lucide-react';
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import './scrollbar.css'

export default function Chatbot() {

    const [query, setQuery] = useState('')
    const [loadingAnswer, setLoadingAnswer] = useState(false)
    const [chatHistory, setChatHistory] = useState(() => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const storedChatHistory = sessionStorage.getItem('chatHistory');
            if (storedChatHistory) {
                return JSON.parse(storedChatHistory);
            }
        }
        return [];
    });
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI("AIzaSyCSfDU3ixFHYKc_x36vc0iv-ANBhQ7Hw-g");

    const chatContainerRef: any = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    useEffect(() => {
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }, []);

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];
    const system_instruction=[
        "Don't answer if user asks beyond the news realted questions. Say your are here to help with news updates.",
    ]
    const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings,system_instruction});
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Talk in friendly tone only with me." }],
            },
            {
                role: "model",
                parts: [{ text: "Yes sure. I'm your friend Scout. I will try my best and help you with all your queries related to news." }],
            },
            {
                role: "user",
                parts: [{ text: "What is your name?" }],
            },
            {
                role: "model",
                parts: [{ text: "My name is Scout. Developed by Info Sphere." }],
            },
            {
                role: "user",
                parts: [{ text: "What is your purpose?" }],
            },
            {
                role: "model",
                parts: [{ text: "My purpose is to help you with answering queries related to latest news like giving latest news updates and much more related to latest news." }],
            },
        ],
        generationConfig: {
            // stopSequences: ["red"],
            maxOutputTokens: 1000,
            temperature: 0.7,
            topP: 0.1,
            topK: 16,
        },
    });


    async function getAnswer() {
        console.log('gettting answer....')
        setLoadingAnswer(true)
        let userQ = { role: 'user', content: query }
        setQuery('')
        setChatHistory((prevChat: any) => [
            ...prevChat,
            userQ,
        ]);
        setChatHistory((prevChat: any) => [
            ...prevChat,
            {role:'reachingModel',content:'reaching...'},
        ]);

        
        let textt = '';

        try {
            const result = await chat.sendMessageStream(userQ.content);

            // to remove the reaching model loader tag
            setChatHistory((prevChat: any) => {
                const lastMessage = prevChat[prevChat.length - 1];
                if (lastMessage && lastMessage.role === 'reachingModel') {
                    return [
                        ...prevChat.slice(0, prevChat.length - 1),
                    ];
                }
            });
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                textt += chunkText;
                setChatHistory((prevChat: any) => {
                    const lastMessage = prevChat[prevChat.length - 1];
                    if (lastMessage && lastMessage.role === 'loader') {
                        return [
                            ...prevChat.slice(0, prevChat.length - 1),
                            { role: 'loader', content: lastMessage.content + chunkText },
                        ];
                    }
                    else {
                        return [
                            ...prevChat,
                            { role: 'loader', content: textt },
                        ];
                    }
                });
            }
        }
        catch {
            console.log('got an error with the model..')
        }

        console.log(chat,chat._history,typeof(chat._history),'&&&&&&&&&&&&&&&&&&&&&&&&&')
        chat['_history']=[{
            role: "user",
            parts: [{ text: "Talk in friendly tone only with me." }],
        }]

        setChatHistory((prevChat: any) => {
            const lastMessage = prevChat[prevChat.length - 1];
            if (lastMessage && lastMessage.role === 'loader') {
                return [
                    ...prevChat.slice(0, prevChat.length - 1),
                    { role: 'model', content: lastMessage.content },
                ];
            }
        });
        const newEntry = { role: 'model', content: textt};
        const newList = [...chatHistory, userQ];
        const newList2 = [...newList, { role: 'model', content: textt }];

        var stringchatHistory = JSON.stringify(newList2)
        sessionStorage.setItem('chatHistory', stringchatHistory)
        setLoadingAnswer(false)
        // console.log('answering...', query, chatHistory, stringchatHistory, sessionStorage.getItem('chatHistory'), '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')


    }
    return (
        <div className="bg-white shadow-xl mb-2 rounded-2xl h-[68vh] w-[95vw] lg:w-[60vh] lg:h-[70vh]">
            <div className="h-[12%] bg-blue-400 flex justify-center text-white font-bold text-xl items-center rounded-t-2xl">
                {/* <BotMessageSquare
                    className="w-12 h-12 mx-5 text-black"
                /> */}
                {/* <img
                    className="w-12 h-12"
                    src='/worldChatLogo.svg' alt='logo'
                /> */}
                <Sparkles
                    className="mr-2 text-white"
                />
                <span className="">Sphere <span className=""> Scout</span></span>
            </div>


            <div id="scrollbar-chat" ref={chatContainerRef} className="h-[78%] overflow-y-auto overflow-x-hidden lg:px-4 py-2">
                {chatHistory.map((item: any, index: any) => (
                    <div key={index} className={`${item.role === 'user' ? 'justify-end ml-auto' : "justify-start"} text-wrap items-end my-4 flex   w-[80%]`}>

                        <div>
                            <Sparkle
                                className={`${item.role === 'user' ? 'hidden' : " mx-1 w-5 text-green-500"} ${item.role === 'loader' || item.role==='reachingModel' ? ' mx-1 w-5 text-violet-500 animate-spin' : ''} `}
                            />
                        </div>

                        {item.role!=='reachingModel' ? (
                            <p
                                className="rounded-lg text-sm text-white px-4 py-2 bg-blue-500 whitespace-pre-wrap"
                                style={{
                                    wordBreak: 'break-word',
                                    // overflowWrap: 'break-word',
                                    // whiteSpace: 'pre-wrap'
                                }}
                            >
                                {item.content}
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
                                {/* <span className='flex space-x-2 justify-center items-center'>
                                    <span className='h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.2s]'></span>
                                    <span className='h-2 w-2  bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
                                    <span className='h-2 w-2  bg-blue-500 rounded-full animate-bounce'></span>
                                </span> */}
                            </p>
                        )}

                        <div>
                            <User
                                className={`${(item.role === 'model' || item.role === 'loader' || item.role==='reachingModel') ? 'hidden' : " mx-1 w-5"} text-red-500`}
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
                    disabled={loadingAnswer}
                    placeholder="Ask any question related to news"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && query.length > 0) {
                            getAnswer()

                        }
                    }}
                />
                {/* </textarea> */}
                <SendHorizontal

                    onClick={(e) => {
                        if (query.length > 0) {
                            getAnswer()
                        }
                    }}
                    className={`absolute right-2 w-6  ${query.length > 0 ? 'lg:hover:cursor-pointer text-blue-400' : 'text-gray-300'}`}
                />
            </div>
        </div>

    )

}