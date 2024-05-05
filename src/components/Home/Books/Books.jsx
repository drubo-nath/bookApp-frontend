import React, { useContext, useEffect, useState } from 'react'
import { GrNext } from "react-icons/gr";
import BookCard from './BookCard';
import { Link } from 'react-router-dom';
import { FetchContext } from '../../../Contexts/FetchProvider';


export default function Books() {
  const { books } = useContext(FetchContext);
  // const [bestSellerBooks, setBestSellerBooks] = useState([]);
  // const [newBooks, setNewBooks] = useState([])

  const filteredNewBooks = books.filter((book) => book.bestSeller == false);

  const filteredBestSellers = books.filter((book) => book.bestSeller == true);



  const getRandomItems = (data, count) => {
        const shuffledData = shuffleArray(data);
        return shuffledData.slice(0, count);
      };
    
      const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      };
      const randomBestSellerItems = getRandomItems(filteredBestSellers, 12);
      // setBestSellerBooks(randomBestSellerItems)
  
      const randomNewItems = getRandomItems(filteredNewBooks, 12);
      // setNewBooks(randomNewItems)








  // useEffect(() => {
  //   fetch('https://bookapp-backend-ylwm.onrender.com/all-books')
  //         .then(res => res.json())
  //         .then(data => setBooks(data))
  //   console.log("inside use effect")
  //   const getRandomItems = (data, count) => {
  //     // Shuffle the array randomly
  //     const shuffledData = shuffleArray(data);
  //     // Take the first 'count' items from the shuffled array
  //     return shuffledData.slice(0, count);
  //   };
  
  //   const shuffleArray = (array) => {
  //     const shuffledArray = [...array];
  //     for (let i = shuffledArray.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  //     }
  //     return shuffledArray;
  //   };
  //   const randomBestSellerItems = getRandomItems(filteredBestSellers, 12);
  //   setBestSellerBooks(randomBestSellerItems)

  //   const randomNewItems = getRandomItems(books, 12);
  //   setNewBooks(randomNewItems)



   
  // }, [])

  // console.log(bestSellerBooks)

  return (
    <div className='mt-5 px-8 lg:px-24 mx-auto'>
      <div className='sm:flex justify-between'>
        <p className='text-3xl font-bold text-black '>জনপ্রিয় বই </p>
      </div>


      {/*BestSeller Books Cards */}
      <div>
        < BookCard books={randomBestSellerItems} />
        
      </div>

      <div className='sm:flex justify-between'>
        <p className='text-3xl font-bold text-black '>বই সমূহ</p>
        <Link to="/books">
          <div className='flex hover:text-red-500 font-serif my-5  sm:my-0 '><button className='mr-1'>View All </button><GrNext className='mt-[5px]' /></div>
        </Link>
      </div>

      {/* Books Cards */}
      <div>
        < BookCard books={randomNewItems} />
        
      </div>
    </div>

  )
}
