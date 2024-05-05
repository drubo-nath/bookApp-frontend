import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';

export default function ManageWriters() {
  const [allWriters, setAllWriters] = useState([])
  
  const handleDelete = (id) => {
    // delete
    fetch(`https://bookapp-backend-ylwm.onrender.com/writers/${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // alert('data is deleted succesfully')
      
    })
   }

  useEffect(() => {
   fetch('https://bookapp-backend-ylwm.onrender.com/all-writers')
   .then(res => res.json())
   .then(data => setAllWriters(data))

   
  }, [handleDelete])
  


  return (
    <div className='px-4 my-12 w-3000 lg:w-[1180px]'>
      <h2 className='mb-8 text-3xl font-semibold '>Manage Writers</h2>
      <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>No. of Published Books</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {
          allWriters.map((writer, index) => 
          <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {writer.name}
            </Table.Cell>
            <Table.Cell>{writer.published_books}</Table.Cell>
            <Table.Cell>
              <Link to={`/admin/dashboard/edit-Writers/${writer._id}`} className="font-medium mx-2 text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </Link>

              <button onClick={() => handleDelete(writer._id)} className='p-1.5 mx-1 bg-red-600 rounded text-white hover:bg-slate-600'>Delete</button>
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
