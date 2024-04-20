"use client"

import Link from "next/link";
import { format } from 'date-fns';
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Search, AlignJustify, Bus, ChevronRight, Globe, Building2, Cpu, Film, Bike, FlaskConical, HeartPulse, ArrowLeft, X, Bot } from 'lucide-react';

export default function Main() {

    useEffect(() => {
        setLoadingMarket(true)
        if (sessionStorage.getItem('weatherDetails') == null) {
            getWeather()
        } else {
            var weatherDetailsString = sessionStorage.getItem('weatherDetails')
            if (weatherDetailsString !== null) {
                setWeatherData(JSON.parse(weatherDetailsString))
            } else {
                console.log('weather details not found in session storage');
            }
        }
        if (sessionStorage.getItem('marketDetails') == null) {
            getMarketDetails()
        }
        else {
            var marketDetailsString = sessionStorage.getItem('marketDetails');
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
    const tabItems = { 'Home': Globe, 'Bussiness': Building2, 'Technology': Cpu, 'Entertainment': Film, 'Sports': Bike, 'Science': FlaskConical, 'Health': HeartPulse, 'ChatBot': Bot }
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
    });
    const [marketDetails, setMarketDetails] = useState<any>([])
    const [openMenu, setOpenMenu] = useState(false)
    const darkTheme = false
    const [loadingNews, setLoadingNews] = useState(true)
    const [loadingMarket, setLoadingMarket] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [openSearch, setOpenSearch] = useState(false)

    let gnewsapikey_vishnu = '72cc3a0e40cde31dcd9e302002d60ad6';
    let gnewsapikey_animation = '85b718e250165977b2be843f927d8071';

    function getFormattedDate(date: any) {
        return date.toISOString().split('.')[0] + 'Z';
    }
    async function searchTopic(query: string) {
        setLoadingNews(true)
        const currentDate = new Date();
        const oneWeekAgoDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
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
                    const publishedAtDate = new Date(articles[i].publishedAt);
                    const timeDifferenceMs = Date.now() - publishedAtDate.getTime();
                    const seconds = Math.floor(timeDifferenceMs / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const days = Math.floor(hours / 24);
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
                setHeadlines(articles)
                setLoadingNews(false)
            });
    }


    async function getWeather() {
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
            var stringWeather = JSON.stringify(data.weatherData)
            sessionStorage.setItem('weatherDetails', stringWeather)
            console.log(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    async function getMarketDetails() {
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
            sessionStorage.setItem('marketDetails', marketDetailsString);
            setLoadingMarket(false)
        } catch (error) {
            setLoadingMarket(false)
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="bg-[#f8feff]">
            <nav className="bg-white sticky top-0 z-20 px-4 border-b-[0.1px] p-2  lg:pt-2 lg:pb-0">
                <div className="flex">
                    <div className="inline-flex items-center gap-x-2 text-2xl font-bold">
                        <img className="flex w-44" src="/logo.png" alt='infoSphere' />
                    </div>

                    <div className={`${pathname ==='/chatbot' ? "":""} lg:w-[75%] w-full flex items-center justify-center`}>
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
                        <a key={index} href={`/${key.toLowerCase()}`} className={` ${pathname === '/' + key.toLowerCase() ? 'underline decoration-blue-500 decoration-[2px] cursor-default' : 'hover:bg-[#efeeee] hover:cursor-pointer'} underline-offset-[9px]  py-1 px-2 rounded-md`}>{key}</a>
                    )
                    )}
                </div>
                <div onClick={(e) => { setOpenMenu(!openMenu) }} className={`absolute right-5 top-1/2 transform  -translate-y-1/2 md:hidden hover:scale-105 cursor-pointer `}>
                    {openMenu ? <X size={30} /> : <AlignJustify className="" size={30} />}
                </div>
            </nav>

            <div>
                
            </div>


        </div >
    )
}

