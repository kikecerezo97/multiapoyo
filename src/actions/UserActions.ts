import {Dispatch} from "redux";
import {USER_FAIL, USER_LOADING, USER_SUCCESS, UserDispatchTypes} from "./UserActionTypes";
import * as reqresServices from "../services/ReqresServices";

export const GetUser = (idUser: number) => async (dispatch: Dispatch<UserDispatchTypes>) => {

    try {
        dispatch({
            type: USER_LOADING
        })
        const res = await reqresServices.getUser(idUser);
        dispatch({
            type: USER_SUCCESS,
            payload: res.data.data
        })

    }catch (e){
        dispatch({
            type: USER_FAIL
        })
    }

};

