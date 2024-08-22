import BaseStore, {IBaseOption} from "./common_class/BaseStore";
import {makeObservable, observable, runInAction} from "mobx";



export default class AdminStore extends BaseStore {

    _isAdmin: boolean;

    constructor(options: IBaseOption | {} ) {
        super(options);
        this._isAdmin = false
        makeObservable(this, {
            _isAdmin: observable,
        })
    }

    setAdmin(value: boolean): void {
        runInAction(() =>{
            this._isAdmin = value
        })
    }

    isAdmin(): boolean {
        return this._isAdmin
    }
}

export const admins = new AdminStore({
    path_addOne: 'user/admin/add',
    path_deleteOne: 'user/admin/del',
    path_getAll: 'user/admin/',
})