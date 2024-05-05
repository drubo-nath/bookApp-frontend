import React, {createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const FetchContext = createContext()


function FetchProvider({children}) {

    const [books, setBooks] = useState([])
    const [writers, setWriters] = useState([])



    useEffect(() => {
        fetch('https://bookapp-backend-ylwm.onrender.com/all-books')
          .then(res => res.json())
          .then(data => setBooks(data))
      }, [])

      useEffect(() => {
        fetch('https://bookapp-backend-ylwm.onrender.com/all-writers')
          .then(res => res.json())
          .then(data => setWriters(data))
      }, [])
    

    const fetchInfo = {
     books,
     setBooks,
     writers,
    }

    return (
        <FetchContext.Provider value={fetchInfo}>
            {children}
        </FetchContext.Provider>
  )
}

export default FetchProvider;