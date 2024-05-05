import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';

export default function ManageBooks() {
  const [allBooks, setAllBooks] = useState([])
  
  const handleDelete = (id) => {
    // delete
    fetch(`https://bookapp-backend-ylwm.onrender.com/book/${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // alert('data is deleted succesfully')
      
    })
   }

  useEffect(() => {
   fetch('https://bookapp-backend-ylwm.onrender.com/all-books')
   .then(res => res.json())
   .then(data => setAllBooks(data))

   
  }, [handleDelete])
  


  return (
    <div className='px-4 my-12 w-3000 lg:w-[1180px]'>
      <h2 className='mb-8 text-2xl font-semibold font-sans'>Manage Books</h2>
      <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {
          allBooks.map((book, index) => 
          <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {book.bookTitle}
            </Table.Cell>
            <Table.Cell>{book.author}</Table.Cell>
            <Table.Cell>{book.category}</Table.Cell>
            <Table.Cell>{book.price}</Table.Cell>
            <Table.Cell>
              <Link to={`/admin/dashboard/edit-books/${book._id}`} className="font-medium mx-2 text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </Link>

              <button onClick={() => handleDelete(book._id)} className='p-1.5 mx-1 bg-red-600 rounded text-white hover:bg-slate-600'>Delete</button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
          )
        }
        
      </Table>
    </div>
      
    </div>
  )
}
