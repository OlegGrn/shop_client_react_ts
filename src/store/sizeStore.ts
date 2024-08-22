import BaseUniqueStore, {IBasicOptions} from "./common_class/BaseUniqueStore";




export class SizeStore extends BaseUniqueStore{
    constructor(options: IBasicOptions) {
        super(options);
    }

}

export const sizes = new SizeStore({
    path_addOne: "/size",
    path_deleteOne: '/size/delete',
    path_getAll: '/size',
    path_getUnique: "/size/unique" ,
})


































/*
class SizeStore_11{

    constructor(
        public _data:IGet[] | [],
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
    setData(data: IGet[]){
        this._data = data
    }

    getData(){
        return this._data
    }

    async addData(name: string) {
        try {
            this.setLoading(true)
            const response = await SizeService.addOne(name)
            const {message} = response.data
            //обновляем селект
            await this.getAllData()
            return {message}
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? ""
            }
        } finally {
            this.setLoading(false)
        }
    }
    async deleteData(name: string) {
        try {
            this.setLoading(true)
            const response = await SizeService.deleteFormData(name)
            const {message} = response.data

            await this.getAllData()
            return {message}
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? ""
            }
        } finally {
            this.setLoading(false)
        }
    }
    async getAllData() {
        try {
            const response = await SizeService.getData();
            if (response.data.length > 0){
                this.setData(response.data)
            } else this.setData([])
        } catch (err) {
            console.log(err)
        } finally {
        }
    }

}*/
