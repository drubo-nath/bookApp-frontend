import React, { useEffect, useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useLoaderData, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

export default function EditBooks() {
  const {id} = useParams()
  const { name, publishedBooks, image, description  } = useLoaderData()
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  console.log(id)

  
  // const handlewriterSubmit = (e) => {
  //   e.preventDefault()
  //   const form = e.target
  //   console.log(form.bookDescription)
  //   const name = form.name.value
  //   const published_books = form.publishedBooks.value
  //   const image = ''
  //   const description = form.description.value 
    
    

  //   const UpdatedWriterObj = {
  //     name, description,  published_books,
  //   }
  //   console.log(UpdatedWriterObj);

  //     // send data to database
  //   fetch(`https://bookapp-backend-ylwm.onrender.com/writers/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(UpdatedWriterObj)
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     // console.log(data)
  //     alert('data uploaded succesfully')
  //     form.reset()
  //   })

  // }
    
    // image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // console.log(image_hosting_key)
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    
    const imageFile = { image: data.image[0] };
    console.log(imageFile)
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(hostingImg.data)
    if (hostingImg.data.success) {
      const writerData = {
        name: data.name,
        publishedBooks: data.publishedBooks,
        description: data.description,
        image: hostingImg.data.data.display_url,

      };

      // console.log(bookData);
      const postWriterData = axiosSecure.post('/upload-writer', writerData);
      if (postWriterData) {
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Item is inserted successfully!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };
  

  useEffect(() => {
        
  }, [onSubmit])


  return (
    <div className='px-4 my-12 hidden sm:block md:flex justify-center'>

      <form className='md:w-3000 mx-10' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className='mb-8 text-3xl font-semibold '>Edit the information of writer</h2>
        </div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Writer Details</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>



            <div className="sm:col-span-4 sm:gap-y-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder='Writer name'
                    defaultValue={name}
                  />
                </div>
              </div>
            </div>


            <div className="sm:col-span-4 sm:gap-y-8 mt-3">
              <label htmlFor="publishedBooks" className="block text-sm font-medium leading-6 text-gray-900">
                Number of Published Books:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                  <input
                    type="number"
                    {...register("publishedBooks", { required: true })}
                    name="publishedBooks"
                    id="publishedBooks"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=' Number of Published Books'
                    defaultValue={publishedBooks}
                  />
                </div>
              </div>
            </div>






            <div className="col-span-full mt-3">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  {...register("description", { required: false })}
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={description}
                />
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-600">Write a few sentences about the writer.</p>
            </div>

            <div className="col-span-full mt-3">
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Picture of the Writer
              </label>
              <div className="form-control w-full my-6">
                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>



        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" onClick={() => formClear()} className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>


    </div>
  )
}
