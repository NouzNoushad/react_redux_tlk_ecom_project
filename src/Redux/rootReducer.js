import { combineReducers } from "redux";
import cartsReducer from "./reducers/cartReducer";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";

const rootReducer = combineReducers({
	products: productsReducer,
	carts: cartsReducer,
	usersData: usersReducer,
})

export default rootReducer