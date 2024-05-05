import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { FetchContext } from '../../../Contexts/FetchProvider';
import BookCard from '../Books/BookCard';
import Fuse from 'fuse.js';


export default function SingleWriterData() {
  const {books} = useContext(FetchContext)
    const {_id, name, published_book } = useLoaderData();
    const [filteredBooks, setFilteredBooks] = useState();
    console.log(_id);
   

    const fuse = new Fuse(books, {
      keys: ["author"],
      includeScore: true,
      threshold: 0.6,
      tokenize: true,
      matchAllTokens: true,
      shouldSort: true,
      findAllMatches: true
  });


  useEffect(() => {

      if (!name) {
          setFilteredBooks([]);
          return;
      }
      const result = fuse.search(name);
      const matches = result.map(item => item.item);
      setFilteredBooks(matches);
   
  }, [name])
  return (
    <div className='m-20'>
        <h1 className='text-2xl font-bold'>{name}</h1><br />
        < BookCard books={filteredBooks} />
    </div>
  )
}
