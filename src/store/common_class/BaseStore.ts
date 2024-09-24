import {makeObservable, observable, runInAction} from "mobx";
import {LoadingClassStore} from "./LoadingClassStore";
import BasicHttpService, {IMessage, INameId} from "../../http/http_services/basicHttpService";
import {NoData} from "../../utils/consts";


export interface IMesStatus {
    message: string,
    status: number
}

export interface IBaseOption {
    path_addOne: string;
    path_deleteOne: string;
    path_getAll: string;
}


export default class BaseStore extends LoadingClassStore {

    _data: INameId[];
    _list: (string | number)[][];
    path_addOne: string;
    path_deleteOne: string;
    path_getAll: string;

    constructor({
                    path_addOne = "",
                    path_deleteOne = "",
                    path_getAll = ""
                } = {}) {
        super()
        this._data = [];
        this._list = [];
        this.path_deleteOne = path_deleteOne;
        this.path_addOne = path_addOne;
        this.path_getAll = path_getAll;


        makeObservable(this, {
            _data: observable,
            _list: observable
        })
    }

    setData(data: INameId[]): void {
        runInAction(() => {
            this._data = data
        })

    }

    getData(): INameId[] {
        return this._data
    }

    setList(list: (string | number)[][]): void {
        runInAction(() => {
            this._list = list
        })

    }

    getList(): (string | number)[][] {
        return this._list
    }

    async addData(name: string): Promise<IMesStatus> {
        try {
            this.setLoading(true)
            const response = await BasicHttpService
                .addOne(name, this.path_addOne)
            const message = response.data.message

            // обновляем список
            await this.getAllData()
            await this.madeList()

            return {message, status: response.status}
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? "Ошибка",
                status: err.response?.status
            }
        } finally {
            this.setLoading(false)
        }
    }

    async getAllData(): Promise<void | IMesStatus> {
        try {
            this.setLoading(true)
            const response = await BasicHttpService
                .getAll(this.path_getAll)

            if (response.data.length > 0) {
                this.setData(response.data)
            }
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? "",
                status: err.response?.status
            }
        } finally {
            this.setLoading(false)
        }
    }

    async deleteData(formData: FormData): Promise<IMesStatus> {
        try {
            this.setLoading(true)

           // const response = await BasicHttpService
           //     .deleteFormData(formData, this.path_deleteOne)

            const response = await BasicHttpService
                .delete(this.path_deleteOne, formData)



            // обновляем список
            await this.getAllData()
            await this.madeList()

            const message = response.data.message
            return {message, status: response.status}
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? "Ошибка",
                status: err.response?.status
            }
        } finally {
            this.setLoading(false)
        }
    }

    madeList(): IMessage {
        let currentData: INameId[] = this.getData()
        if (currentData.length === 0) {
            return {message: NoData}
        }
        let list: (string | number)[][] = currentData
            .map(({id, name}) => [id, name])

        this.setList(list)
        return {message: ""}
    }

    sortList(ind: number, directing: number): void {
        let list = this.getList();
        if (directing === 1) {
            const sortList = list.sort((a: any[], b: any[]): number => {
                if (typeof a[ind] === "string") {
                    return a[ind].localeCompare(b[ind])
                }
                if (typeof a[ind] === "number") {
                    return (a[ind] - b[ind])
                } else return 0  // что бы не ругался ESlint
            })
            this.setList([...sortList])

        }
        if (directing === 0) {
            const sortList = list.sort((a: any[], b: any[]): number => {
                if (typeof a[ind] === "string") {
                    return b[ind].localeCompare(a[ind])
                }
                if (typeof a[ind] === "number") {
                    return (b[ind] - a[ind])
                } else return 0  // что бы не ругался ESlint
            })
            this.setList([...sortList])
        }
    }


}