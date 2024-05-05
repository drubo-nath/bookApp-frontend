import React, { useState } from 'react'

export default function Shop() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch("https://bookapp-backend-ylwm.onrender.com/all-books")
    .then(res => res.json())
    .then(data => setBooks(data))
    
  }, [])
  
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2></h2>
    </div>
  )
}
