"use client"

import React, { useState } from 'react'
import CartView from './CartView'
import { Cart } from './Cart'

const CartItem = () => {

      const [openCart, setOpenCart] = useState<boolean>(false)

      const CartViewOpen = () => {
            setOpenCart(!openCart)
      }

  return (
    <>
      <Cart openCart={CartViewOpen} />
      {
            openCart === true ? <CartView openCart={CartViewOpen} open={openCart} /> 
            : <></>
      }
    </>
  )
}

export default CartItem
