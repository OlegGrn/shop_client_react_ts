import $api from "../$api";
import {IMessage} from "./basicHttpService";
import {IUserBasket} from "../../store/basketStore";



export interface IAddBasket{
    id_user: number
    id_device: number
    id_size: number
    quantity_chosen: number
}

export interface IUpdateOrder{
    quantity: number,
    id_order: number
}


export default class BasketHttpService {

    static async delete(id_row: number){
        return await $api.delete<IMessage>("basket", {
            method: "delete",
            data: {
                id: id_row
            }
        })
    }

   static async addData(body: IAddBasket){
        return await $api.post<IMessage>("basket", body)
    }

    static async getDataUser(id_user: number){
       return await $api.get<IUserBasket[] | []>(`basket/${id_user}`)
    }

    static  async updateOrder (body: IUpdateOrder){
        return await $api.patch<IMessage>('basket', body)
    }


}


