import React, { useContext, useEffect, useRef, useState } from 'react'
import Fuse from 'fuse.js';
import { FetchContext } from '../../../Contexts/FetchProvider';
import { Link } from 'react-router-dom';


export default function SearchBar() {
    const { books } = useContext(FetchContext)
    const [queryText, setqueryText] = useState('')
    const [filteredData, setFilteredData] = useState([]);
    const inputRef = useRef(null);

    const handleSearch = (query) => {
        setqueryText(query)
    }

    const handleOnClick = (data) => {
        console.log()
        setqueryText("")
        inputRef.current.value = data.bookTitle
    }
    const fuse = new Fuse(books, {
        keys: ['bookTitle', "author", "engBookTitle", "engAuthor"],
        includeScore: true,
        threshold: 0.6,
        tokenize: true,
        matchAllTokens: true,
        shouldSort: true,
        findAllMatches: true
    });


    useEffect(() => {

        if (!queryText) {
            setFilteredData([]);
            return;
        }
        const result = fuse.search(queryText);
        const matches = result.map(item => item.item);
        setFilteredData(matches);
        console.log(filteredData);
    }, [queryText])


    return (
        <div>
            <form className="mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <div className="relative">

                        <input
                            onChange={(e) =>
                                handleSearch(e.target.value)}
                            defaultValue={queryText}
                            ref={inputRef}
                            type="search" id="default-search" className="block w-[320px] sm:w-[320px] lg:w-[320px] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='এখানে আপনার পছন্দের বই র নাম লিখুন' required />
                        <button type="submit" className="text-white absolute end-0 bottom-0 bg-red-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-red-300 font-medium p-1 px-3 rounded text-sm h-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">সার্চ</button>

                        <div class="absolute z-10 w-full border divide-y shadow max-h-72 overflow-y-auto bg-white ...">
                                {
                                    filteredData.map( (data) => (
                                        <Link to={`books/${data._id}`} onClick={() => handleOnClick(data)}  className='block p-2 hover:bg-indigo-50'>
                                            {data.bookTitle}
                                        </Link>
                                    ))
                                }
                        </div>

                    </div>
                </div>
            </form>
        </div>


    )
}
