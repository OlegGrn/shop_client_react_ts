import BaseUniqueStore, {IBasicOptions} from "./common_class/BaseUniqueStore";


export class CategoryStore extends BaseUniqueStore {
    constructor(options: IBasicOptions) {
        super(options);
    }

}


export const categories = new CategoryStore({
    path_addOne: "/category",
    path_deleteOne: '/category/delete',
    path_getAll: '/category',
    path_getUnique: "/category/unique" ,
})

























































/*
class CategoryStore11 {
    constructor(
        public _data: IGet[] ,
        public _uniqueData: IGet[],
        public _loading: boolean

    ) {
        makeAutoObservable(this)
    }

    isLoading() {
        return this._loading
    }

    setLoading(val: boolean) {
        this._loading = val
    }

    setData(data: IGet[]) {
        this._data = data
    }

    getData() {
        return this._data
    }
    setUniqueData(data: IGet[]) {
        this._uniqueData = data
    }

    getUniqueData() {
        return this._uniqueData
    }

    async addData(name: string) {
        try {
            this.setLoading(true)
            const response = await CategoryService.addOne(name)
            const {message} = response.data

            await this.getAllData()
            return {message}
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? "",
                status: err.response?.status
            }
        } finally {
            this.setLoading(false)
        }
    }

    async deleteData(name: string) {
        try {
            this.setLoading(true)
            const response = await CategoryService.deleteFormData(name)
            const {message} = response.data

            await this.getAllData()
            return {message}
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? "",
                status: err.response?.status
            }
        } finally {
            this.setLoading(false)
        }
    }

    async getAllData() {
        try {
            const response = await CategoryService.getData();
            if (response.data.length > 0) {
                this.setData(response.data)
            } else this.setData([])
        } catch (err) {
            console.log(err)
        } finally {
        }
    }

    async getUnique(){
        try {
            const response = await CategoryService.getUnique();
            if (response.data.length > 0) {
                this.setUniqueData(response.data)
            } else this.setUniqueData([])
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? "",
                status: err.response?.status
            }

        }
    }

}*/
