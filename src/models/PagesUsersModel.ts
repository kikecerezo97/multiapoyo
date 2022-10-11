import {UserModel} from "./UserModel";

export interface PagesUsersModel {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserModel[];
}