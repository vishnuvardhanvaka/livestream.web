"use client"

import Link from "next/link";
import { Search, AlignJustify, X, ChevronRight, Bus } from 'lucide-react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
export default function Bussiness() {
    
  useEffect(() => {
    getWeather()
    // getHeadlines()
    // getGnewsApiData()
    getGNews('bussiness')
    getMarketDetails()
  }, [])

  const pathname = usePathname()
  const currentDate = new Date();
  const tabItems=['Home','Bussiness','Technology','Entertainment','Sports','Science','Health']
  const formattedDate = format(currentDate, 'EEEE, d MMMM');
  const [headlines, setHeadlines] = useState<any>([])
  const [weatherData, setWeatherData] = useState({
    'cityName': 'Vijayawada',
    'temperature': '--',
    'imgUrl':"https://ssl.gstatic.com/onebox/weather/64/sunny.png",
    'Time': '',
    'skyDesc': '',
    'other_data': ''
  })
  const [marketDetails, setMarketDetails] = useState<any>([])
  const [openMenu, setOpenMenu] = useState(false)
  const darkTheme = false

  let gnewsapikey = '72cc3a0e40cde31dcd9e302002d60ad6';
  let category = 'general';


  async function getGNews(category: string) {
    let url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + gnewsapikey;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let articles = data.articles;
        for (let i = 0; i < articles.length; i++) {
          // articles[i].title
          const publishedAtDate = new Date(articles[i].publishedAt);

          // Calculate the time difference in milliseconds
          const timeDifferenceMs = Date.now() - publishedAtDate.getTime();

          // Calculate time difference in seconds, minutes, hours, and days
          const seconds = Math.floor(timeDifferenceMs / 1000);
          const minutes = Math.floor(seconds / 60);
          const hours = Math.floor(minutes / 60);
          const days = Math.floor(hours / 24);

          // Define the string to display
          let timeAgo = '';
          if (days > 0) {
            timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
          } else if (hours > 0) {
            timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
          } else if (minutes > 0) {
            timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
          } else {
            timeAgo = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
          }
          articles[i]['timeAgo'] = timeAgo;

        }
        // console.log(articles)
        setHeadlines(articles)
      });

  }

  async function getWeather() {
    // console.log('calling weather')
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

  async function getMarketDetails() {
    // console.log('calling market')
    let form = new FormData()
    const clist = ['TSLA', 'AMZN', 'AAPL', 'MSFT','GOOG']
    form.append('companies', JSON.stringify(clist))
    try {
      const response = await fetch('https://newsweatherapi.vercel.app/getMarketDetails/', {
        method: 'POST',
        body: form
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMarketDetails(data.market_trends)
    //   console.log(data);
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
          {tabItems.map((item:any,index:number)=>{
            return(
              <a key={index} href={`/${item.toLowerCase()}`} className={` ${pathname==='/'+item.toLowerCase()? 'underline cursor-default':'hover:bg-[#efeeee] hover:cursor-pointer'} underline-offset-8  py-1 px-2 rounded-md`}>{item}</a>
            )
          })}
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
            <a onClick={(e) => { }} href="/home" className="w-full"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black "} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600'} cursor-pointer hover:bg-gray-200 `}>Local</li></a>
            <a onClick={(e) => { }} href="/live"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black "} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600'} cursor-pointer hover:bg-gray-200 `}>Business</li></a>
            <a onClick={(e) => { }} href="/news"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black "} ${false ? ' transition-colors text-blue-600 duration-300 transform border-b-2 border-blue-500' : 'border-gray-600'} cursor-pointer hover:bg-gray-200 `}>Technology</li></a>
            <a onClick={(e) => { }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Entertainment</li></a>
            <a onClick={(e) => { }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Sports</li></a>
            <a onClick={(e) => { }} href="/about"><li className={` p-4 border-b ${darkTheme ? "text-white" : "text-black"} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600 '} cursor-pointer hover:bg-gray-200 `}>Science</li></a>
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
            placeholder="Search for topics, location & keywords"
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
          {weatherData && (
              <img className="w-20 h-20" src={weatherData.imgUrl} alt="weather icon" />
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


      {/* top stories */}
      <div className="mr-10 ml-36 flex justify-between gap-x-2">
        <div className="rounded-xl bg-white  p-8 w-[60%]">
          <a href="" className="border-b-[1.5px] border-[#c1bdbd] pb-3 text-xl flex items-center text-blue-500 font-semibold">Top Stories <ChevronRight className="mx-1 w-5 h-5 text-blue-500" /></a>
          {/* {headlines.map((headline: any, index: number) =>  */}
          {
            // Convert publishedAt string to Date object
            // const publishedAtDate = new Date(headline.publishedAt);

            // // Calculate the time difference in milliseconds
            // const timeDifferenceMs = Date.now() - publishedAtDate.getTime();

            // // Calculate time difference in seconds, minutes, hours, and days
            // const seconds = Math.floor(timeDifferenceMs / 1000);
            // const minutes = Math.floor(seconds / 60);
            // const hours = Math.floor(minutes / 60);
            // const days = Math.floor(hours / 24);

            // // Define the string to display
            // let timeAgo = '';
            // if (days > 0) {
            //   timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
            // } else if (hours > 0) {
            //   timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
            // } else if (minutes > 0) {
            //   timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            // } else {
            //   timeAgo = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
            // }

            // return (
            //   <div key={index} className="p-4 border-b-[1.5px] border-[#c1bdbd] pb-3">
            //     <div className="flex justify-between">
            //       <div>
            //         <Link target="_blank" href={headline.url} className="text-lg font-bold">{headline.title}.</Link>
            //         <div className="">
            //           {/* <img src={headline.source.name} className="my-2" /> */}
            //           <h1>-{headline.source.name}</h1>
            //           <h1 className="text-sm text-gray-600">{timeAgo}</h1>
            //         </div>
            //       </div>
            //       <img src={headline.image} className="w-40 h-40 rounded-lg" />
            //     </div>
            //   </div>
            // );
          }
          {/* )} */}
          {headlines.length > 0 && (
            <div>
              <div className="p-4 border-b-[1.5px] border-[#c1bdbd] pb-3">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-y-2">
                    <Link target="_blank" href={headlines[0]?.url} className="text-xl font-semibold">{headlines[0]?.title}.</Link>
                    <div className="">
                      {/* <img src={headline.source.name} className="my-2" /> */}
                      <h1>-{headlines[0]?.source.name}</h1>
                      <h1 className="text-xs text-gray-600">{headlines[0]?.timeAgo}</h1>
                    </div>
                  </div>
                  <img src={headlines[0]?.image} className="w-[25%] rounded-lg" />
                </div>
              </div>


              <div className="p-4 border-b-[1.5px] flex border-[#c1bdbd] pb-3 gap-x-4">
                <div className="w-[100%] flex flex-col gap-y-2">
                  <img src={headlines[1]?.image} className="rounded-lg h-52" />
                  <Link target="_blank" href={headlines[1]?.url} className="text-lg font-bold">{headlines[1]?.title}.</Link>
                  <div className="flex flex-col gap-y-1">
                    {/* <img src={headline.source.name} className="my-2" /> */}
                    <h1>-{headlines[1]?.source.name}</h1>
                    <h1 className="text-xs text-gray-600">{headlines[1]?.timeAgo}</h1>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-y-4">
                  <div className="flex flex-col gap-y-2">
                    {/* <img src={headlines[1]?.image} className=" rounded-lg" /> */}
                    <Link target="_blank" href={headlines[2]?.url} className="text-lg font-semibold">{headlines[2]?.title}.</Link>
                    <div className="">
                      {/* <img src={headline.source.name} className="my-2" /> */}
                      <h1 className="text-sm">-{headlines[2]?.source.name}</h1>
                      <h1 className="text-xs text-gray-600">{headlines[2]?.timeAgo}</h1>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    {/* <img src={headlines[1]?.image} className=" rounded-lg" /> */}
                    <Link target="_blank" href={headlines[3]?.url} className="text-lg font-semibold">{headlines[3]?.title}.</Link>
                    <div className="">
                      {/* <img src={headline.source.name} className="my-2" /> */}
                      <h1 className="text-sm">-{headlines[3]?.source.name}</h1>
                      <h1 className="text-xs text-gray-600">{headlines[3]?.timeAgo}</h1>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    {/* <img src={headlines[1]?.image} className=" rounded-lg" /> */}
                    <Link target="_blank" href={headlines[4]?.url} className="text-lg font-semibold">{headlines[4]?.title}.</Link>
                    <div className="">
                      {/* <img src={headline.source.name} className="my-2" /> */}
                      <h1 className="text-sm">-{headlines[4]?.source.name}</h1>
                      <h1 className="text-xs text-gray-600">{headlines[4]?.timeAgo}</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b-[1.5px] flex flex-col justify-center border-[#c1bdbd] pb-3">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-y-2">
                    <Link target="_blank" href={headlines[5]?.url} className="text-xl font-semibold">{headlines[5]?.title}.</Link>
                    <div className="">
                      {/* <img src={headline.source.name} className="my-2" /> */}
                      <h1>-{headlines[5]?.source.name}</h1>
                      <h1 className="text-xs text-gray-600">{headlines[5]?.timeAgo}</h1>
                    </div>
                  </div>
                  <img src={headlines[5]?.image} className="w-[25%] rounded-lg" />
                </div>
              </div>

              <div className="p-4 border-b-[1.5px] border-[#c1bdbd] pb-3">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-y-2">
                    <Link target="_blank" href={headlines[6]?.url} className="text-xl font-semibold">{headlines[6]?.title}.</Link>
                    <div className="">
                      {/* <img src={headline.source.name} className="my-2" /> */}
                      <h1>-{headlines[6]?.source.name}</h1>
                      <h1 className="text-xs text-gray-600">{headlines[6]?.timeAgo}</h1>
                    </div>
                  </div>
                  <img src={headlines[6]?.image} className="w-[25%] rounded-lg" />
                </div>
              </div>



            </div>
          )}

        </div>

        {/* market */}
        <div className="rounded-xl bg-white h-96  p-8 w-[40%]">
          <a href="https://www.google.com/finance" target="_blank" className="border-b-[1.5px] border-[#c1bdbd] pb-3 text-xl flex items-center text-blue-500 hover:cursor-pointer font-semibold">Market <ChevronRight className="mx-1 w-5 h-5 text-blue-500" /></a>

          <div>
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left">Company Name</th>
                  <th className="px-4 py-3 text-left">Last Closing</th>
                  <th className="px-4 py-3 text-left">Change Rate</th>
                </tr>
              </thead>
              <tbody>
                {marketDetails.map((details: any, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">{details.company_name}</td>
                    <td className="px-4 py-3">${details.last_trade_value}</td>
                    <td className="px-4 py-3 gap-x-2">
                      <div className={`flex  ${details.sign === "positive" ? "text-green-500" : "text-red-500"}`}>
                        {details.sign === "positive" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <circle cx="10" cy="10" r="10"></circle>
                            <path d="M10.7071 7.70711L13.2929 10.2929C13.9229 10.9229 13.4767 12 12.5858 12L7.41421 12C6.52331 12 6.07714 10.9229 6.7071 10.2929L9.29289 7.70711C9.68342 7.31658 10.3166 7.31658 10.7071 7.70711Z" fill="white"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <circle cx="10" cy="10" r="10"></circle>
                            <path d="M10.7071 12.2929L13.2929 9.70711C13.9229 9.07714 13.4767 8 12.5858 8L7.41421 8C6.52331 8 6.07714 9.07714 6.7071 9.7071L9.29289 12.2929C9.68342 12.6834 10.3166 12.6834 10.7071 12.2929Z" fill="white"></path>
                          </svg>
                        )}
                        <span className="mx-1">{details.percentage}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
      

    </div>
  )
}

