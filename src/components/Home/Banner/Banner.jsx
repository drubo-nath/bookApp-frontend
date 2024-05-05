import React from 'react'
import BannerCard from './BannerCard'
import { Carousel } from "flowbite-react";

export default function Banner() {
  return (
    // <div className='px-4 lg:px-24 bg-teal-50 flex items-center'>
    //     <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
    //         {/* left side */}
    //         <h2></h2>
    //         </div>

    //         {/* right side */}
    //         {/* < BannerCard /> */}
    //     </div>

    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-[20px] sm:px-[85px] px-[30px]">
      <Carousel>
        <div className="flex h-full items-center justify-center bg-red-600 dark:bg-gray-700 dark:text-white">
          <p className='text-xl sm:text-5xl font-extrabold text-white text-center'>সেরা লেখকদের সেরা বই <br /> <span className='p-6'>কম সময়ে, কম মূল্যে</span></p>
        </div>
        <div className="flex h-full items-center justify-center bg-red-600 dark:bg-gray-700 dark:text-white">
          <p className='text-xl sm:text-5xl font-extrabold text-white text-center'>ঘরে বসেই কিনুন <br /> <span className='pt-10'>আমাদের সকল বই</span></p>
        </div>
        
      </Carousel>
    </div>
  )
}
