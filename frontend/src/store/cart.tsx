import { create } from "zustand"
import { persist } from "zustand/middleware";
import { Producto } from "../Interfaces";

interface State {
 cart: Producto[]
 totalPrice: number
}

interface Actions {
 addToCart: (Item: Producto) => void
 removeFromCart: (Item: Producto) => void
 removeAll: () => void
}

const State = {
 cart: [],
 totalPrice: 0,
}

export const useCartStore = create(persist<State & Actions>((set, get) => ({
 cart: State.cart,
 totalPrice: State.totalPrice,

 removeAll: () => {
     set({
        cart: [],
        totalPrice: 0,
     })
 },
 addToCart: (productos: Producto) => {
  const cart = get().cart
  const cartItem = cart.find(item => item.id === productos.id)

  if (cartItem) {
   const updatedCart = cart.map(item =>
    item.id === productos.id ? { ...item, quantity: (item.quantity as number) + 1 } : item
   )
   set(state => ({
    cart: updatedCart,
    totalPrice: state.totalPrice + Number(productos.precio),
   }))
  } else {
   const updatedCart = [...cart, { ...productos, quantity: 1 }]

   set(state => ({
    cart: updatedCart,
    totalPrice: state.totalPrice + Number(productos.precio),
   }))
  }
 },

 removeFromCart: (productos: Producto) => {
  const cart = get().cart
  const cartItem = cart.find(item => item.id === productos.id)

  if (cartItem && cartItem.quantity && cartItem.quantity > 1) {
   const updatedCart = cart.map(item =>
    item.id === productos.id ? { ...item, quantity: (item.quantity as number) - 1 } : item
   )
   set(state => ({
    cart: updatedCart,
    totalPrice: state.totalPrice - Number(productos.precio),
   }))
  } else {
    set(state => ({
        cart: state.cart.filter(item => item.id !== productos.id),
        totalPrice: state.totalPrice - Number(productos.precio),
    }))
  }
 },
}),

{
      name: "cart-storage",
}

))