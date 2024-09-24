import $api from "../$api";
import $apiAuth from "../$apiAuth";
import {IPayload} from "../../types/userTypes";


export interface IMessage {
    message: string,
}

export interface INameId {
    id: number,
    name: string | number
}

export interface IPayloadToken {
    payload: IPayload,
    accessToken: string,
}

export default class BasicHttpService {

    static async addOne(name: string, path: string) {
        return await $api.post<IMessage>(path, {name})
    }

    static async delete(path: string, formData: FormData){
        return await $api.delete(path, {
            method: "delete",
            data: {
                id: formData.get("id")
            }
        })
    }

    static async getAll(path: string) {
        return await $api.get<INameId[]>(path)
    }

    static async getUnique(path: string) {
        return await $api.get<INameId[]>(path)
    }

    static async login(email: string, password: string, path: string) {
        return await $api.post<IPayloadToken>(path, {email, password})

    }

    static async logOut(path: string) {
        return await $api.post<IMessage>(path)
    }

    static async registration(email: string, password: string, path: string) {
        return await $api.post<IPayloadToken>(path, {email, password})
    }

    static async authStart(path: string) {
        return await $apiAuth.get<IPayloadToken>(path)
    }
}