import {combineReducers} from "redux";
import userReducer from "./UserReducer";
import listUserReducer from "./ListUserReducer";

const RootReducer = combineReducers({
    user: userReducer,
    listUsers: listUserReducer
});

export default RootReducer