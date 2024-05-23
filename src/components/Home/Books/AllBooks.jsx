import React, { useContext, useEffect, useState } from "react";
import BookCard from "./BookCard";
import { FaFilter } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { CartContext } from '../../../Contexts/CartProvider';
import { TbCurrencyTaka } from "react-icons/tb";


export default function AllBooks(){
  const {cartData, setCartData, addToCart} = useContext(CartContext)

  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page

  const bookCategories = [
    "All",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Thriller",
    "Horror",
    "Romance",
    "Historical Fiction",
    "Nonfiction",
    "Biography",
    "Self-Help",
    "Poetry",
    "Cooking",
    "Travel",
    "Art",
    "Science",
  ]
  const [selectBookCatergory, setSelectBookCatergory] = useState(bookCategories[0])
  
  const handleChangeSelectedValue = (e) => {
    console.log(e.target.value );
    setSelectBookCatergory(e.target.value);
    filterItems(e.target.value);

  }

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("https://bookapp-backend-ylwm.onrender.com/all-books");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "All"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1); 
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

//   console.log(filteredItems);
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const loadings = ["loading", "loading", "loading", "loading", "loading", "loading", "loading", "loading", "loading", "loading", "loading", "loading", ]

  return (
    <div className="sm:px-[55px] px-2 max-w-screen-2xl mt-[20px] ">
      

      {/* menu shop  */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          
           {/* all category buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
            {/* filter section */}
            
              <div className="mt-2">
                <select
                  id="bookCategory"
                  name="bookCategory"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={selectBookCatergory}
                  
                  onChange={handleChangeSelectedValue}
                >
                  {
                    bookCategories.map((category) => <option key={category} value={category}>
                        <button onClick={() => filterItems(selectBookCatergory)}
                    className={selectedCategory === category ? "active" : ""}>{category}</button></option>)
                  }
                </select>
              </div>
            </div>

            {/* filter options */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2 ">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default"> Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* product card */}
        <div >
        <div className="bg-white ">
   
   <div className="mx-auto max-w-4xl  py-5 lg:max-w-7xl">

     <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 slg:grid-cols-4 lg:grid-cols-5 xl:gap-x-5 justify-center">
       {currentItems?.length > 0 ? (currentItems.map((book, index) => (
        
        
           <section to={`/${book._id}`} class="mx-auto w-[225px] relative overflow-hidden lg:h-[400px] h-[450px] border shadow-sm items-center text-center" key={index}>                
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
                 <Link to={`/books/${book._id}`}>
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
         
       ))) : (loadings.map((loading) => <div className='mx-auto w-[225px] relative overflow-hidden lg:h-[350px] h-[450px] text-center'>
       <div className="flex flex-col gap-4 w-52">
         <div className="skeleton h-32 w-full"></div>
         <div className="skeleton h-4 w-28"></div>
         <div className="skeleton h-4 w-full"></div>
         <div className="skeleton h-4 w-full"></div>
       </div>
     </div>))}
       
     </div>
     
   </div>
 </div>
        </div>
      </div>

       {/* Pagination */}
       <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

