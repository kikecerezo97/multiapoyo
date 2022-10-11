import {UserModel} from "../models/UserModel";

export const LIST_USER_LOADING = "LIST_USER_LOADING";
export const LIST_USER_FAIL = "LIST_USER_FAIL";
export const LIST_USER_SUCCESS = "LIST_USER_SUCCESS";

export interface ListUserLoading {
    type: typeof LIST_USER_LOADING
}

export interface ListUserFail {
    type: typeof LIST_USER_FAIL
}

export interface ListUserSuccess {
    type: typeof LIST_USER_SUCCESS,
    payload: UserModel[]
}

export type ListUserDispatchTypes = ListUserLoading | ListUserFail | ListUserSuccess