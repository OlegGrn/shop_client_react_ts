import {makeObservable, observable, runInAction} from "mobx";
import BaseStore, {IMesStatus} from "./BaseStore";
import BasicHttpService, {INameId} from "../../http/http_services/basicHttpService";


export interface IBasicOptions {
    path_addOne: string;
    path_deleteOne: string;
    path_getAll: string;
    path_getUnique: string;

}

export default class BaseUniqueStore extends BaseStore {
    _uniqueData: INameId[];
    path_getUnique: string;

    constructor({path_addOne, path_deleteOne, path_getAll, path_getUnique}: IBasicOptions) {
        super({path_addOne, path_deleteOne, path_getAll})
        this._uniqueData = []
        this.path_getUnique = path_getUnique;

        makeObservable(this, {
            _uniqueData: observable,
        })

    }

    setUniqueData(data: INameId[]): void {
        runInAction(() => {
            this._uniqueData = data
        })

    }

    getUniqueData(): INameId[] {
        return this._uniqueData
    }

    async getUnique(): Promise<undefined | IMesStatus> {
        try {
            this.setLoading(true)
            const response = await BasicHttpService.getUnique(this.path_getUnique)

            if (response.data.length > 0) {
                this.setUniqueData(response.data)
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

}



