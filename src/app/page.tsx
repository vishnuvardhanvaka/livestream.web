"use client"

import { Search, AlignJustify, X } from 'lucide-react';
import { useState } from 'react'
export default function Home() {

  const [openMenu, setOpenMenu] = useState(false)
  const darkTheme = false

  return (
    <div className="bg-[#f8feff]">
      <nav className="bg-white sticky top-0 px-4 border-b-[1.5px] border-[#c1bdbd] py-3 flex items-center justify-between">
        <div className="inline-flex items-center m-4 text-2xl font-bold">
          <h1 className="text-3xl font-extrabold">Info</h1>
          <span className="bg-[#faae3c] text-white px-2 py-1 mx-2 rounded-lg">Sphere</span>
        </div>

        <div className="hidden  mx-4 lg:flex gap-x-6 text-md">
          <h1 className="hover:bg-[#efeeee] hover:cursor-pointer py-1 px-2 rounded-md">Local</h1>
          <h1 className="hover:bg-[#efeeee] hover:cursor-pointer py-1 px-2 rounded-md">Business</h1>
          <h1 className="hover:bg-[#efeeee] hover:cursor-pointer py-1 px-2 rounded-md">Technology</h1>
          <h1 className="hover:bg-[#efeeee] hover:cursor-pointer py-1 px-2 rounded-md">Entertainment</h1>
          <h1 className="hover:bg-[#efeeee] hover:cursor-pointer py-1 px-2 rounded-md">Sports</h1>
          <h1 className="hover:bg-[#efeeee] hover:cursor-pointer py-1 px-2 rounded-md">Science</h1>
          <h1 className="hover:bg-[#efeeee] hover:cursor-pointer py-1 px-2 rounded-md">Health</h1>
        </div>

        <div onClick={(e) => { setOpenMenu(!openMenu) }} className={`absolute right-5 top-1/2 transform  -translate-y-1/2 md:hidden hover:scale-105 cursor-pointer `}>
          {openMenu ? <X size={30} /> : <AlignJustify className="" size={30} />}

        </div>

        <div className={`${darkTheme ? "bg-[#0e0e0e]" : "bg-white"} ${openMenu ? "fixed left-0 top-0 w-[60%] border-r h-full border-r-gray-900  ease-in-out duration-500 md:hidden" : "fixed left-[-100%] top-0 w-[60%] border-r h-full border-r-gray-900 bg-white ease-out duration-500"}`}>
          {/* <h1 className={`w-full m-4 text-3xl ${darkTheme ? "text-white" : "text-black"} font-bold `}><span className="text-red-500">Live</span> News.</h1> */}
          <div className="inline-flex items-center m-4 text-2xl font-bold">
            <h1 className="text-3xl font-extrabold">Info</h1>
            <span className="bg-[#faae3c] text-white px-2 py-1 mx-2 rounded-lg">Sphere</span>
          </div>
          <ul className="px-4  ">
            <a onClick={(e) => { localStorage.setItem('TAB', 'LOCAL') }} href="/home" className="w-full"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black "} ${localStorage.getItem('TAB') === 'HOME' ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600'} cursor-pointer hover:bg-gray-200 `}>Local</li></a>
            <a onClick={(e) => { localStorage.setItem('TAB', 'BUSINESS') }} href="/live"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black "} ${localStorage.getItem('TAB') === 'LIVE' ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600'} cursor-pointer hover:bg-gray-200 `}>Business</li></a>
            <a onClick={(e) => { localStorage.setItem('TAB', 'TECHNOLOGY') }} href="/news"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black "} ${localStorage.getItem('TAB') === 'NEWS' ? ' transition-colors text-blue-600 duration-300 transform border-b-2 border-blue-500' : 'border-gray-600'} cursor-pointer hover:bg-gray-200 `}>Technology</li></a>
            <a onClick={(e) => { localStorage.setItem('TAB', 'ENTERTAINMENT') }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${localStorage.getItem('TAB') === 'ABOUT' ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Entertainment</li></a>
            <a onClick={(e) => { localStorage.setItem('TAB', 'SPORTS') }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${localStorage.getItem('TAB') === 'ABOUT' ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Sports</li></a>
            <a onClick={(e) => { localStorage.setItem('TAB', 'SCIENCE') }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${localStorage.getItem('TAB') === 'ABOUT' ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Science</li></a>
            <a onClick={(e) => { localStorage.setItem('TAB', 'HEALTH') }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${localStorage.getItem('TAB') === 'ABOUT' ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Health</li></a>
          </ul>
          {/* <div onClick={(e) => { }} className="px-4 w-full flex items-center">
                {
                  darkTheme ? (
                    <div className="flex w-full items-center p-4 border-b">
                      <span className="w-24 text-white ">Light Mode</span>
                      < SunMoon className="text-white w-7 h-7 lg:cursor-pointer" />
                    </div>

                  ) : (
                    <div className="flex w-full items-center p-4 border-b border-gray-600 ">
                      <span className="w-24 text-black">Dark Mode</span>
                      <Moon className="text-black w-6 h-6 lg:cursor-pointer" />
                    </div>
                  )
                }
              </div> */}
        </div>

        <div className="hidden lg:flex items-center mx-4">
          <Search
            className="w-5 h-5 absolute mx-2 text-[#919090]"
          />
          <input
            placeholder="Search for topics location & keywords"
            className="bg-[#f7f6f6] text-base  border-2 border-[#8f8c8c] pl-8 pr-4 py-2 rounded-xl w-96"
          />
        </div>
      </nav>

    </div>
  )
}

