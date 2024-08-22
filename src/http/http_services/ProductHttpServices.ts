import $api from "../$api";
import {IMessage} from "./basicHttpService";
import {IProduct, IProductId, ISelected} from "../../store/productStore";



// пока пользуемся ProductHttpServices, далее перенести данные в BasicHttpService
export class ProductHttpServices {

    static async createProduct(formData: FormData) {
        return await $api.post<IMessage>("/device/create", formData)
    }

    static async getListProduct() {
        return await $api.get< (string | number)[][]>('/device/list')
    }

    static async deleteProduct(formData: FormData){
        return await $api.post<IMessage>('device/delete', formData )
    }
    static async getAllProducts(options: ISelected){
        return await $api.get<{count: number, rows: IProduct[]}>("device/all",{params:options})
    }

    static async getOneProduct(id: string){
        return await $api.get<IProductId>(`device/one/${id}`)
    }
}

/* Для получения все продуктов с выборкой и без
    limit = 2,
    currentPage = 1,
    type_id = null,
    category_id = null
*/
