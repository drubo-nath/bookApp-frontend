import React, { useContext, useState } from 'react'
import SignUp from './SignUp'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaGoogle } from 'react-icons/fa6'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../Contexts/AuthProvider'
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic"

export default function Modal() {
  const {signUpwithGoogle, loginWithEmail, setUser} = useContext(AuthContext)
  const [error, setError] = useState('')
  const axiosPublic = useAxiosPublic();

  const location = useLocation()
  const navigate = useNavigate()

  const form = location.state?.form?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const email = data.email
    const password = data.password
    loginWithEmail(email, password)
    .then(result => {
      const user = result.user
      const userInfor = {
        name: data.name,
        email: data.email,
      };
      axiosPublic
      .post("/users", userInfor)
      .then((res) => {
        alert("Log In Successfull!")
        document.getElementById('my_modal_3').close()
        navigate(form, {replace: true})
        // console.log(user);
      })

    }).catch((err) => {
      setError("Write email and password correctly")
    })

  }

  const handleSignInWithGoogle = () => {
    signUpwithGoogle()
    .then(result => {
      const user = result.user
      setUser(user);
      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
      };
      axiosPublic
      .post("/users", userInfo)
      .then((response) => {
        alert("Sign In Successfull!")
        // console.log(user)
        document.getElementById('my_modal_3').close()
        navigate(form, {replace: true})
      });
      
    }).catch((err) => {
      ///
    })
  }
  return (
    <div className=''>
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className='modal-action'>
            <form className="justify-center items-center " onSubmit={handleSubmit(onSubmit)} method="dialog" >
              {/* if there is a button in form, it will close the modal */}
              <button
              htmlFor="my_modal_3"
              onClick={() => document.getElementById('my_modal_3').close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 m-4 border rounded-full p-2 hover:bg-gray-300">✕</button>
              <div className='w-[350px] sm:w-[500px] rounded-full'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Sign in to your account
                    </h2>
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                    <div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                            {...register("email")}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mt-2">
                          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                          </label>
                          <div className="text-sm">
                            <a href="#" className="font-semibold text-red-600 hover:text-black">
                              Forgot password?
                            </a>
                          </div>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                            {...register("password")}
                          />
                        </div>
                      </div>

                    {error ?  <p className='text-xs text-red-600 space-y-2'>{error}</p> : ''}

                      <div className='form-control mt-2'>
                        <input
                          type="submit"
                          value="Sign in"
                          className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"

                        />

                      </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                      Don't have an account?{' '}
                      <Link to="/signup" className="font-semibold leading-6 text-red-500 hover:text-black" onClick={() => document.getElementById('my_modal_3').close()}>
                        Sign up here
                      </Link>
                    </p>

                    <div className='flex justify-center space-x-4 mt-4 '>
                      <button className='btn btn-circle bg-gray-400 p-2 rounded-full hover:bg-red-500 hover:text-white' onClick={handleSignInWithGoogle}><FaGoogle /></button>
                      <button className='btn btn-circle bg-gray-400 p-2 rounded-full hover:bg-red-500 hover:text-white'><FaFacebookF /></button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>


        </div>
      </dialog>
    </div>
  )
}
