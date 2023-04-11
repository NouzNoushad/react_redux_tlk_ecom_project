import * as types from "../actionTypes"

const initialState = {
	loading: true,
	users: [],
	error: ''
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.REGISTER_USER:
			return {
				...state,
				loading: false
			}
		case types.GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			}
		default:
			return state
	}
}

export default usersReducer