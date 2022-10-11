import environment from '../environments/environment'
import axios from "axios";
import {PostModel} from "../models/PostModel";
import {AlbumModel} from "../models/AlbumModel";

const API = environment.APIJSONPLACEHOLDER;

const headerJSON = {
    accept: 'application/json',
    'Content-Type': 'application/json'
}

export const getPosts = async (idUser: number) => {
    return await axios.get<PostModel []>(`${API}/comments?postId=${idUser}`, {headers: headerJSON})
}

export const getAlbum = async (idUser: number) => {
    return await axios.get<AlbumModel []>(`${API}/users/${idUser}/photos`, {headers: headerJSON})
}