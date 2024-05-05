import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthProvider'
import { FaFacebookF, FaGoogle } from 'react-icons/fa6'
import { useForm } from "react-hook-form"
import Modal from './Modal'
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";


export default function SignUp() {
  const {createUser, updateUserProfile} = useContext(AuthContext)
  const [error, setError] = useState('')

  const axiosPublic = useAxiosPublic();


  const location = useLocation()
  const navigate = useNavigate()

  const form = location.state?.form?.pathname || "/"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    const email = data.email
    const password = data.password

    createUser(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateUserProfile(data.name, data.photoURL).then(() => {
        const userInfo = {
          name: data?.name,
          email: data?.email,
        };
        console.log(userInfo)
        axiosPublic
        .post("/users", userInfo)
        .then((response) => {
          alert("Signin successful!");
          navigate(from, { replace: true });
        });
      });

  })
  .catch((err) => {
      const errorCode = err.code
      const errorMessage = err.errorMessage
      setError(errorMessage)
  })
  }


  return (
    <div className='sm:w-[500px] bg-white shadow mx-auto flex items-center justify-center mt-[20px] relative'>
      <div>
        <Link
          to='/'
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 m-4 border rounded-full p-2 hover:bg-gray-300">✕</Link>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  {...register("name")}
                />
              </div>
            </div>

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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
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

            <div className='form-control'>
              <input
                type="submit"
                value="Sign up"
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"

              />

            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button to="/login" className="font-semibold leading-6 text-red-500 hover:text-black" onClick={() => document.getElementById('my_modal_3').showModal()}>
              Login here
            </button>
            <Modal />
          </p>
        </div>
      </div>
    </div>
  )
}
