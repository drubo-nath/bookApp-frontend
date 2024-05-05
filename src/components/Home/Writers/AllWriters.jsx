import React, { useContext } from 'react'
import { FetchContext } from '../../../Contexts/FetchProvider'
import { Link } from 'react-router-dom';

export default function AllWriters() {
  const { writers } = useContext(FetchContext);
  return (
    <div className='sm:mx-5 my-3'>


      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 slg:grid-cols-4  xl:gap-x-5 justify-center">
      {
          writers.map(( writer, index) => (
            <Link to={`/writers/${writer._id}`} key={index}>
              <div className=" " key={writer._id}>
                <figure className="px-10 pt-10 text-center">
                  <img src={writer.image} alt="Shoes" className="rounded-full" />
                  <h2 className=" font-xl font-semibold mt-5" >{writer.name}</h2>
                  <p className='text-gray-600 font-sans'>{writer.published_books} Published Books</p>                
                </figure>                
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
