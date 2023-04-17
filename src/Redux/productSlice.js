import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false,
	products: [],
	error: ''
}

export const getProducts = createAsyncThunk('product/getProducts', () => {
	return axios.get('http://localhost:5000/products')
		.then(res => res.data)
})

const productSlice = createSlice({
	name: 'product',
	initialState,
	extraReducers: (builder) => {
			builder.addCase(getProducts.pending, (state) => {
				state.loading = true
			})
			builder.addCase(getProducts.fulfilled, (state, action) => {
				state.loading = false
				state.products = action.payload
			})
			builder.addCase(getProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
	}
})

export default productSlice.reducer