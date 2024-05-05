import React, { useContext, useEffect, useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { CartContext } from '../../../Contexts/CartProvider';
import { TbCurrencyTaka } from "react-icons/tb";

export default function BookCard({books}) {
    // console.log(books)
    
    const {cartData, setCartData, addToCart} = useContext(CartContext)

    // adding card data to local storage
    // useEffect(() => {
    //   localStorage.setItem("cart", JSON.stringify(cartData))
    // },[cartData])

    // const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")

    

    

    
  return (
    <div className="bg-white ">
   
      <div className="mx-auto max-w-4xl  py-5 lg:max-w-7xl">

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 slg:grid-cols-4 lg:grid-cols-5 xl:gap-x-5 justify-center">
          {books?.map((book, index) => (
           
           
              <section to={`books/${book._id}`} class="mx-auto w-[225px] relative overflow-hidden lg:h-[400px] h-[450px] border shadow-sm items-center text-center" key={index}>                
                <div class="group p-3">
                  <div class="flex justify-center items-center h-[230px]">                    
                    
                      <img class="h-[200px] w-[150px] p-2" src={book.imageUrl} alt=""/> 
                                            
                    <div className='hidden lg:flex'>
                      <div className="absolute top-[45px]  right-3 mt-0 mr-3 group-hover:flex flex-col hidden transition-all ease-out duration-500 " >
                        {/* Add to Cart Button */}
                        <button onClick={() => addToCart(book)} className= 'transition-all ease-out duration-300  cursor-pointer bg-white text-black border border-gray-400 rounded-full p-2 mt-2 hover:bg-red-500 focus:outline-none'>
                          <CiShoppingCart className={`w-6 h-6 `} />
                        </button>
                        {/* Add to Wishlist Button */}
                        <button className="transition-all ease-in duration-500 bg-white  text-red-700 border border-gray-400 rounded-full p-2 mt-2 hover:bg-red-500 hover:text-black focus:outline-none">
                          <CiHeart className={`w-6 h-6 `} />
                        </button>
                      </div>                      
                    </div>
                  </div>
                  <div className="pb-5 h-[120px]">
                    <Link to={`books/${book._id}`}>
                      <h3 className="text-xl font-semibold mb-2 hover:text-red-600">{book.bookTitle}</h3>
                    </Link>   
                    <p className="text-gray-700 font-base ">{book.author}</p>
                    <div className='flex  justify-center gap-x-2'>
                      <p className="text-black text-[19px] flex"><TbCurrencyTaka className='mt-[5px]'/>{book.discountedPrice}</p>
                      <del className="text-gray-600 text-sm flex items-center">{"\u09F3 " +book.price}</del>
                      
                    </div>
                    
                </div>
                <div className="card-actions flex justify-center bottom-2  my-4 cursor-pointer">
                      <button onClick={e => addToCart(book)} className="btn block lg:hidden text-black bg-red-500  hover:text-red-500 hover:bg-black focus:outline-none">Buy Now</button>
                </div>
                </div>
              </section>
            
          ))}
          
        </div>
        
      </div>
    </div>
  )
}
