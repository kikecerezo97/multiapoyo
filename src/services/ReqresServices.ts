import environment from '../environments/environment'
import {LoginModel} from "../models/LoginModel";
import axios from "axios";
import {PagesUsersModel} from "../models/PagesUsersModel";
import {UserModel} from "../models/UserModel";

const API = environment.APIREQRES;

const headerJSON = {
    accept: 'application/json',
    'Content-Type': 'application/json'
}

export const postLogin = async (login: LoginModel) => {
  return await axios.post<any>(`${API}/login`, login, {headers: headerJSON})
}

export const getUsers = async (page: number, perPage: number) => {
    return await axios.get<PagesUsersModel>(`${API}/users?page=${page}&per_page=${perPage}`, {headers: headerJSON})
}

export const getUser = async (IdUser: number) => {
    return await axios.get<{data: UserModel}>(`${API}/users/${IdUser}`, {headers: headerJSON})
}
