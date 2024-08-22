import {makeObservable, observable, runInAction} from "mobx";
import {ProductHttpServices} from "../http/http_services/ProductHttpServices";
import BaseStore from "./common_class/BaseStore";
import {IMessage} from "../http/http_services/basicHttpService";
import {DEFAULT_LIMIT} from "../utils/consts";

export interface IPaths {
    idPath: number
    idDevice: number
    pathName: string
    pathNameUrl: string
}

export interface IProduct<T = number[]> {
    id: number
    name: string,
    type: string,
    category: string,
    price: number,
    sizes: T,
    img: boolean
    id_category: number
    id_type: number
    paths: IPaths[] //массив фотографий продукта

}

export interface ISizesQuantity {
    sizeID: number,
    deviceId: number,
    sizeName: number,
    quantity: number
}

export interface IProductId extends IProduct<ISizesQuantity[]> {
    description: string,

}

export interface ISelected {
    type: number[]
    category: number[]
    size: number[]
    limit: number
    currentPage: number
}


export enum enumSelect {
    category = "category",
    type = "type",
    size = "size",
    limit = "limit",
    currentPage = "currentPage",
    view = "view"
}

export default class ProductStore extends BaseStore {

    _productAll: IProduct[];
    _selectProduct: ISelected
    _quantityPages: number
    _prevSelectProduct: string


    constructor() {
        super()
        this._productAll = [];
        this._selectProduct = {
            type: [],
            category: [],
            size: [],
            limit: Number(DEFAULT_LIMIT),
            currentPage: 1,
        }
        this._prevSelectProduct = ""
        this._quantityPages = 0


        makeObservable(this, {
            _productAll: observable,
            _selectProduct: observable
        })
    }

    getQuantityPages() {
        return this._quantityPages
    }

    setQuantityPages(quantityPages: number) {
        runInAction(() => {
            this._quantityPages = quantityPages
        })
    }

    getSelectProduct(): ISelected {
        return this._selectProduct
    }

    setDefaultSelectProduct() {
        runInAction(() => {
            this._selectProduct.type = []
            this._selectProduct.category = []
            this._selectProduct.size = []
        })
    }

    setSelectProduct(
        select: enumSelect.size | enumSelect.type | enumSelect.category,
        id: number,
        index: number) {

        runInAction(() => {
            if (index === -1) {
                this._selectProduct[select].push(id)
            } else if (index >= 0) {
                this._selectProduct[select].splice(index, 1)
            } else {
                this._selectProduct.type = []
                this._selectProduct.category = []
            }
        })
    }

    setLimitOrPage(select: enumSelect.limit | enumSelect.currentPage, num: number) {
        runInAction(() => {
            this._selectProduct[select] = num
        })
    }

    getStoreProducts(): IProduct[] | [] {
        return this._productAll
    }

    setStoreProducts(product: IProduct[]) {
        runInAction(() => {
            this._productAll = product
        })
    }


    async oneProduct(id: string):Promise<string | IProductId> {
        try {
            let candidate = await ProductHttpServices.getOneProduct(id);
            return candidate.data
        } catch (err: any) {
            console.log(err);
            return err.response?.data?.message ?? err.message ?? "Непредвиденная ошибка"
        }
    }


    async createProduct(formData: FormData) {
        // в FormData следующие поля:
        // body: {name:, price, description, id_category, id_type, sizes},
        //**** все значения стороковые, и sizes строка(массив в Json)
        // files:img
        //**** img объект или массив объектов (в зависимости от количества фото)
        try {
            this.setLoading(true)
            let response = await ProductHttpServices.createProduct(formData)

            // обновляем список
            await this.listProduct()

            return {message: response.data.message}
        } catch (err: any) {
            console.log(err)
            return {message: err.response?.data?.message ?? err.message ?? "Непредвиденная ошибка",}
        } finally {
            this.setLoading(false)
        }
    }

    async listProduct(): Promise<IMessage> {
        try {
            this.setLoading(true)
            let response = await ProductHttpServices.getListProduct()
            //метод из прототипа, в последующем этим List, пользуется sortList
            this.setList(response.data)
            return {message: (response.data.length > 0 ? "Список товаров" : "НЕТ товаров")}
        } catch (err: any) {
            console.log(err)
            return {message: err.response?.data?.message ?? err.message ?? "Непредвиденная ошибка"}
        } finally {
            this.setLoading(false)
        }
    }


    async deleteProduct(formData: FormData): Promise<IMessage> {
        try {
            this.setLoading(true);

            let response = await ProductHttpServices.deleteProduct(formData)
            // обновляем список
            await this.listProduct()
            return {message: response.data.message}
        } catch (err: any) {
            console.log(err)
            return {message: err.response?.data?.message ?? err.message ?? "Непредвиденная ошибка"}
        } finally {
            this.setLoading(false)
        }
    }

    async showYetProduct(currentPage: number) {
        try {
            this.setLoading(true)
            let currentProducts: IProduct[] = [...this.getStoreProducts()]
            await this.allProduct(currentPage + 1)
            this.setStoreProducts([...currentProducts, ...this.getStoreProducts()])

        } catch (err: any) {
            console.log(err)
            return {message: err.response?.data?.message ?? err.message ?? "Непредвиденная ошибка"}
        } finally {
            this.setLoading(false)
        }
    }


    async allProduct(page: number = 1): Promise<boolean | IMessage> {
        try {
            this.setLoading(true)

            //устанавливаем новое значение currentPage (новое = page) в productsStore в this._selectProduct
            //если не первая загрузка (при первой page по дефолту === 1)
            this.setLimitOrPage(enumSelect.currentPage, page)  //options.currentPage = page;

            //считываем опции запроса на товары для БД
            let options: ISelected = this.getSelectProduct()

            //получаем prevOptions (при первой загрузке это пустая строка) и сравниваем
            // с текущим options (в виде строки!!!)
            // если prevOptions = options(в виде строки!!!), выход из функции
            // этим исключаем повторную загрузку по клику на кнопку "показать выбранное"
            let prevOptions: string = this._prevSelectProduct;

            console.log("prevOptions = " + prevOptions)
            console.log("options = " + JSON.stringify(options))

            if (prevOptions.localeCompare(JSON.stringify(options)) === 0) return {message: ""}

            // если prevOptions !=== options
            // на выходе в response.data {count: number, rows: IProduct[]}
            let response = await ProductHttpServices.getAllProducts(options)

            //сохраняем текущий выбор в PREV_options в виде СТРОКИ !!!!
            this._prevSelectProduct = JSON.stringify(options)
            //(не понял почему, но если хранить как объект, то _prevSelectProduct
            //всегда перезаписывается и равен options, скорее всего из-за mobx)


            this.setStoreProducts(response.data.rows)
            // всего продуктов
            let allProducts = response.data.count;
            console.log("allProducts.count = " + allProducts)
            // находим количество страниц
            let quantityPages = Math.ceil(allProducts / options.limit)
            this.setQuantityPages(quantityPages)
            return response.data.rows.length === 0;

        } catch (err: any) {
            console.log(err)
            return {message: err.response?.data?.message ?? err.message ?? "Непредвиденная ошибка"}
        } finally {
            this.setLoading(false)
        }

    }


}

export const products = new ProductStore()



