import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:8000/cart'

const initialState = {
	loading: false,
	carts: [],
	error: ''
}

export const addToCart = createAsyncThunk('cart/addToCart', (product) => {
	return axios.post(`${url}`, product)
		.then((response) => response.data)
})

export const getCartProducts = createAsyncThunk('cart/getCartProducts', () => {
	return axios.get(`${url}`)
		.then((response) => response.data)
})

export const deleteFromCart = createAsyncThunk('cart/deleteFromCart', (id) => {
	return axios.delete(`${url}/${id}`)
		.then((response) => {
			console.log(response.data)
		})
})

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(addToCart.pending, (state) => {
			state.loading = true
		})
		builder.addCase(addToCart.fulfilled, (state, action) => {
			state.loading = false
			state.carts = action.payload
		})
		builder.addCase(addToCart.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
		builder.addCase(getCartProducts.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getCartProducts.fulfilled, (state, action) => {
			state.loading = false
			state.carts = action.payload
		})
		builder.addCase(getCartProducts.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
		builder.addCase(deleteFromCart.pending, (state) => {
			state.loading = true
		})
		builder.addCase(deleteFromCart.fulfilled, (state, action) => {
			state.loading = false
		})
		builder.addCase(deleteFromCart.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
	}
})

export default cartSlice.reducer