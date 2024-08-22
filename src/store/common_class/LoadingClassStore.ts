import {makeObservable, observable, runInAction} from "mobx";

export class LoadingClassStore {
    _loading: boolean

    constructor() {
        this._loading = false
        makeObservable(this, {
            _loading: observable,
        })
    }

    isLoading():boolean {
        return this._loading
    }

    setLoading(val: boolean):void {
        runInAction(() => {
            this._loading = val
        })
    }

}