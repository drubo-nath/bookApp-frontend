import React from 'react'
import { RxDashboard, } from "react-icons/rx";
import { RiUploadCloud2Fill, RiProductHuntLine, RiFileEditFill, RiShieldUserLine, RiUserAddFill, RiEdit2Line, RiHome7Fill } from "react-icons/ri";
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/pranto-logo.png'
import useAdmin from "../../hooks/useAdmin";
import Modal from "../../components/Auth/Modal"

export default function DashboardLayout() {
  const [isAdmin, isAdminLoading] = useAdmin()

  return (
    <div>
      {
       isAdmin ? <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className=' flex items-center justify-between mx-4'>
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><RxDashboard/></label>
  
            <button className='btn rounded-full px-6 bg-red-600 text-white sm:hidden'>Logout</button>
          </div>
          <div className='mt-0  mx-4'>
          <Outlet/>
          </div>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
            <Link to='/admin/dashboard' className='flex mb-3'>
            <img src={logo} alt="" className='w-10' />
            <span className='badge badge-primary mt-[6px]'>admin</span>
            </Link>
            </li>
            <li><Link to='/admin/dashboard'><RxDashboard />Dashboard</Link></li>
            <li><Link to='/admin/dashboard/upload-books'><RiUploadCloud2Fill />Upload Book</Link></li>
            <li><Link to='/admin/dashboard/manage-books'><RiFileEditFill />Manage Books</Link></li>
            <li><Link to='/admin/dashboard/manage-users'><RiShieldUserLine />Users</Link></li>
            <li><Link to='/admin/dashboard/upload-writers'><RiUserAddFill />Add writer</Link></li>
            <li><Link to='/admin/dashboard/manage-writers'><RiEdit2Line />Manage Writers</Link></li>
            
            <hr className='border-black my-5' />
            <li><Link to='/'><RiHome7Fill />Home</Link></li>
            <li><Link to='/all-books'><RiProductHuntLine />Products</Link></li>
          </ul>
        
        </div>
      </div> : <Modal/>
   
      }
    </div>
    
  )
}
