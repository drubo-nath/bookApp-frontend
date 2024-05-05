import React, { createContext, useState } from 'react'

export const CartContext = createContext()

export default function CartProvider({ children }) {
  const [cartData, setCartData] = useState([])
  // console.log(cartData)

  const addToCart = (book) => {
    const { _id, author, bookTitle, imageUrl, price } = book
    const bookData = {
      _id,
      author,
      bookTitle,
      imageUrl,
      price,
      quantity: 1
    }
    // console.log(cartData.some(e => e._id === book._id))

    // setCartData([...cartData, bookData])
    if (!cartData.some(e => e._id === book._id)) {
      // console.log("if ");
      setCartData([...cartData, bookData])
      return
    }
    else if (cartData.some(e => e._id === book._id)) {
      const existedBook = cartData.find(item => item._id === book._id)
      const filteredCartData = cartData.filter((currItem) => currItem._id != book._id)

      const updatedBookData = {
        _id: existedBook._id,
        author: existedBook.author,
        bookTitle: existedBook.bookTitle,
        imageUrl: existedBook.imageUrl,
        price: existedBook.price,
        quantity: existedBook.quantity + 1
      }
      const updatedCartData = filteredCartData.concat(updatedBookData)
      setCartData(updatedCartData)
    }

  }

  // Handle quantity increase
  const handleIncrease = (book) => {
    const existedBook = cartData.find(item => item._id === book._id)
    const filteredCartData = cartData.filter((currItem) => currItem._id != book._id)

    const updatedBookData = {
      _id: existedBook._id,
      author: existedBook.author,
      bookTitle: existedBook.bookTitle,
      imageUrl: existedBook.imageUrl,
      price: existedBook.price,
      quantity: existedBook.quantity + 1
    }
    const updatedCartData = filteredCartData.concat(updatedBookData)
    setCartData(updatedCartData)

  };


  // Handle quantity decrease
  const handleDecrease = (book) => {
    const existedBook = cartData.find(item => item._id === book._id)
    if (existedBook.quantity > 1) {
      const filteredCartData = cartData.filter((currItem) => currItem._id != book._id)

      const updatedBookData = {
        _id: existedBook._id,
        author: existedBook.author,
        bookTitle: existedBook.bookTitle,
        imageUrl: existedBook.imageUrl,
        price: existedBook.price,
        quantity: existedBook.quantity - 1
      }
      const updatedCartData = filteredCartData.concat(updatedBookData)
      setCartData(updatedCartData)
    }
  };
  const cartInfo = {
    cartData,
    setCartData,
    addToCart,
    handleIncrease,
    handleDecrease
  }

  return (
    <CartContext.Provider value={cartInfo}>
      {children}
    </CartContext.Provider>
  )
}
