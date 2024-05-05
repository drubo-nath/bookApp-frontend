import React from 'react'
import { Link, useLocation, } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa6";

export default function Breadcrumbs() {
    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split("/")
        .filter(crumb => crumb !== '')

    function capitalizeWords(str) {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    const showBreadcrumbs = !location.pathname.startsWith("/admin/dashboard");


    return (

       <>
       { showBreadcrumbs && ( <nav className='breadcrumbs mb-3 mx-[55px] flex gap-2 mt-[150px]'>
            <ul>
                {
                    crumbs.length > 0 ? (
                        <li>
                            <Link to="/" className='hover:text-red-600'> Home</Link>
                        </li>
                    ) : ""
                }
                {
                    crumbs.map((value, index) => {
                        const last = index === crumbs.length - 1
                        const to = `/${crumbs.slice(0, index + 1).join('/')}`
                        const title = value

                        return (
                            <li key={index} className=' hover:no-underline'  >

                                {
                                    last ? (
                                        <span>{capitalizeWords(title)}</span>
                                    ) : (
                                        <Link to={to}><span className='hover:text-red-600 '>{capitalizeWords(title)}</span></Link>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </nav>)}
       </>

    )
}
