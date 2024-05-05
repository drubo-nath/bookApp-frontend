import React, { useCallback, useContext } from 'react'
import { CartContext } from '../Contexts/CartProvider'
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthProvider'

export default function Cart() {
  const { cartData, setCartData, handleIncrease, handleDecrease } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  // const cartData = JSON.parse(localStorage.getItem("cart") || "[]")
  
  console.log(cartData)
  //cartData.map((data) => console.log(data))


  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
 


  // Calculate the cart subtotal
  const cartSubtotal = cartData.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;
  // console.log(orderTotal)

  // delete an item
  const handleDelete = (item) => {
    const updatedCart = cartData.filter((currItem) => currItem._id != item._id)
    setCartData(updatedCart)
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4  mt-[20px] sm:px-[85px]">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The<span className="text-red-600"> Cart</span>             
            </h2>
          </div>
        </div>
      </div>

      {/* cart table */}

      {
        (cartData.length > 0) ? <div>
          <div className="">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-green text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Book Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.imageUrl}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{item.bookTitle}</td>
                      <td>
                        <button
                          className="btn btn-xs"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-[55px] mx-2 text-center overflow-hidden appearance-none"
                        />
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <td>${calculateTotalPrice(item).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm border-none text-red bg-transparent"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
              </table>
            </div>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <p>Name: {user?.displayName || "None"}</p>
              <p>Email: {user?.email}</p>
              <p>
                User_id: <span className="text-sm">{user?.uid}</span>
              </p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Shopping Details</h3>
              <p>Total Items: {cartData.length}</p>
              <p>
                Total Price:{" "}
                <span id="total-price">${orderTotal.toFixed(2)}</span>
              </p>
              <button className="btn btn-md bg-red-500 text-white px-8 py-1">
                Procceed to Checkout
              </button>
            </div>
          </div>
        </div> : <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/all-books"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
        </div>
      }

    </div>
  )
}
