import React, { useContext, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { TbCurrencyTaka } from "react-icons/tb";
import { CartContext } from '../../../Contexts/CartProvider';
export default function SingleBookData() {
    const {bookTitle, author, engBookTitle, engAuthor,  language, country, category, description, imageUrl, price, discountedPrice, bestSeller, newBook, publishedYear, edition, ISBN, inventory} = useLoaderData();
    const book = useLoaderData();
    
    const {cartData,addToCart, handleIncrease, handleDecrease} = useContext(CartContext)
    const bookDataFromCart = cartData?.find(item => item._id === book._id)

    const [activeTab, setActiveTab] = useState('Specification');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    return (
        <div className='lg:mx-40 my-11 lg:w-[950px] sm:mb-[0px] mx-[55px]  '>
            <div className='h-[400px] '>
            <div className=' sm:flex justify-center sm:justify-around '>
                <div className='md:w-[430px] ]'>
                    <img className='border w-[250px] h-[320px] p-6 text-center' src={imageUrl} alt="" />
                </div>
                <div className=''>
                    <div >
                        <h2 className='text-2xl font-bold '>{bookTitle}</h2>
                        <h5 className='my-2'>By {author}</h5>
                        <div className='flex justify-start gap-x-2 my-6'>
                            <p className="text-black text-3xl flex"><TbCurrencyTaka className='mt-[5px]' />{discountedPrice}</p>
                            <del className="text-gray-600 text-sm flex items-center">{"\u09F3 " + price}</del>
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn btn-xs"
                          onClick={() => handleDecrease(book)}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={typeof(bookDataFromCart?.quantity) != 'undefined' ? bookDataFromCart?.quantity : 0}
                            className="w-[55px] mx-2 text-center overflow-hidden appearance-none"
                        />
                        <button
                            className="btn btn-xs"
                          onClick={() => handleIncrease(book)}
                        >
                            +
                        </button>
                        <button 
                        onClick={() => addToCart(book)}
                        className='border bg-red-500 sm:mx-5 px-[100px] py-4 font-bold text-white mt-5 sm:mt-0'>Add to Cart</button>
                    </div>

                </div>
            </div>
            </div>
            <hr className=' mt-[220px] sm:mt-5 ' />

            <div className=" mx-auto">
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => handleTabClick('Summary')}
                        className={`${activeTab === 'Summary' ? 'border-blue-500' : ''
                            } focus:outline-none text-gray-700 py-4 px-6 block hover:bg-black hover:text-white w-full`}
                    >
                        Summary
                    </button>
                    <button
                        onClick={() => handleTabClick('Specification')}
                        className={`${activeTab === 'Specification' ? 'border-blue-500' : ''
                            } focus:outline-none text-gray-700 py-4 px-6 block hover:bg-black hover:text-white w-full`}
                    >
                        Specification
                    </button>
                    <button
                        onClick={() => handleTabClick('author')}
                        className={`${activeTab === 'author' ? 'border-blue-500' : ''
                            } focus:outline-none text-gray-700 py-4 px-6 block hover:bg-black hover:text-white w-full`}
                    >
                        Author
                    </button>
                </div>
                <div className="p-4">
                    {activeTab === 'Summary' && (
                        <div>
                            <p>{description}</p>
                        </div>
                    )}
                    {activeTab === 'Specification' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-red-500">Book Info</h2>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    
                                    <tbody>
                                        {/* row 1 */}
                                        <tr>
                                            <th>Title</th>
                                            <td>{bookTitle}</td>
                                            
                                        </tr>
                                        {/* row 2 */}
                                        <tr>
                                            <th>Author</th>
                                            <td>{author}</td>
                                            
                                        </tr>
                                        {/* row 3 */}
                                        <tr>
                                            <th>Publisher</th>
                                            <td>প্রান্ত প্রকাশন</td>
                                            
                                        </tr>

                                        <tr>
                                            <th>ISBN</th>
                                            <td>{ISBN}</td>
                                            
                                        </tr>

                                        <tr>
                                            <th>Edition</th>
                                            <td>{edition}</td>
                                            
                                        </tr>

                                        <tr>
                                            <th>Country</th>
                                            <td>{country}</td>
                                            
                                        </tr>

                                        <tr>
                                            <th>Language</th>
                                            <td>{language}</td>
                                            
                                        </tr>

                                        <tr>
                                            <th>Category</th>
                                            <td>{category}</td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === 'author' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Author Details</h2>
                            
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
