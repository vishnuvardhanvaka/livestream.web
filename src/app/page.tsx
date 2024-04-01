"use client"

import { Search, AlignJustify, X } from 'lucide-react';
import { format } from 'date-fns';
import { useState,useEffect } from 'react'
export default function Home() {

  useEffect(() => {
    getWeather()
    // getHeadlines()
    // getGnewsApiData()
  }, [])
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'EEEE, d MMMM');
  const [weatherData, setWeatherData] = useState({
    'cityName': 'Vijayawada',
    'temperature': '--',
    'Time': '',
    'skyDesc': '',
    'other_data': ''
  })
  const [openMenu, setOpenMenu] = useState(false)
  const darkTheme = false

  async function getWeather() {
    console.log('calling weather')
    let form = new FormData()
    form.append('city', 'Vijayawada')
    try {
      const response = await fetch('https://newsweatherapi.vercel.app/getWeather/', {
        method: 'POST',
        body: form
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeatherData(data.weatherData)
      console.log(data);
      // Handle the fetched data as needed
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

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
            <a onClick={(e) => {  }} href="/home" className="w-full"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black "} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600'} cursor-pointer hover:bg-gray-200 `}>Local</li></a>
            <a onClick={(e) => {  }} href="/live"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black "} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600'} cursor-pointer hover:bg-gray-200 `}>Business</li></a>
            <a onClick={(e) => { }} href="/news"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black "} ${false ? ' transition-colors text-blue-600 duration-300 transform border-b-2 border-blue-500' : 'border-gray-600'} cursor-pointer hover:bg-gray-200 `}>Technology</li></a>
            <a onClick={(e) => { }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Entertainment</li></a>
            <a onClick={(e) => { }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Sports</li></a>
            <a onClick={(e) => {  }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Science</li></a>
            <a onClick={(e) => { }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Health</li></a>
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

      {/* head 1 */}
      <div className="flex items-center justify-between lg:px-44 py-4 mx-2 lg:mx-0">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-lg lg:text-3xl my-1 text-gray-700">Your briefing</h1>
          <h2 className="font-bold text-sm lg:text-2xl text-gray-700">{formattedDate}</h2>
        </div>

        <div className="p-1 lg:p-4 flex rounded-xl bg-white">
          <div className="flex flex-col items-center justify-center">
            {weatherData?.skyDesc === 'Clear' ? (
              <img src='https://ssl.gstatic.com/onebox/weather/64/sunny.png' alt="weather icon" />
            ) : weatherData?.skyDesc === 'Partly Cloudy' ? (
              <img src='https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png' alt="weather icon" />
            ) : weatherData?.skyDesc === 'Clear with periodic clouds' ? (
              <img src='https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png' alt="weather icon" />
            ) : weatherData?.skyDesc === 'Sunny' ? (
              <img src='https://ssl.gstatic.com/onebox/weather/64/sunny.png' alt="weather icon" />
            ) :  weatherData?.skyDesc === 'Mostly sunny' ? (
              <img src='https://ssl.gstatic.com/onebox/weather/64/sunny.png' alt="weather icon" />
            ) : (
              <img src='https://ssl.gstatic.com/onebox/weather/64/sunny.png' alt="weather icon" />
            )}

            <a href="https://weather.com/en-IN/weather/today/l/03a9f9ce4cdb0a8f7950463d357712794850379295572bbf6a3ae045767a037c" target="_blank"><img src='/left-arrow.svg' className="w-6 h-6 mt-2" alt="go" /></a>
          </div>
          <div className="lg:ml-2 text-sm flex flex-col items-center justify-between">
            <h1 className="font-bold lg:text-2xl mt-2 text-gray-800">{weatherData.cityName}</h1>
            <h1 className="font-bold lg:text-3xl">{weatherData?.temperature}</h1>
            <a href="https://weather.com/en-IN/weather/today/l/03a9f9ce4cdb0a8f7950463d357712794850379295572bbf6a3ae045767a037c" target="_blank" className="text-xs text-blue-600">More on Weather.com</a>
          </div>
        </div>
      </div>

    </div>
  )
}

