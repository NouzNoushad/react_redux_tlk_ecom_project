import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"
import productSlice from "./productSlice"
import userSlice from "./userSlice"

const store = configureStore({
	reducer: {
		products: productSlice,
		cart: cartSlice,
		user: userSlice
	}
})

export default store