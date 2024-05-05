import { Avatar } from 'flowbite-react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthProvider'
import useAdmin from '../../hooks/useAdmin'

export default function Profile({ user }) {
    const {logout} = useContext(AuthContext)
    const handleLogout = () => {
        logout()
        window.location.reload()
    }

    const [isAdmin,] = useAdmin()

    return (
        <div>
            <div className="drawer drawer-end z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button rounded-full ">                    
                    <div to="/" className="w-12 h-0">
                        {
                            user.photoURL ? <img src={user.photoURL} alt="" className='rounded-full btn-circle' /> : <Avatar img="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" rounded bordered />
                        }
                    </div>
                </label>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2 z-50">
                {/* Sidebar content here */}
                <li>
                    <button className='mt-5 hover:text-red-500 font-semibold' onClick={handleLogout}>Logout</button>
                </li>
                {
                    isAdmin ? <li><Link to="/admin/dashboard"><button>Admin</button></Link></li> : ""
                }
                
                </ul>
            </div>
            </div>




        </div>
    )
}
