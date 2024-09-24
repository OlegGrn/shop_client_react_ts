import {LoadingClassStore} from "./common_class/LoadingClassStore";
import BasketHttpService, {IAddBasket} from "../http/http_services/basketHttpService";
import {makeObservable, observable, runInAction} from "mobx";


export interface IUserBasket{
    id: number
    id_user: number
    id_device: number
    device: string
    price: number
    size_id: number
    size_name: string
    quantity_all: number
    quantity_chosen: number
    paid: boolean
}

export default class BasketStore extends LoadingClassStore {
    _user_basket: IUserBasket[] ;
    constructor() {
        super();
        this._user_basket = [];

        makeObservable(this, {
            _user_basket: observable
        })

    }

    get userBasket(): IUserBasket[] {
        return this._user_basket;
    }

    set userBasket(data: IUserBasket[]){
        runInAction(() => {
            this._user_basket = data
        })
    }


    async addData(body: IAddBasket): Promise<string> {
        try {
            let response = await BasketHttpService.addData(body)
            return response.data.message
        } catch (err:any){
            console.log(err)
            return err.message
        }
    }

    async delete(id_row: number): Promise<string> {
        try {
            let response = await BasketHttpService.delete(id_row)
            return response.data.message
        } catch (err:any){
            console.log(err)
            return err.message
        }

    }


    async getDataUser(id_user: number): Promise<string | undefined>{
        try {
            this.setLoading(true)
            let response = await BasketHttpService.getDataUser(id_user)
            console.log(response.data)
            this.userBasket = response.data
        } catch (err:any){
            console.log(err)
            return err.message
        }finally {
            this.setLoading(false)
        }
    }

    async updateOrder(quantity: number, id_order: number){
        try{
            let response = await BasketHttpService.updateOrder({
                quantity, id_order
            })

            //если все прошло успешно status == 201, иначе status 200 или другие
            if(response.status === 201){
                //Обновляем данные заказа в storeBasket (т.е. не делаем запрос на сервер для обновления и
                //экономим тем самым ресурсы. Альтернатива - заново вызвать async getDataUser(id_user)
                let newArrOrders = [...this.userBasket]
                newArrOrders.map(item => {
                    if(item.id === id_order) {
                        //устанавливаем новое количество у заказа
                        item.quantity_chosen = quantity
                        return item
                    }
                })
                //обновляем данные по юзеру
                this.userBasket = newArrOrders
            }
        } catch (err:any){
            console.log(err)
            return err.message
        }
    }
}

export const baskets = new BasketStore()