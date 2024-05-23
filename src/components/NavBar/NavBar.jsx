import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaXmark, FaBarsStaggered } from 'react-icons/fa6'
import pranto_logo from "../../assets/pranto-logo.png"
import { VscAccount } from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SearchBar from './Search/SearchBar';
import Modal from '../Auth/Modal';
import { AuthContext } from '../../Contexts/AuthProvider';
import Profile from '../User/Profile';
import { CartContext } from '../../Contexts/CartProvider';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const { user } = useContext(AuthContext);
    const {cartData} = useContext(CartContext)
    const location = useLocation();

    //toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    useEffect(() => {
        setIsMenuOpen(false);
    },[location])

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // navigation Items here
    const navItems = [
        { name: "হোম", path: "/", link: "/" },
        { name: "বই", path: "/books", link: "books" },
        { name: "লেখক", path: "/writers", link: "writers" },
        { name: "যোগাযোগ", path: "/", link: "" },
        { name: "আমাদের সম্পর্কে", path: "/about", link: "about" },
    ]

    // Determine if the navbar should be shown based on the current route
    const showNavbar = !location.pathname.startsWith("/admin/dashboard");
   

    return (
        <>
            {showNavbar && (
                <header className={`w-full bg-transparent fixed top-0 left-0 right-0 z-10 transition-all ease-in duration-300 ${isSticky ? "bg-white" : ''}`}>
                    <nav className={`pt-4 py-1 sm:px-[55px] px-2 ${isSticky ? "sticky top-0 left-0 right-0 bg-white" : ''}`}>
                        <div className=''>
                            <div className='flex justify-between md:justify-between  items-center text-base gap-8'>

                                {/* logo */}
                                <div className='flex w-full sm:w-full'>
                                    <Link to="/" ><img className="size-10 inline-block" src={pranto_logo} alt="" /></Link>
                                    <p className='text-sm font-semibold py-1 sm:p-0 md:text-xl md:font-bold m-1'>প্রান্ত প্রকাশন</p>
                                </div>

                                {/* Search Bar  */}
                                <div className='hidden md:flex w-full justify-center'>
                                    <div className="flex justify-center">
                                        <SearchBar />
                                    </div>
                                </div>

                                <div className='flex '>
                                        <Link to="/cart">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                                <div className="indicator">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                    <span className="badge badge-sm indicator-item">{cartData.length}</span>
                                                </div>
                                            </div>
                                        </Link>

                                        <div className='flex justify-between mr-[50px] sm:mr-[55px] sm:ml-5  mt-0'>
                                            {/* Login  */}
                                            {user ? <Profile user={user} className="h-6 w-6 m-2 "/> : (
                                                <div className='flex justify-between sm:mx-5'>
                                                    <div>
                                                        <VscAccount className='h-6 w-6 m-2  ' />
                                                    </div>

                                                    <div >
                                                        <button className='h-6 mt-2 hover:text-red-500 ' onClick={() => document.getElementById('my_modal_3').showModal()}>SignIn </button>
                                                        <Modal />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* button for mobile devices*/}
                                        <div className='md:hidden mt-[12px]  mx-2 '>
                                            <button onClick={toggleMenu} className='text-black focus:outline-none'>
                                                {
                                                    isMenuOpen ? <FaXmark className='h-5 w-5  text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-5 mx-0 flex justify-start sm:p-4 md:border md:shadow '>
                                    <div className='block md:hidden mx-auto'><SearchBar /></div>

                                    {/* nav items for large device */}
                                    <ul className='md:flex space-x-10 hidden '>
                                        {navItems.map(({ name, path, link }) => <Link key={path} to={link} className='block text-base text-black uppercase cursor-pointer hover:text-red-500'>{name}</Link>)}
                                    </ul>

                                    {/* button for large devices*/}
                                    <div className='space-x-12 hidden lg:flex items-center '>
                                        <button><FaBarsStaggered className='w-5 md:hidden' /></button>
                                    </div>

                                    {/* navitems for sm devices */}
                                    <div className={`space-y-4 px-4 mt-10 py-7 bg-white ${isMenuOpen ? "block fixed right-0 left-0 mt-0" : " hidden "}`}>
                                        {navItems.map(({ name, link, path }) => <Link key={path} to={link} className='block text-base text-black uppercase cursor-pointer hover:text-red-500'>{name}</Link>)}
                                    </div>
                                </div>
                            </div>
                    </nav>
                </header>
            )}
        </>
    )
}
