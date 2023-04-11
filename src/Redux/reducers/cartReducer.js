import * as types from "../actionTypes"

const initialState = {
	loading: true,
	error: '',
	cartItems: []
}

const cartsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_TO_CART:
		case types.REMOVE_FROM_CART:
			return {
				...state,
				loading: false,
			}
		case types.GET_CART_PRODUCTS:
			return {
				...state,
				cartItems: action.payload,
				loading: false
			}
		default:
			return state
	}
}

export default cartsReducer