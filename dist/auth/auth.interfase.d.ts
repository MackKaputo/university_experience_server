import { ObjectId } from "mongodb";
export interface IUser {
    _id?: ObjectId;
    guid: string;
    username: string;
    email: string;
    phone_number: string;
    name?: string;
    surname?: string;
    createdAt: string | Date | number;
    updatedAt: string | Date | number;
    isAccountVerified: boolean;
}
