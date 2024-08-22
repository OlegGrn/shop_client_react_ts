import {makeObservable, observable, runInAction} from "mobx";
import {CLASS_LOCK, ID_MENU_LIST} from "../utils/consts";

export class BurgerStore {
    private open: boolean;
    private readonly listenerBind: OmitThisParameter<(e: any) => void>;

    _active: boolean
    _id_menu_list: string;

    constructor(id_menu_list: string) {
        this.open = false
        this.listenerBind = this.listener.bind(this)
        this._active = false
        this._id_menu_list = id_menu_list

        makeObservable(this, {
            _active: observable,
        })
    }

    isActiveBurger(): boolean {
        return this._active
    }

    setActiveBurger(value: boolean){
        runInAction(() => {
            this._active = value
        })
    }

    listener(e: any) {
        if (!e.target.closest(`#${this._id_menu_list}`)) {
            this.click()
        }
    }

    click() {
        this.open = !this.open;
        this.setActiveBurger(!this.isActiveBurger())

        if (this.open) {
            setTimeout(() => {
                document.addEventListener("click", this.listenerBind)
            }, 0)
        } else {
            document.removeEventListener("click", this.listenerBind)
        }
    }
}

export const burger = new BurgerStore(ID_MENU_LIST)





