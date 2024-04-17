"use client"

import Link from "next/link";
import { format } from 'date-fns';
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Search, AlignJustify, Bus, ChevronRight, Globe, Building2, Cpu, Film, Bike, FlaskConical, HeartPulse, ArrowLeft, X } from 'lucide-react';

export default function Health() {

  useEffect(() => {
    setLoadingMarket(true)
    if (sessionStorage.getItem('weatherDetails')==null){
      getWeather()
    } else{
      var weatherDetailsString=sessionStorage.getItem('weatherDetails')
      if (weatherDetailsString !== null) {
        setWeatherData(JSON.parse(weatherDetailsString))
      } else {
        console.log('weather details not found in session storage');
      }
    }
    // getHeadlines()
    // getGnewsApiData()
    getGNews('Health')
    if (sessionStorage.getItem('marketDetails') == null) {
      // console.log('calling market api')
      getMarketDetails()

    }
    else {
      // console.log('setting ')
      var marketDetailsString = sessionStorage.getItem('marketDetails');
      // console.log(marketDetailsString)
      if (marketDetailsString !== null) {
        setMarketDetails(JSON.parse(marketDetailsString))
        setLoadingMarket(false)
      } else {
        console.log('Market details not found in session storage');
        setLoadingMarket(false)
      }
    }
  }, [])

  const pathname = usePathname()
  const currentDate = new Date();
  const tabItems = { 'Home': Globe, 'Bussiness': Building2, 'Technology': Cpu, 'Entertainment': Film, 'Sports': Bike, 'Science': FlaskConical, 'Health': HeartPulse }
  const tabIcons = [HeartPulse, HeartPulse, HeartPulse, HeartPulse, HeartPulse, HeartPulse, HeartPulse]
  const formattedDate = format(currentDate, 'EEEE, d MMMM');
  const [headlines, setHeadlines] = useState<any>([])
  const [weatherData, setWeatherData] = useState({
    'cityName': 'Vijayawada',
    'day': '',
    'fTemp': '',
    'humidity': '-',
    'precipitation': '-',
    'time': '-',
    'wind': '-',
    'temperature': '--',
    'imgUrl': "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
    'Time': '',
    'skyDesc': ''
  })
  const [marketDetails, setMarketDetails] = useState<any>([])
  const [openMenu, setOpenMenu] = useState(false)
  const darkTheme = false
  const [loadingNews, setLoadingNews] = useState(true)
  const [loadingMarket, setLoadingMarket] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [openSearch, setOpenSearch] = useState(false)

  let gnewsapikey_vishnu = '72cc3a0e40cde31dcd9e302002d60ad6';
  let gnewsapikey_animation = '85b718e250165977b2be843f927d8071';
  let category = 'general';


  async function getGNews(category: string) {
    setLoadingNews(true)
    let url = 'https://gnews.io/api/v4/top-headlines?category=' + category.toLowerCase() + '&lang=en&max=10&apikey=' + gnewsapikey_vishnu;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let articles = data.articles;
        for (let i = 0; i < articles?.length; i++) {
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
        setLoadingNews(false)
      });
  }

  function getFormattedDate(date: any) {
    return date.toISOString().split('.')[0] + 'Z'; // Convert date to ISO string and remove milliseconds
  }

  async function searchTopic(query: string) {
    setLoadingNews(true)
    // let url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&max=10&apikey=' + gnewsapikey;
    // let url = 'https://gnews.io/api/v4/search?q=' + formattedQuery + '&lang=en&max=10&apikey=' + gnewsapikey;
    const currentDate = new Date(); // Get the current date and time
    const oneWeekAgoDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); // Subtract 7 days
    const formattedFromDate = getFormattedDate(oneWeekAgoDate);

    const words = query.split(' ');
    const formattedQuery = words.join('+');
    const url = `https://gnews.io/api/v4/search?q=${formattedQuery}&lang=en&max=10&from=${formattedFromDate}&apikey=${gnewsapikey_animation}`;
    console.log(query, formattedQuery, url)
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
        setLoadingNews(false)
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
      var stringWeather=JSON.stringify(data.weatherData)
      sessionStorage.setItem('weatherDetails',stringWeather)
      console.log(data);
      // Handle the fetched data as needed
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  async function getMarketDetails() {
    // console.log('calling market')
    setLoadingMarket(true)
    let form = new FormData()
    const clist = ['TSLA', 'AMZN', 'AAPL', 'MSFT', 'GOOG']
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
      var marketDetailsString = JSON.stringify(data.market_trends);
      // console.log(marketDetailsString,'************')
      sessionStorage.setItem('marketDetails', marketDetailsString);
      // console.log(sessionStorage.getItem('marketDetails'),'###########')
      // console.log(data.market_trends)
      setLoadingMarket(false)
      //   console.log(data);
      // Handle the fetched data as needed
    } catch (error) {
      setLoadingMarket(false)
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="bg-[#f8feff]">
      <nav className="bg-white sticky top-0 z-20 px-4 border-b-[0.1x] border-b-slate-300 p-2  lg:pt-2 lg:pb-0">
        <div className="flex">
          <div className="inline-flex items-center gap-x-2 text-2xl font-bold">
            <img className="flex w-44" src="/logo.png" alt='infoSphere' />
          </div>

          <div className="lg:w-[75%] w-full flex items-center justify-center">
            <div className="lg:w-[60%] lg:flex flex items-center mx-auto ">
              <Search
                className="hidden lg:block lg:w-5 lg:h-5 lg:absolute lg:mx-4 lg:text-[#919090] "
              />
              <Search
                className="lg:hidden lg:w-5 lg:h-5 lg:absolute lg:mx-4 lg:text-[#919090] "
                onClick={(e) => { setOpenSearch(!openSearch) }}
              />
              <input
                placeholder="Search for topics, location & keywords"
                className={`hidden lg:block bg-[#ebebeb] text-base pl-12 pr-4 py-3 outline-none focus:bg-white focus:shadow-md border-none focus:border-none rounded-lg w-full`}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword((e.target as HTMLInputElement).value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    searchTopic(searchKeyword.toLowerCase())
                  }
                }}
              />

              <div className={`lg:hidden ${openSearch ? '' : 'hidden'} absolute w-[67%] flex items-center left-1`}>
                <ArrowLeft
                  className="absolute mx-2 text-[#484848]"
                  onClick={(e) => { setOpenSearch(!openSearch) }}
                />
                <input
                  placeholder="Search"
                  className={`text-base pl-10 pr-8 py-3 outline-none bg-white shadow-md border-none rounded-lg w-full`}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword((e.target as HTMLInputElement).value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      searchTopic(searchKeyword.toLowerCase())
                    }
                  }}
                />
                <X
                  className={`${searchKeyword.length > 0 ? '' : 'hidden'} absolute right-0 mx-2 text-[#484848]`}
                  onClick={(e) => { setSearchKeyword('') }}
                />

              </div>

            </div>
          </div>
        </div>

        <div className="hidden lg:flex gap-x-6 font-semibold text-md items-center mt-4 justify-center">
          {Object.entries(tabItems).map(([key, Component], index) => (
            <a key={index} href={`/${key.toLowerCase()}`} className={` ${pathname === '/' + key.toLowerCase() ? 'underline cursor-default' : 'hover:bg-[#efeeee] hover:cursor-pointer'} underline-offset-8  py-1 px-2 rounded-md`}>{key}</a>
          )
          )}
        </div>
        <div onClick={(e) => { setOpenMenu(!openMenu) }} className={`absolute right-5 top-1/2 transform  -translate-y-1/2 md:hidden hover:scale-105 cursor-pointer `}>
          {openMenu ? <X size={30} /> : <AlignJustify className="" size={30} />}
        </div>


      </nav>

      {/* {sidebar} */}
      <div className={`${darkTheme ? "bg-[#0e0e0e]" : "bg-white"} ${openMenu ? "z-10 fixed left-0 top-14 h-full w-[85%] shadow-xl ease-in-out duration-500 md:hidden" : "fixed left-[-100%] top-14 w-[80%] border-r h-full border-r-gray-900 bg-white ease-out duration-500"}`}>
        <ul className="px-6 flex flex-col">
          {Object.entries(tabItems).map(([key, Component], index) => (
            <div key={index} className="flex flex-col">
              <a
                href={`/${key.toLowerCase()}`}
                className={` ${pathname === '/' + key.toLowerCase() ? 'border-b-blue-500 text-blue-500 cursor-default' : ''} flex gap-x-5 py-5 ${darkTheme ? "text-white" : "text-black "} ${false ? ' transition-colors duration-300 transform text-blue-600 border-b-2 border-blue-500' : 'border-gray-600'}`}
              >
                <Component />
                <h1 className="font-semibold">{key}</h1>
              </a>
            </div>
          ))}
        </ul>
      </div>


      {/* head 1 */}
      <div className="flex items-center justify-between lg:px-44 py-2 lg:py-4 mx-2 lg:mx-0">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-lg lg:text-3xl my-1 text-gray-700">Your briefing</h1>
          <h2 className="font-bold text-sm lg:text-2xl text-gray-700">{formattedDate}</h2>
        </div>

        <div className="p-1 lg:p-4 flex flex-col rounded-xl bg-white">
          <div className="flex flex-col items-center justify-center">
            {weatherData && (
              <div className="flex items-center justify-center gap-x-2  ">
                <img
                  className="w-20 h-20"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={weatherData.skyDesc}
                  src={weatherData.imgUrl}
                  alt="weather icon"
                />
                <div>
                  <h1 className="font-bold lg:text-2xl mt-2 text-gray-800"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={`${weatherData.day}`}
                  >
                    {weatherData.cityName}
                  </h1>
                  <h1
                    className="font-bold lg:text-3xl hover:cursor-default"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={`Humidity: ${weatherData.humidity}\nWind: ${weatherData.wind}\nPrecipitation: ${weatherData.precipitation}`}
                  >
                    {weatherData?.temperature}
                  </h1>
                </div>
              </div>
            )}

          </div>
          <a href="https://weather.com/en-IN/weather/today/l/03a9f9ce4cdb0a8f7950463d357712794850379295572bbf6a3ae045767a037c" target="_blank" className="flex items-center justify-end gap-x-2"><img src='/left-arrow.svg' className="w-6 h-6" alt="go" /><span className="text-xs text-blue-600">More on Weather.com</span></a>

        </div>

      </div>


      {/* top stories */}
      <div className="lg:mr-10 lg:ml-36 lg:flex  justify-between gap-x-2">
        <div className="my-2 lg:my-0 lg:rounded-xl p-2 bg-white lg:p-8 lg:w-[60%]">
          <a href="" className="lg:border-b-[1.5px] border-[#c1bdbd] pb-3 text-xl flex items-center text-blue-500 font-bold">Top Stories <ChevronRight className="mx-1 w-6 h-6 text-blue-500 font-bold" /></a>
          {loadingNews ? (
            <div className="z-1 flex flex-col gap-y-4">

              <div className="w-full mx-auto p-4 border-b-[1.5px] border-[#c1bdbd] pb-3">
                <div className="animate-pulse flex space-x-4">
                  {/* <div className="rounded-full bg-slate-700 h-10 w-10"></div> */}
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-[#dddcdc] rounded"></div>
                    <div className="h-2 bg-[#dddcdc] rounded w-[95%]"></div>
                    <div className="space-y-3">
                      {/* <div className="h-2 bg-slate-700 rounded col-span-2 w-[40%]"></div> */}
                      <div className="h-2 bg-[#dddcdc] rounded col-span-1 w-[20%]"></div>
                    </div>
                  </div>
                  <div className="rounded-lg w-[25%] bg-[#dddcdc] "></div>
                </div>
              </div>

              <div className="p-4 border-b-[1.5px] hidden lg:flex border-[#c1bdbd] pb-3 gap-x-4">
                <div className="animate-pulse w-[50%] flex flex-col">
                  <div className="rounded-lg bg-[#dddcdc] h-52 "></div>
                  <div className="flex-1 space-y-6 pt-4">
                    <div className="h-2 bg-[#dddcdc] rounded"></div>
                    <div className="space-y-3">
                      <div className="h-2 bg-[#dddcdc] rounded col-span-2 w-[40%]"></div>
                      <div className="h-2 bg-[#dddcdc] rounded col-span-1 w-[20%]"></div>
                    </div>
                  </div>
                </div>
                <div className="animate-pulse w-[50%] flex flex-col">
                  <div className="flex-1 space-y-6 pt-4">
                    <div className="h-2 bg-[#dddcdc] rounded"></div>
                    <div className="space-y-3">
                      <div className="h-2 bg-[#dddcdc] rounded col-span-2 w-[40%]"></div>
                      <div className="h-2 bg-[#dddcdc] rounded col-span-1 w-[20%]"></div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6 pt-4">
                    <div className="h-2 bg-[#dddcdc] rounded"></div>
                    <div className="space-y-3">
                      <div className="h-2 bg-[#dddcdc] rounded col-span-2 w-[40%]"></div>
                      <div className="h-2 bg-[#dddcdc] rounded col-span-1 w-[20%]"></div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6 pt-4">
                    <div className="h-2 bg-[#dddcdc] rounded"></div>
                    <div className="space-y-3">
                      <div className="h-2 bg-[#dddcdc] rounded col-span-2 w-[40%]"></div>
                      <div className="h-2 bg-[#dddcdc] rounded col-span-1 w-[20%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" w-full mx-auto p-4 border-b-[1.5px] border-[#c1bdbd] pb-3">
                <div className="animate-pulse flex space-x-4">
                  {/* <div className="rounded-full bg-slate-700 h-10 w-10"></div> */}
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-[#dddcdc] rounded"></div>
                    <div className="h-2 bg-[#dddcdc] rounded w-[95%]"></div>
                    <div className="space-y-3">
                      {/* <div className="h-2 bg-slate-700 rounded col-span-2 w-[40%]"></div> */}
                      <div className="h-2 bg-[#dddcdc] rounded col-span-1 w-[20%]"></div>
                    </div>
                  </div>
                  <div className="rounded-lg w-[25%] bg-[#dddcdc] "></div>
                </div>
              </div>

              <div className="w-full mx-auto p-4 border-b-[1.5px] border-[#c1bdbd] pb-3">
                <div className="animate-pulse flex space-x-4">
                  {/* <div className="rounded-full bg-slate-700 h-10 w-10"></div> */}
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-[#dddcdc] rounded"></div>
                    <div className="h-2 bg-[#dddcdc] rounded w-[95%]"></div>
                    <div className="space-y-3">
                      {/* <div className="h-2 bg-slate-700 rounded col-span-2 w-[40%]"></div> */}
                      <div className="h-2 bg-[#dddcdc] rounded col-span-1 w-[20%]"></div>
                    </div>
                  </div>
                  <div className="rounded-lg w-[25%] bg-[#dddcdc] "></div>
                </div>
              </div>

              <div className="w-full lg:hidden mx-auto p-4 border-b-[1.5px] border-[#c1bdbd] pb-3">
                <div className="animate-pulse flex space-x-4">
                  {/* <div className="rounded-full bg-slate-700 h-10 w-10"></div> */}
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-[#dddcdc] rounded"></div>
                    <div className="h-2 bg-[#dddcdc] rounded w-[95%]"></div>
                    <div className="space-y-3">
                      {/* <div className="h-2 bg-slate-700 rounded col-span-2 w-[40%]"></div> */}
                      <div className="h-2 bg-[#dddcdc] rounded col-span-1 w-[20%]"></div>
                    </div>
                  </div>
                  <div className="rounded-lg w-[25%] bg-[#dddcdc] "></div>
                </div>
              </div>

            </div>

          ) : (
            <div>
              {
                headlines?.length > 0 && (
                  <div>
                    <div className="lg:p-4 border-b-[1.5px] pb-3">
                      <div className="lg:flex justify-between">
                        <img src={headlines[0]?.image} className="lg:hidden w-full rounded-lg" />
                        <div className="flex flex-col gap-y-2">
                          <Link target="_blank" href={headlines[0]?.url} className="text-xl font-semibold">{headlines[0]?.title}.</Link>
                          <div className="">
                            {/* <img src={headline.source.name} className="my-2" /> */}
                            <h1>-{headlines[0]?.source.name}</h1>
                            <h1 className="text-xs text-gray-600">{headlines[0]?.timeAgo}</h1>
                          </div>
                        </div>
                        <img src={headlines[0]?.image} className="hidden lg:block w-[50%] h-[50%] lg:w-[25%] lg:h-[100%]  rounded-lg" />
                      </div>
                    </div>


                    <div className="lg:p-4 lg:border-b-[1.5px] lg:flex  pb-3 gap-x-4">
                      <div className="w-[100%] py-2 border-b-[1.5px] lg:border-none flex lg:flex-col gap-x-2 gap-y-2">
                        <img src={headlines[1]?.image} className="hidden lg:block rounded-lg h-52" />
                        <div className="flex flex-col gap-y-2">
                          <Link target="_blank" href={headlines[1]?.url} className="text-lg font-semibold">{headlines[1]?.title}.</Link>
                          {/* <img src={headline.source.name} className="my-2" /> */}
                          <h1 className="hidden lg:block">-{headlines[1]?.source.name}</h1>
                          <h1 className="text-xs text-gray-600">{headlines[1]?.timeAgo}</h1>
                        </div>
                        <img src={headlines[1]?.image} className="lg:hidden rounded-lg h-20 w-20" />
                      </div>

                      <div className="flex flex-col justify-center lg:gap-y-4">
                        <div className="flex border-b-[1.5px] lg:border-none py-2 lg:flex-col gap-x-2 gap-y-2">
                          {/* <img src={headlines[1]?.image} className=" rounded-lg" /> */}
                          <div className="">
                            <Link target="_blank" href={headlines[2]?.url} className="text-lg font-semibold">{headlines[2]?.title}.</Link>
                            {/* <img src={headline.source.name} className="my-2" /> */}
                            <h1 className="text-sm hidden lg:block">-{headlines[2]?.source.name}</h1>
                            <h1 className="text-xs text-gray-600">{headlines[2]?.timeAgo}</h1>
                          </div>
                          <img src={headlines[2]?.image} className="lg:hidden rounded-lg h-20 w-20" />
                        </div>
                        <div className="flex border-b-[1.5px] lg:border-none py-2 lg:flex-col gap-x-2 gap-y-2">
                          {/* <img src={headlines[1]?.image} className=" rounded-lg" /> */}
                          <div className="">
                            <Link target="_blank" href={headlines[3]?.url} className="text-lg font-semibold">{headlines[3]?.title}.</Link>
                            {/* <img src={headline.source.name} className="my-2" /> */}
                            <h1 className="text-sm hidden lg:block">-{headlines[3]?.source.name}</h1>
                            <h1 className="text-xs text-gray-600">{headlines[3]?.timeAgo}</h1>
                          </div>
                          <img src={headlines[3]?.image} className="lg:hidden rounded-lg h-20 w-20" />
                        </div>
                        <div className="flex gap-x-2 border-b-[1.5px] lg:border-none py-2 lg:flex-col gap-y-2">
                          {/* <img src={headlines[1]?.image} className=" rounded-lg" /> */}
                          <div className="">
                            <Link target="_blank" href={headlines[4]?.url} className="text-lg font-semibold">{headlines[4]?.title}.</Link>
                            {/* <img src={headline.source.name} className="my-2" /> */}
                            <h1 className="text-sm hidden lg:block">-{headlines[4]?.source.name}</h1>
                            <h1 className="text-xs text-gray-600">{headlines[4]?.timeAgo}</h1>
                          </div>
                          <img src={headlines[4]?.image} className="lg:hidden rounded-lg h-20 w-20" />
                        </div>
                      </div>

                    </div>

                    <div className="lg:p-4 border-b-[1.5px] flex flex-col justify-center pb-3">
                      <div className="flex justify-between gap-x-2">
                        <div className="flex flex-col gap-y-2">
                          <div className="">
                            <Link target="_blank" href={headlines[5]?.url} className="text-lg lg:text-xl font-semibold">{headlines[5]?.title}.</Link>
                            {/* <img src={headline.source.name} className="my-2" /> */}
                            <h1 className="text-sm hidden lg:block">-{headlines[5]?.source.name}</h1>
                            <h1 className="text-xs text-gray-600">{headlines[5]?.timeAgo}</h1>
                          </div>
                        </div>
                        <img src={headlines[5]?.image} className="w-20 h-20 lg:h-full lg:w-[25%] rounded-lg" />
                      </div>
                    </div>

                    <div className="lg:p-4 py-2 lg:border-b-[1.5px] flex flex-col justify-center lg:pb-3">
                      <div className="flex justify-between gap-x-2">
                        <div className="flex flex-col gap-y-2">
                          <div className="">
                            <Link target="_blank" href={headlines[6]?.url} className="text-lg lg:text-xl font-semibold">{headlines[6]?.title}.</Link>
                            {/* <img src={headline.source.name} className="my-2" /> */}
                            <h1 className="text-sm hidden lg:block">-{headlines[6]?.source.name}</h1>
                            <h1 className="text-xs text-gray-600">{headlines[6]?.timeAgo}</h1>
                          </div>
                        </div>
                        <img src={headlines[6]?.image} className="w-20 h-20 lg:h-full lg:w-[25%] rounded-lg" />
                      </div>
                    </div>

                  </div>
                )
              }
            </div>
          )}

        </div>

        {/* market */}
        <div className="rounded-xl hidden lg:block bg-white h-96  p-8 w-[40%]">
          <a href="https://www.google.com/finance" target="_blank" className="border-b-[1.5px] border-[#c1bdbd] pb-3 text-xl flex items-center text-blue-500 hover:cursor-pointer font-semibold">Market <ChevronRight className="mx-1 w-5 h-5 text-blue-500" /></a>

          <div className="w-full">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left">Company Name</th>
                  <th className="px-4 py-3 text-left">Last Closing</th>
                  <th className="px-4 py-3 text-left">Change Rate</th>
                </tr>
              </thead>

              {loadingMarket ? (
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3"><div className="h-2 w-20 bg-[#dddcdc] rounded col-span-2 mx-auto animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-2 w-20 bg-[#dddcdc] rounded col-span-2 mx-auto animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-2 w-20 bg-[#dddcdc] rounded col-span-2 mx-auto animate-pulse"></div></td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3"><div className="h-2 w-20 bg-[#dddcdc] rounded col-span-2 mx-auto animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-2 w-20 bg-[#dddcdc] rounded col-span-2 mx-auto animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-2 w-20 bg-[#dddcdc] rounded col-span-2 mx-auto animate-pulse"></div></td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3"><div className="h-2 w-20 bg-[#dddcdc] rounded col-span-2 mx-auto animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-2 w-20 bg-[#dddcdc] rounded col-span-2 mx-auto animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-2 w-20 bg-[#dddcdc] rounded col-span-2 mx-auto animate-pulse"></div></td>
                  </tr>

                </tbody>

              ) : (

                <tbody>
                  {marketDetails?.map((details: any, index: number) => (
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
              )}

            </table>
          </div>

        </div>
      </div >


    </div >
  )
}

