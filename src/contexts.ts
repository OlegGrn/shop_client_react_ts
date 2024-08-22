import React, {createContext, SetStateAction} from "react";
import {burger, BurgerStore} from "./store/burgerStore";
import ProductStore, {products} from "./store/productStore";
import {categories, CategoryStore} from './store/categoryStore'
import {types, TypeStore} from "./store/typeStore"
import {sizes, SizeStore} from "./store/sizeStore";
import AdminStore, {admins} from "./store/adminStore";
import {user, UsersStore} from "./store/usersStore";
import BasketStore, {baskets} from "./store/basketStore";


interface IContext {
    //user: UserStoreOld,
    user: UsersStore
    burger: BurgerStore,
    types: TypeStore
    categories: CategoryStore,
    sizes: SizeStore,
    products: ProductStore,
    admins: AdminStore,
    baskets: BasketStore

}

export interface IDispatchModal{
    openLogin: boolean,
    openBasket: boolean
    setOpenLogin: React.Dispatch<SetStateAction<boolean>>
    setOpenBasket: React.Dispatch<SetStateAction<boolean>>
}

interface IContextWidth768 {
    isWidth: boolean
}

export const ContextWidth768 = createContext<IContextWidth768 | null>(null)

export const ContextControllersModal = createContext<IDispatchModal>({
    openBasket: false, openLogin: false, setOpenBasket(value: ((prevState: boolean) => boolean) | boolean): void {
    }, setOpenLogin(value: ((prevState: boolean) => boolean) | boolean): void {
    }
})

export const Context = createContext<IContext>({
    user,
    burger,
    types,
    categories,
    sizes,
    products,
    admins,
    baskets
})





