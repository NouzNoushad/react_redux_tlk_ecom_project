import axios from "axios"
import * as types from "./actionTypes"

/// PRODUCTS ///

const productsDetails = (products) => ({
	type: types.GET_PRODUCTS,
	payload: products
})


export const getProducts = () => {
	return function (dispatch) {
		axios.get('http://localhost:5000/products')
			.then((res) => {
				console.log(res.data)
			dispatch(productsDetails(res.data))
			})
		.catch(err => console.log(err))
	}
}

/// CART ///

const cartUrl = 'http://localhost:8000/cart'

const addProduct = () => ({
	type: types.ADD_TO_CART
})

const cartProducts = (carts) => ({
	type: types.GET_CART_PRODUCTS,
	payload: carts
})

const removeProduct = () => ({
	type: types.REMOVE_FROM_CART
})

export const addToCart = (product) => {
	return function (dispatch) {
		axios.post(cartUrl, product)
			.then(() => {
			dispatch(addProduct())
			})
		.catch((err) => console.log(err))
	}
}

export const getCartProducts = () => {
	return function (dispatch) {
		axios.get(cartUrl)
			.then((res) => {
				console.log(res.data)
			dispatch(cartProducts(res.data))
			})
		.catch(err => console.log(err))
	}
}

export const removeFromCart = (id) => {
	return function (dispatch) {
		axios.delete(`${cartUrl}/${id}`)
			.then(() => {
				dispatch(removeProduct())
				dispatch(getCartProducts())
			})
 		.catch(err => console.log(err))
	}
}

/// USERS ///

const usersUrl = 'http://localhost:4000/users'

const addUser = () => ({
	type: types.REGISTER_USER
})

const usersList = (users) => ({
	type: types.GET_USERS,
	payload: users
})

export const registerUser = (user) => {
	return function (dispatch) {
		axios.post(usersUrl, user)
			.then(() => {
			dispatch(addUser())
			})
		.catch(err => console.log(err))
	}
}

export const getUsers = () => {
	return function (dispatch) {
		axios.get(usersUrl)
			.then((res) => {
			dispatch(usersList(res.data))
			})
		.catch(err => console.log(err))
	}
}