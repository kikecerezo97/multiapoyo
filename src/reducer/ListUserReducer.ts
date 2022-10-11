
import {UserModel} from "../models/UserModel";
import {
    LIST_USER_FAIL,
    LIST_USER_LOADING,
    LIST_USER_SUCCESS,
    ListUserDispatchTypes
} from "../actions/ListUserActionTypes";

export interface DefaultStateI {
    loading: boolean,
    listUser?: UserModel[]
}

const defaultState: DefaultStateI = {
    loading: false
};

const listUserReducer =  (state: DefaultStateI = defaultState, action: ListUserDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        case LIST_USER_FAIL:
            return {
                loading: false,
            }
        case LIST_USER_LOADING:
            return {
                loading: true,
            }
        case LIST_USER_SUCCESS:
            return {
                loading: false,
                listUser: action.payload
            }
        default:
            return state
    }
};
export default listUserReducer;