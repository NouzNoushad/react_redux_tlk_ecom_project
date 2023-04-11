import { createStore, applyMiddleware } from "redux"
import rootReducer from "./rootReducer"
import reduxThunk from "redux-thunk"
import logger from "redux-logger"

const middleware = [reduxThunk]

if (process.env.NODE_ENV === "development") {
	middleware.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middleware))
export default store