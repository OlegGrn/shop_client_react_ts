import {IPayload} from "../userTypes";


export interface IAuthResponse {
    payload: IPayload,
    accessToken: string,
}

export interface UserResponse {
    message: string,
    accessToken: string,
    status: number
}



