import { combineReducers } from "redux";
import authenticationReducer from "./AuthenticationReducer";
import registerReducer from "./RegisterReducer";
import searchReducer from "./SearchReducer";
const rootReducer = combineReducers({
    authenticationReducer: authenticationReducer,
    registerReducer:registerReducer,
    searchReducer:searchReducer
})
export default rootReducer;