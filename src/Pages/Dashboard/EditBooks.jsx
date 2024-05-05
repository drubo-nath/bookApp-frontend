import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams, useNavigate } from 'react-router-dom'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function EditBooks() {
  const { id } = useParams()
  const { bookTitle, author, engBookTitle, engAuthor,  language, country, category, description, imageUrl, price, discountedPrice, bestSeller, newBook, publishedYear, edition, ISBN, inventory } = useLoaderData()
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate()

  const bookCategories = [
    "Science",
    "Science and Technology",
    "Astronomy",
    "Agriculture",
    "Fiction",
    "Nonfiction",
    "Mystery",
    "Thriller",
    "Historical Fiction",
    "Biography",
    "Self-Help",
    "Poetry",
    "Cooking",
    "Travel",
    "Art",

  ]
  const [selectBookCatergory, setSelectBookCatergory] = useState(bookCategories[0])

  function removeHyphenAndAddSpace(inputString) {
    // Replace hyphens with spaces using a regular expression
    return inputString.replace(/-/g, ' ');
  }

  const handleChangeSelectedValue = (e) => {
    console.log(e.target.value);
    setSelectBookCatergory(e.target.value);

  }



  // image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // console.log(image_hosting_key)
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    // console.log(data)
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg.data)
    if (hostingImg.data.success) {
      const bookData = {
        bookTitle: data.bookTitle,
        author: data.author,
        engBookTitle: data.engBookTitle,
        engAuthor: data.engAuthor,
        language: data.language,
        country: data.country,
        category: data.category,
        price: parseFloat(data.bookPrice),
        discountedPrice: parseFloat(data.discountedBookPrice),
        bestSeller: data.bestSeller,
        newBook: data.newBook,
        description: data.description,
        imageUrl: hostingImg.data.data.display_url,
        publishedYear: data.publishedYear,
        ISBN: data.ISBN,
        edition: data.edition,
        inventory: data.inventory,
      };

      // console.log(menuItem);
      const postBookItem = axiosSecure.patch(`/book/${id}`, bookData);
      if (postBookItem) {
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your item updated successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/admin/dashboard/manage-books")
      }
    }
  };



  return (
    <div className='px-4 my-12 hidden sm:block md:flex justify-center'>

      <form className='md:w-3000 mx-10' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className='mb-8 text-3xl font-semibold '>Upload <span className='text-red-500'>the Book</span></h2>
        </div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Book Details</h2>
            <p className="mt-1 text-sm leading-6 text-red-600 ">
              This information will be displayed publicly so be careful what you share.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:gap-x-10 sm:grid-cols-6 sm:flex my-2">

              <div className="sm:col-span-4 sm:gap-y-10 ">
                <label htmlFor="bookTitle" className="block text-sm font-medium leading-6 text-gray-900">
                  Book Title
                </label>
                <div className="">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">

                    <input
                      type="text"
                      defaultValue={bookTitle}
                      {...register("bookTitle", { required: true })}
                      name="bookTitle"
                      id="bookTitle"
                      className="block flex-1 border-0 bg-transparent px-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=' Book Title'
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                  Author Name
                </label>
                <div className="">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">

                    <input
                      type="text"
                      defaultValue={author}
                      {...register("author", { required: true })}
                      name="author"
                      id="author"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=' Author Name'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-1 sm:gap-x-10 sm:grid-cols-6 sm:flex my-2">
            
            <div className="sm:col-span-4 sm:gap-y-10 ">
              <label htmlFor="engBookTitle" className="block text-sm font-medium leading-6 text-gray-900">
                Book Title in English
              </label>
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                  
                  <input
                    type="text"
                    defaultValue={engBookTitle ? removeHyphenAndAddSpace(engBookTitle) : ''}
                    {...register("engBookTitle", { required: true })}
                    name="engBookTitle"
                    id="engBookTitle"
                    className="block flex-1 border-0 bg-transparent px-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=' English Book Title'
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="engAuthor" className="block text-sm font-medium leading-6 text-gray-900">
                Author Name in English
              </label>
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                  
                  <input
                    type="text"
                    defaultValue={engAuthor ? removeHyphenAndAddSpace(engAuthor) : ""}
                    {...register("engAuthor", { required: true })}
                    name="engAuthor"
                    id="engAuthor"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=' English Author Name'
                  />
                </div>
              </div>
            </div>
            </div>

            <div className="  grid grid-cols-1 sm:gap-x-10 sm:grid-cols-6 sm:flex my-2">
            
            <div className="sm:col-span-4 sm:gap-y-10 ">
              <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
                Language 
              </label>
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                  
                  <input
                    type="text"
                    defaultValue={language}
                    {...register("language", { required: true })}
                    name="language"
                    id="language"
                    className="block flex-1 border-0 bg-transparent px-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=' Lauguage of the book'
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country Name
              </label>
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                  
                  <input
                    type="text"
                    defaultValue={country}
                    {...register("country", { required: true })}
                    name="country"
                    id="country"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=' Country Name'
                  />
                </div>
              </div>
            </div>
            </div>



            <div className='sm:flex sm:gap-x-10 my-2'>
              <div className="sm:col-span-4 sm:gap-y-8">
                <label htmlFor="bookPrice" className="block text-sm font-medium leading-6 text-gray-900">
                  Book Price
                </label>
                <div className="">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">

                    <input
                      type="number"
                      defaultValue={price}
                      {...register("bookPrice", { required: true })}
                      name="bookPrice"
                      id="bookPrice"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=' Book Price'
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4 sm:gap-y-8">
                <label htmlFor="discountedPrice" className="block text-sm font-medium leading-6 text-gray-900">
                  Discounted Price
                </label>
                <div className="">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">

                    <input
                      type="number"
                      defaultValue={discountedPrice}
                      {...register("discountedBookPrice", { required: true })}
                      name="discountedBookPrice"
                      id="discountedBookPrice"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=' Book Price'
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="sm:col-span-4 sm:gap-y-8">
              <label htmlFor="publishedYear" className="block text-sm font-medium leading-6 text-gray-900">
                Published Year
              </label>
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">

                  <input
                    type="number"
                    defaultValue={publishedYear}
                    {...register("publishedYear", { required: true })}
                    name="publishedYear"
                    id="publishedYear"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=' Book Price'
                  />
                </div>
              </div>
            </div>

            
            <div className="sm:col-span-4 sm:gap-y-8">
              <label htmlFor="edition" className="block text-sm font-medium leading-6 text-gray-900">
                Edition
              </label>
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                  
                  <input
                    type="number"
                    defaultValue={edition}
                    {...register("edition", { required: false })}
                    name="edition"
                    id="edition"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder='Edition'
                  />
                </div>
              </div>
            </div>


            <div className="sm:col-span-4 sm:gap-y-8">
              <label htmlFor="ISBN" className="block text-sm font-medium leading-6 text-gray-900">
              ISBN
              </label>
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                  
                  <input
                    type="number"
                    defaultValue={ISBN}
                    {...register("ISBN", { required: false })}
                    name="ISBN"
                    id="ISBN"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=' ISBN'
                  />
                </div>
              </div>
            </div>


            <div className="sm:col-span-4 sm:gap-y-8">
              <label htmlFor="inventory" className="block text-sm font-medium leading-6 text-gray-900">
                How many books are in Stock?
              </label>
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                  
                  <input
                    type="number"
                    defaultValue={inventory}
                    {...register("inventory", { required: false })}
                    name="inventory"
                    id="inventory"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=' Stock Count'
                  />
                </div>
              </div>
            </div>

            <div className='sm:flex sm:gap-x-[55px]'>
              <div className="sm:col-span-3 my-2">
                <label htmlFor="bookCategory" className="block text-sm font-medium leading-6 text-gray-900">
                  Book Catergory
                </label>
                <div className="">
                  <select
                    id="bookCategory"
                    defaultValue={category}
                    {...register("category", { required: true })}
                    name="bookCategory"
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={selectBookCatergory}
                    onChange={handleChangeSelectedValue}
                  >
                    {
                      bookCategories.map((category) => <option key={category} value={category}>{category}</option>)
                    }
                  </select>
                </div>
              </div>

              <div className="form-control items-center  my-5">
                <label className="cursor-pointer label">
                  <span className="label-text">Bestseller Book</span>
                  <input id='bestSeller'
                    defaultValue={bestSeller}
                    {...register("bestSeller", { required: false })}
                    type="checkbox" className="mx-2 checkbox checkbox-error" />
                </label>
              </div>
            </div>



            <div className="col-span-full my-2">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Book Description
              </label>
              <div className="">
                <textarea
                  id="description"
                  {...register("description", { required: true })}
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  defaultValue={description}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the book.</p>
            </div>


            <div className='flex'>
          {/* Image */}
          <div className="form-control w-80 my-6">
            <input
              
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          
          <div className="form-control items-center mx-5 my-5" >
              <label className="cursor-pointer label">
                <span className="label-text">New Book</span>
                <input id='newBook'
                defaultValue={newBook}
                {...register("newBook", { required: false })}
                type="checkbox"className="mx-2 checkbox checkbox-error" />
              </label>
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
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Save
          </button>
        </div>
      </form>


    </div>
  )
}
