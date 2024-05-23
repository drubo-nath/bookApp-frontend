import React, { useEffect, useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GrNext } from "react-icons/gr";
import { Link } from 'react-router-dom';

export default function Writers() {

  const [writers, setwriters] = useState([]);
  const loadings = ["loading", "loading", "loading", "loading", "loading", "loading"]

  useEffect(() => {
    fetch('https://bookapp-backend-ylwm.onrender.com/all-writers')
      .then(res => res.json())
      .then(data => {setwriters(data)})
  }, [])


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

 
  return (
    <div className="slider-container h-80 mt-[50px] px-8 lg:px-24 z-50 mb-[120px] sm:mb-[60px] mx-auto">
      <div className='sm:flex justify-between'>
        <p className='text-3xl font-bold text-black '>লেখক</p>
        <div className='flex hover:text-red-500 font-serif my-2 sm:my-0 '><Link to="/writers"><button className='mr-1'>View All </button></Link><GrNext className='mt-[4px] sm:mt-[4px] ' /></div>
      </div>
      <Slider {...settings}>
        {
          writers?.length > 0 ? (writers.map(( writer, index) => (
            <Link to={`/writers/${writer._id}`} key={index}>
              <div className=" " key={writer._id}>
                <figure className="px-10 pt-10 text-center">
                  <img src={writer.image} alt="Shoes" className="rounded-full" />
                  <h2 className=" font-xl font-semibold mt-5" >{writer.name}</h2>
                  <p className='text-gray-600 font-sans'>{writer.published_books} Published Books</p>                
                </figure>                
              </div>
            </Link>
          ))) : (loadings.map((loading) => <div className='mx-auto w-[225px] relative overflow-hidden h-[250px] ml-5 mt-10'>
          <div className="flex flex-col gap-5 w-52 justify-center ">
            <div className="skeleton w-20 h-20 rounded-full shrink-0"></div>
            <div className="skeleton h-4 w-28 text-center"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>))
        }
      </Slider>
    </div>
  )
}
