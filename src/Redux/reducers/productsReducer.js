import * as types from "../actionTypes"

const initialState = {
	loading: true,
	error: '',
	products: []
}

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_PRODUCTS:
			return {
				...state,
				products: action.payload,
				loading: false
			}
		default:
			return state
	}
}

export default productsReducer