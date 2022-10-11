import {Dispatch} from "redux";
import {LIST_USER_FAIL, LIST_USER_LOADING, LIST_USER_SUCCESS, ListUserDispatchTypes} from "./ListUserActionTypes";
import {UserModel} from "../models/UserModel";

export const GetUsers = (listUsers: UserModel[]) => async (dispatch: Dispatch<ListUserDispatchTypes>) => {

    try {
        dispatch({
            type: LIST_USER_LOADING
        })
        dispatch({
            type: LIST_USER_SUCCESS,
            payload: listUsers
        })

    }catch (e){
        dispatch({
            type: LIST_USER_FAIL
        })
    }

};


export const UpdatetUser = (listUsers: UserModel[], updateUser: UserModel) => async (dispatch: Dispatch<ListUserDispatchTypes>) => {

    for (let i=0; i<listUsers.length; i++){
        if (listUsers[i].id == updateUser.id){
            listUsers[i] = updateUser;
        }
    }
    dispatch({
        type: LIST_USER_SUCCESS,
        payload: listUsers
    })

};

