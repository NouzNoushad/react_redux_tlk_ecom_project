import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:4000/users'

const initialState = {
	loading: false,
	users: [],
	error: ''
}

export const registerUser = createAsyncThunk('user/registerUser', (user) => {
	return axios.post(`${url}`, user)
		.then((response) => response.data)
})

export const getUsers = createAsyncThunk('user/getUsers', () => {
	return axios.get(`${url}`)
		.then((response) => response.data)
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.loading = false
			state.users = action.payload
		})
		builder.addCase(registerUser.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
		builder.addCase(getUsers.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.loading = false
			state.users = action.payload
		})
		builder.addCase(getUsers.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
	}
})

export default userSlice.reducer